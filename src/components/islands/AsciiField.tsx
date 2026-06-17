import { useEffect, useRef } from 'react';

/* ============================================================
   ASCII STARFIELD — canvas perspective fly-through (Woodland Academia)
   A faint, atmospheric BACK layer of monospace glyphs projected from a
   vanishing point and accelerated outward, like flying through a star
   field. Each glyph's rendered SIZE + brightness tracks its depth/z in
   the fly-through (nearer = larger + brighter, farther = smaller + dimmer)
   with per-star randomness so it never reads as uniform rings. Stars are
   tinted along a WARM REDDISH GRADIENT — parchment ink blended toward the
   redwood/maroon family (redwood #9e4332 / #b85c43 / #cf836a) as a
   function of depth + vertical screen position — with occasional aged-gilt
   and saturated-redwood accent flecks, on the forest-night base.

   Renderer: <canvas>. A <pre> monospace grid forces one shared font size
   for every glyph; canvas lets each star draw at its own depth-scaled
   font size and is the most performant surface for many varied-size
   animated glyphs (one fillText per visible star per throttled frame,
   no DOM churn).

   TUNING (this pass): glyphs keep the ~3x LARGER size (size range + depth +
   jitter variance UNCHANGED). Density is HALVED — the prior pass was ~2x too
   dense, so fill factor + caps are cut in half on BOTH desktop and mobile,
   back to the earlier sparser look. With the field sparser, it is pushed
   noticeably MORE VISIBLE: the per-glyph brightness curve is raised (softened
   dim-gamma + higher ceiling so more glyphs read clearly, some dim ones kept
   for variance) AND the host wrapper opacity in Hero.astro is raised. Colors
   keep the reddish-gradient + gilt/redwood-accent variance (never monochrome).
   The radial scrim in Hero.astro keeps the name/role/CTA fully legible over
   the brighter field — it stays a true BACKGROUND.

   Constraints (KEPT / HARD):
   - prefers-reduced-motion → render a single STATIC frame, no rAF (still
     big + dense + reddish + size/brightness-varied via the depth scaling)
   - aria-hidden + pointer-events:none + user-select:none
   - throttled rAF (~30fps via an elapsed-time gate)
   - cancels the loop when scrolled off-screen (IntersectionObserver)
   - density + size + work scale DOWN on mobile (≤768px); total glyphs
     capped (esp. ultrawide) so an unbounded viewport can't spawn
     unbounded work — phones run a leaner field (mobile density halved too)
   - backing store sized to devicePixelRatio (capped ~2) to stay crisp
     without paying for retina overdraw; redraws clear+repaint efficiently
   - hero text stays legible (faint ink, scrim handled by Hero.astro)
   - no overflow / no CLS (canvas is absolutely positioned, fills host)

   Token contract (LOCKED): reads ONLY --ascii-ink, --accent, --gilt,
   each with a hardcoded fallback so a missing token degrades gracefully.
   The reddish-gradient tones are derived from --accent (redwood) plus the
   two hardcoded redwood-family ramp stops (#b85c43 / #cf836a) per the
   palette, blended against the parchment --ascii-ink.
   ============================================================ */

// far/faint → near/bright. Drawn per-glyph; near stars also scale UP in px.
const RAMP = '.·:-=+*#@';

export interface AsciiFieldProps {
  /** Reference glyph size in px (depth scales each star around this). ~3x the
   *  prior reference so glyphs render ~3x larger while keeping size variance. */
  cell?: number;
  /** fraction (0..1) of near (bright) stars promoted to a gilt accent fleck. */
  accent?: number;
  /** fly-through speed multiplier (kit hero ≈ 0.7). */
  speed?: number;
  /** vanishing-point x (0..1). */
  cx?: number;
  /** vanishing-point y (0..1). */
  cy?: number;
}

interface Star {
  a: number; // angle from the vanishing point
  r0: number; // base radius seed (0..1) — spreads stars off the exact center
  z: number; // depth 0 (far) → 1 (near camera)
  s: number; // per-star speed jitter
  g: number; // per-star glyph seed (0..1) — decorrelates char + size jitter
  k: number; // per-star size jitter (~0.75..1.35) so sizes aren't uniform rings
  b: number; // per-star brightness seed (0..1) — widens the alpha spread off-ramp
  h: number; // per-star hue seed (0..1) — biases the reddish-gradient blend
}

// Parse "#rrggbb" → [r,g,b]. Used to blend the parchment ink toward the
// redwood-family ramp for the warm reddish gradient.
function hexRgb(hex: string): [number, number, number] {
  const m = hex.trim().replace('#', '');
  const v =
    m.length === 3
      ? m
        .split('')
        .map((c) => c + c)
        .join('')
      : m;
  const n = parseInt(v.slice(0, 6) || '000000', 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mix(c1: [number, number, number], c2: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

export default function AsciiField({
  cell = 38,
  accent = 0.07,
  speed = 0.7,
  cx = 0.5,
  cy = 0.5,
}: AsciiFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Mobile runs a leaner field so phones stay smooth; the dense, fine-grained
    // look stays a desktop affordance.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    // refSize drives RENDERED glyph size (~3x the prior 13px reference). It is
    // intentionally DECOUPLED from the glyph BUDGET: tripling the size must not
    // reduce the on-screen glyph count. The budget below counts against a fixed
    // ~13px reference grid so "3x bigger" and "2x denser" are independent knobs.
    const refSize = isMobile ? Math.round(cell * 0.72) : cell;
    // Budget reference: the prior dense-field cell (~13px desktop / ~18px mobile)
    // so the glyph COUNT is the same scale it was before the size bump — then the
    // doubled fill factor genuinely DOUBLES that count.
    const countCell = isMobile ? 18 : 13;
    // Cap the backing store at 2x DPR — crisp on retina without paying for
    // 3x overdraw on phones that report it.
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));

    // Resolve palette tokens once (with hardcoded fallbacks per the contract).
    const cs = getComputedStyle(document.documentElement);
    const inkVar = cs.getPropertyValue('--ascii-ink').trim() || 'rgba(214,201,175,0.42)';
    const accentVar = cs.getPropertyValue('--accent').trim() || '#9e4332';
    const giltVar = cs.getPropertyValue('--gilt').trim() || '#c2a35f';

    // Reddish gradient ramp (parchment → redwood family). The base ink RGB is
    // parsed from --ascii-ink (with a parchment fallback); the warm stops are
    // the palette's redwood ramp (#cf836a light → #9e4332 redwood → #b85c43).
    // Per-glyph color lerps along this ramp by a blend of depth + screen-y +
    // a per-star hue seed, so the field reads as a warm reddish gradient rather
    // than a monochrome parchment dust.
    const inkRgb: [number, number, number] = (() => {
      const m = inkVar.match(/rgba?\(([^)]+)\)/i);
      if (m) {
        const p = m[1].split(',').map((s) => parseFloat(s.trim()));
        return [p[0] || 214, p[1] || 201, p[2] || 175];
      }
      if (inkVar.startsWith('#')) return hexRgb(inkVar);
      return [214, 201, 175];
    })();
    const accentRgb = accentVar.startsWith('#') ? hexRgb(accentVar) : hexRgb('#9e4332');
    const redwoodLight = hexRgb('#cf836a');
    const redwoodMid = hexRgb('#b85c43');
    // Precompute a small reddish-gradient LUT (parchment → light redwood →
    // redwood → mid redwood) so the per-glyph color is a cheap table lookup
    // instead of two lerps every fillText.
    const LUT_N = 24;
    const warmLut: string[] = new Array(LUT_N);
    for (let i = 0; i < LUT_N; i++) {
      const t = i / (LUT_N - 1);
      let c: [number, number, number];
      if (t < 0.5) c = mix(inkRgb, redwoodLight, t / 0.5);
      else if (t < 0.8) c = mix(redwoodLight, accentRgb, (t - 0.5) / 0.3);
      else c = mix(accentRgb, redwoodMid, (t - 0.8) / 0.2);
      warmLut[i] = `rgb(${c[0]},${c[1]},${c[2]})`;
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block;' +
      'pointer-events:none;user-select:none;';
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    let W = 0; // CSS px width
    let H = 0; // CSS px height
    let stars: Star[] = [];
    let raf = 0;
    let last = 0; // ms timestamp of the last rendered frame (rAF throttle)
    const FRAME_MS = 1000 / 30; // ~30fps cap

    function buildStars() {
      // Glyph budget tracks the canvas AREA in BUDGET cells (countCell, ~13px) —
      // NOT the rendered refSize — so the ~3x size bump doesn't shrink the count.
      // Capped so an ultrawide monitor can't spawn an unbounded glyph count.
      //
      // DENSITY: the previous pass was ~2x too dense (desktop fill 0.17). This
      // pass HALVES the field on both surfaces — desktop 0.17→0.085, mobile
      // 0.085→0.0425 — back to the earlier, sparser look; caps halved to match
      // (3400→1700 desktop, 1040→520 mobile). Sparser frees up headroom to push
      // per-glyph brightness + the host opacity UP without crowding the copy.
      const cellsW = W / countCell;
      const cellsH = H / (countCell * 1.05);
      const fill = isMobile ? 0.0425 : 0.085;
      const cap = isMobile ? 520 : 1700;
      const target = Math.max(1, Math.min(cap, Math.round(cellsW * cellsH * fill)));
      stars = new Array(target);
      for (let i = 0; i < target; i++) {
        stars[i] = {
          a: Math.random() * Math.PI * 2,
          r0: Math.random(),
          z: Math.random(),
          s: 0.6 + Math.random() * 0.8,
          g: Math.random(),
          k: 0.75 + Math.random() * 0.6,
          b: Math.random(),
          h: Math.random(),
        };
      }
    }

    function resize() {
      const r = host!.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      // Draw in CSS pixels; the backing store is the DPR-scaled one.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      buildStars();
    }

    function render(dt: number) {
      const ccx = W * cx;
      const ccy = H * cy;
      // Spread radius: the larger viewport half-diagonal, so stars fly fully
      // off the edges before respawning near the center.
      const maxR = Math.sqrt(ccx * ccx + ccy * ccy) || 1;

      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        if (dt > 0) {
          // Accelerate outward: nearer (higher z) stars move faster — the
          // hallmark of a perspective fly-through.
          st.z += dt * st.s * (0.004 + st.z * 0.02);
          if (st.z >= 1) {
            st.z -= 1;
            st.a = Math.random() * Math.PI * 2;
            st.r0 = Math.random() * 0.22; // respawn near the vanishing point
            st.g = Math.random();
            st.k = 0.75 + Math.random() * 0.6;
            st.b = Math.random(); // fresh brightness draw so the spread stays lively
            st.h = Math.random(); // fresh hue draw along the reddish gradient
          }
        }

        // depth combines marching z with the star's radius seed — a star that
        // started further out reads as "nearer" (bigger/brighter) sooner.
        const depth = Math.min(0.999, st.z + st.r0 * 0.35);

        // perspective projection: radius grows with z toward the camera.
        const rr = (st.r0 + st.z) * maxR;
        const px = ccx + Math.cos(st.a) * rr;
        const py = ccy + Math.sin(st.a) * rr * 0.62; // squash for aspect
        if (px < -16 || px > W + 16 || py < -16 || py > H + 16) continue;

        // SIZE VARIANCE (now ~3x larger): refSize is ~3x the prior reference
        // cell, so the same depth+jitter curve yields glyphs ~3x bigger while
        // KEEPING the variance — font size scales with depth (near = larger)
        // and is jittered per-star (k) so equal-depth stars don't form rings.
        const size = refSize * (0.45 + depth * 1.25) * st.k;

        // BRIGHTNESS VARIANCE (wider, pushed BRIGHTER): depth still drives the
        // base (near = brighter) and a strong per-star seed (b) keeps the spread
        // off a smooth depth ramp — some glyphs read very bright, others stay
        // dim. Now that the field is HALF as dense, the curve is pushed UP: the
        // dim-gamma is softened (b*b → blended toward linear b) so more glyphs
        // climb into the clearly-visible band, and the ceiling is raised so the
        // bright end reads strongly. A small dim floor + the b*b term preserve
        // the dim-glyph variance so it never flattens to uniform.
        const bseed = st.b * st.b * 0.45 + st.b * 0.55; // softened gamma (was b*b)
        const bright = depth * 0.5 + bseed * 0.5; // 0..1, weighted toward bright
        const alpha = Math.min(1, 0.14 + bright * 0.92); // ~0.14 (dim) .. 1.0 (bright)

        const gi = Math.min(RAMP.length - 1, Math.floor((depth * 0.7 + st.g * 0.3) * RAMP.length));
        const ch = RAMP[gi];

        ctx!.font = `${size.toFixed(1)}px monospace`;
        ctx!.globalAlpha = alpha;
        // COLOR — reddish gradient: the warm-ramp lookup blends parchment toward
        // the redwood family by depth + vertical screen position + the per-star
        // hue seed, so the field reads as a warm reddish gradient (hue shifts
        // with depth AND screen-y) rather than monochrome. Near/bright stars are
        // occasionally promoted to a gilt fleck or a saturated redwood fleck for
        // sparkle on top of the gradient.
        if (depth > 0.62 && st.g < accent) {
          ctx!.fillStyle = giltVar;
        } else if (depth > 0.74 && st.g > 1 - accent * 0.5) {
          ctx!.fillStyle = accentVar;
        } else {
          // warm position along the ramp: depth pushes nearer stars redder,
          // lower-screen stars run warmer, and h scatters it per-star.
          const yfrac = py / H; // 0 (top) .. 1 (bottom)
          const warm = Math.min(0.999, Math.max(0, depth * 0.45 + yfrac * 0.3 + st.h * 0.4));
          ctx!.fillStyle = warmLut[Math.floor(warm * LUT_N)];
        }
        ctx!.fillText(ch, px, py);
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return; // throttle to ~30fps
      last = now;
      // Advance scaled by both the speed prop and real elapsed time so the
      // fly-through stays time-correct on slow/fast displays.
      render(speed * (elapsed / FRAME_MS));
    }

    function start() {
      if (raf || reduceMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    resize();
    render(0); // initial static frame (dense + size-varied even before motion)

    // Pause the loop when the field scrolls out of view.
    let io: IntersectionObserver | null = null;
    if (!reduceMotion) {
      io = new IntersectionObserver(
        (entries) => {
          const onScreen = entries[0]?.isIntersecting ?? true;
          if (onScreen) start();
          else stop();
        },
        { threshold: 0 },
      );
      io.observe(host);
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      render(0);
    });
    ro.observe(host);

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [cell, accent, speed, cx, cy]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // "Woodland Academia" — parchment text on forest-night, REDWOOD accent +
      // AGED GILT secondary. Mirrors the CSS custom properties in
      // src/styles/global.css so utilities and the ASCII island read the same
      // palette (the locked token contract: --accent, --gilt, --ascii-ink).
      colors: {
        bg: 'var(--bg)',
        'bg-deep': 'var(--bg-deep)',
        band: 'var(--band)',
        surface: 'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        inset: 'var(--inset)',
        line: 'var(--line)',
        hairline: 'var(--hairline)',
        divider: 'var(--divider)',
        'ink-muted': 'var(--ink-muted)',
        ink: 'var(--ink)',
        'ink-strong': 'var(--ink-strong)',
        accent: 'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-light': 'var(--accent-light)',
        'accent-press': 'var(--accent-press)',
        gilt: 'var(--gilt)',
        'gilt-light': 'var(--gilt-light)',
        'gilt-deep': 'var(--gilt-deep)',
        moss: 'var(--success)',
        clay: 'var(--danger)',
        bone: 'var(--ink-strong)',
      },
      fontFamily: {
        // Alegreya serif body + titles; IM Fell SC display + labels. NO monospace.
        // `mono` is repurposed to the classical label face so existing
        // `font-mono` utilities across components render as engraved small caps.
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        label: ['var(--font-label)'],
        mono: ['var(--font-label)'],
      },
      fontSize: {
        // Fluid type scale via clamp() — scales continuously between breakpoints.
        'fluid-xs': 'clamp(0.78rem, 0.72rem + 0.2vw, 0.88rem)',
        'fluid-sm': 'clamp(0.9rem, 0.84rem + 0.25vw, 1.02rem)',
        'fluid-base': 'clamp(1rem, 0.94rem + 0.34vw, 1.15rem)',
        'fluid-lg': 'clamp(1.18rem, 1.04rem + 0.6vw, 1.45rem)',
        'fluid-xl': 'clamp(1.4rem, 1.18rem + 1.1vw, 1.95rem)',
        'fluid-2xl': 'clamp(1.8rem, 1.36rem + 2vw, 2.85rem)',
        'fluid-3xl': 'clamp(2.3rem, 1.55rem + 3.4vw, 4.1rem)',
        'fluid-hero': 'clamp(2.6rem, 1.3rem + 6.4vw, 6.8rem)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      maxWidth: {
        container: 'min(92vw, 72rem)',
      },
      spacing: {
        section: 'clamp(4rem, 10vw, 9rem)',
      },
      boxShadow: {
        // Soft gilt-tinted ambient glow on cards; brighter on hover.
        glow: '0 0 0 1px var(--line), 0 8px 30px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(236,225,200,0.05)',
        'glow-hover':
          '0 0 0 1px rgba(194,163,95,0.34), 0 14px 44px -14px rgba(0,0,0,0.7), 0 0 56px -22px var(--glow)',
        'glow-accent': '0 0 0 1px rgba(194,163,95,0.4), 0 0 36px -10px var(--glow)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translate3d(0, 10px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        reveal: 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/* ============================================================
   CONTACT FORM — EmailJS island (client:visible)
   The PUBLIC_EMAILJS_* vars are inlined at build, so an absent key
   resolves to an EMPTY STRING (falsy), never undefined. When
   PUBLIC_EMAILJS_PUBLIC_KEY is falsy we render mailto-only mode
   (no emailjs.send call); otherwise we send + show success/error states.
   ============================================================ */

// Inlined at build by Astro/Vite. Absent → "" (falsy).
const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || '';

const TO_EMAIL = 'maunghtikebusiness@gmail.com';
const emailjsEnabled = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  // Simple client-side rate limit: one send per 20s.
  const lastSentRef = useRef<number>(0);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please enter a message.';
    return next;
  }

  function mailtoHref() {
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name || 'someone'}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name}${values.email ? ` (${values.email})` : ''}`,
    );
    return `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Mailto-only mode: no key configured → open the user's mail client.
    if (!emailjsEnabled) {
      window.location.href = mailtoHref();
      return;
    }

    const now = Date.now();
    if (now - lastSentRef.current < 20_000) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name,
          reply_to: values.email,
          from_email: values.email,
          to_email: TO_EMAIL,
          message: values.message,
        },
        { publicKey: PUBLIC_KEY },
      );
      lastSentRef.current = Date.now();
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-xl border bg-[rgba(255,255,255,0.02)] px-4 py-3 text-fluid-sm text-ink ' +
    'placeholder:text-ink-muted/70 outline-none transition focus:border-accent ' +
    'focus:shadow-[0_0_0_3px_var(--glow)]';

  if (status === 'success') {
    return (
      <div className="card p-6 sm:p-8" role="status" aria-live="polite">
        <div className="mb-3 font-mono text-fluid-sm text-accent">› message sent</div>
        <h3 className="mb-2 text-fluid-lg font-semibold text-ink">Message sent.</h3>
        <p className="text-fluid-sm text-ink-muted">
          The message has been delivered to {TO_EMAIL}. A reply typically follows
          within a few days.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-5"
          onClick={() => setStatus('idle')}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="mb-5">
        <div className="eyebrow mb-1">Send a message</div>
        {!emailjsEnabled && (
          <p className="font-mono text-fluid-xs text-ink-muted">
            Opens your mail client, pre-filled to {TO_EMAIL}.
          </p>
        )}
      </div>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-1.5 block font-mono text-fluid-xs uppercase tracking-wider text-ink-muted">
            Name
          </span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass + (errors.name ? ' border-red-400/70' : ' border-line')}
            placeholder="Your name"
          />
          {errors.name && <span className="mt-1 block text-fluid-xs text-red-400">{errors.name}</span>}
        </label>

        <label className="block">
          <span className="mb-1.5 block font-mono text-fluid-xs uppercase tracking-wider text-ink-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={inputClass + (errors.email ? ' border-red-400/70' : ' border-line')}
            placeholder="you@example.com"
          />
          {errors.email && <span className="mt-1 block text-fluid-xs text-red-400">{errors.email}</span>}
        </label>

        <label className="block">
          <span className="mb-1.5 block font-mono text-fluid-xs uppercase tracking-wider text-ink-muted">
            Message
          </span>
          <textarea
            name="message"
            value={values.message}
            onChange={onChange}
            rows={5}
            aria-invalid={Boolean(errors.message)}
            className={inputClass + ' resize-y' + (errors.message ? ' border-red-400/70' : ' border-line')}
            placeholder="Your message"
          />
          {errors.message && (
            <span className="mt-1 block text-fluid-xs text-red-400">{errors.message}</span>
          )}
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : emailjsEnabled ? 'Send message' : 'Compose email'}
        </button>
        {status === 'error' && (
          <span className="text-fluid-xs text-red-400" role="alert">
            Something went wrong.{' '}
            <a href={mailtoHref()} className="text-accent underline">
              Email directly
            </a>
            .
          </span>
        )}
      </div>
    </form>
  );
}

import { useState, type FormEvent } from 'react';

// Web3Forms access keys are meant to be used client-side (web3forms.com/docs) — not a secret.
const WEB3FORMS_ACCESS_KEY = '3b4ef07f-74f7-45d1-a1ec-3579c5701eb8';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return;
    data.set('access_key', WEB3FORMS_ACCESS_KEY);
    data.set('subject', 'New message from sohumbhatnagar.com');

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="contact-box" data-testid="contact-box">
      <span className="contact-box-label">Send a message</span>
      <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
        <input
          type="checkbox"
          name="botcheck"
          className="contact-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="contact-form-row">
          <input type="text" name="name" placeholder="Name" required disabled={status === 'sending'} />
          <input type="email" name="email" placeholder="Email" required disabled={status === 'sending'} />
        </div>
        <textarea
          name="message"
          placeholder="What are you building?"
          required
          rows={4}
          disabled={status === 'sending'}
        />
        <div className="contact-form-footer">
          <button type="submit" className="contact-submit" disabled={status === 'sending'} data-testid="contact-submit">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' && (
            <span className="contact-status contact-status--ok" data-testid="contact-status-ok">
              Sent. I&rsquo;ll get back to you soon.
            </span>
          )}
          {status === 'error' && (
            <span className="contact-status contact-status--err" data-testid="contact-status-error">
              Something went wrong. Try the email link above instead.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

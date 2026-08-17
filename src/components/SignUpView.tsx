import { useState, type FormEvent, type ReactElement } from 'react';
import { signInWithEmail } from '../lib/supabase';

interface SignUpViewProps {
  onAuthenticated: () => void;
}

export function SignUpView({ onAuthenticated }: SignUpViewProps): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { user, error: signInError } = await signInWithEmail(
        email,
        password,
      );
      if (signInError) {
        setError(signInError);
        return;
      }
      if (user) {
        onAuthenticated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-view">
      <div className="auth-card">
        <div className="auth-logo">
          <svg viewBox="0 0 48 48" className="logo-icon">
            <circle cx="24" cy="24" r="22" fill="#00D8F6" />
            <text
              x="24"
              y="31"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill="#070F1E"
              fontFamily="sans-serif"
            >
              📚
            </text>
          </svg>
          <h1>Learn with Archie</h1>
          <p className="auth-subtitle">YKS yolculuğunda yapay zekâ destekli rehberin</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifren"
              minLength={6}
              required
            />
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'İşleniyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
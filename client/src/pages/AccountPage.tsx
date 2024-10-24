import { FormEvent, useState } from 'react';
import { Auth } from '../lib/data';
import { useUser } from '../components/useUser';
import { useNavigate } from 'react-router-dom';

/*
  pageType can be "Log In" or "Sign Up"
*/
type accountPageProps = {
  pageType: string;
};

export function AccountPage({ pageType }: accountPageProps) {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);

      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };

      if (pageType === 'Sign Up') {
        const signUpRes = await fetch('/api/auth/sign-up', req);
        if (!signUpRes.ok) {
          /*
            sign up bug where userId can still increment when
            attempting to sign up using an existing username
          */
          // throw new Error('User already exists');
          throw new Error('Sign up error');
        }
        alert('Successfully registered!');
      }

      // user gets automatically logged in after registration
      const logInRes = await fetch('/api/auth/log-in', req);
      if (!logInRes.ok) {
        // currently not specific to bad username or password
        throw new Error(`fetch error: ${logInRes.status}`);
      }

      const { user, token } = (await logInRes.json()) as Auth;
      handleSignIn(user, token);
      navigate('/');
    } catch (err) {
      alert(`${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="page-heading">{pageType} Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            required
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            required
          />
        </div>
        <button disabled={isLoading}>{pageType}</button>
        {pageType === 'Log In' && (
          /*
            the "/" in navigate() is required to
            navigate to "/sign-up" instead of
            "/log-in/sign-up"
          */
          <p id="dont-have-acc" onClick={() => navigate('/sign-up')}>
            Don't have an account? Click here to create one.
          </p>
        )}
      </form>
    </>
  );
}

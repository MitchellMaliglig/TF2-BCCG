import { FormEvent, useState } from 'react';
import { Auth } from '../lib/data';
import { useUser } from '../components/useUser';
import { useNavigate } from 'react-router-dom';

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
          throw new Error('User already exists');
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
      <h2>{pageType} Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          {' '}
          Username
          <input type="text" name="username" required></input>
        </label>
        <label>
          {' '}
          Password
          <input type="password" name="password" required></input>
        </label>
        <button disabled={isLoading}>{pageType}</button>
      </form>
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
    </>
  );
}

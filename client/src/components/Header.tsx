import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

export function Header() {
  const navigate = useNavigate();
  const { user, handleSignOut } = useUser();

  return (
    <>
      <header>
        <div className="container row column-full">
          <h1>TF2-BCCG</h1>
          <nav>
            <h2 onClick={() => navigate('/')}>Home</h2>
            <h2 onClick={() => navigate('entries')}>Entries</h2>
            {!user && <h2 onClick={() => navigate('log-in')}>Log In</h2>}
            {user && (
              <h2
                onClick={() => {
                  handleSignOut();
                  navigate('/');
                }}>{`${user.username} | Log Out`}</h2>
            )}
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

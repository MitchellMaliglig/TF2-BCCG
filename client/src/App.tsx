import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { EntriesPage } from './pages/EntriesPage';
import { AccountPage } from './pages/AccountPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="entries" element={<EntriesPage />} />
        <Route path="log-in" element={<AccountPage pageType={'Log In'} />} />
        <Route path="sign-up" element={<AccountPage pageType={'Sign Up'} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

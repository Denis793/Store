import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemsPage from './pages/ItemsPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFound from './pages/NotFound';
import FavoritesPage from '@/pages/FavoritesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

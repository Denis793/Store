import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemsPage from './pages/ItemsPage';
import HistoryPage from './pages/HistoryPage';
import ShopPage from './pages/ShopPage';
import NotFound from './pages/NotFound';
import FavoritesPage from '@/pages/FavoritesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

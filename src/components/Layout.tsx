import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import { useUIStore } from '../lib/store';

function Layout() {
  const { isMobileMenuOpen, isCartDrawerOpen, closeAll } = useUIStore();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {isMobileMenuOpen && <MobileMenu onClose={closeAll} />}
      {isCartDrawerOpen && <CartDrawer onClose={closeAll} />}
    </div>
  );
}

export default Layout;
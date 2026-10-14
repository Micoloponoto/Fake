import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User, MapPin } from 'lucide-react';
import { useUIStore } from '../lib/store';
import { useCartStore } from '../lib/store';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/shop',
    children: [
      { name: 'All Products', href: '/shop' },
      { name: 'Bubu Clothing', href: '/shop/bubu-clothing' },
      { name: 'Two Piece', href: '/shop/two-piece' },
      { name: 'Fitted Dresses', href: '/shop/fitted-dresses' },
      { name: 'Dressy Jumpsuits', href: '/shop/dressy-jumpsuits' },
      { name: 'Sale', href: '/shop?onSale=true' },
      { name: 'New Arrivals', href: '/shop?newArrival=true' },
    ]
  },
  { 
    name: 'About', 
    href: '/about',
    children: [
      { name: 'Our Story', href: '/about' },
      { name: 'Size Chart', href: '/about#size-chart' },
      { name: 'Track Order', href: '/about#track-order' },
    ]
  },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Contact', href: '/contact' },
  { 
    name: 'Abuja Store', 
    href: '/store-location',
    children: [
      { name: 'Lagos Store', href: '/store-location' },
      { name: 'Abuja Store', href: '/store-location#abuja' },
    ]
  },
];
 
function Header() {
  const location = useLocation();
  const { toggleMobileMenu, toggleCartDrawer, toggleSearch } = useUIStore();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 animate-fade-in-down">
      {/* Top Bar */}
      <div className="hidden lg:flex items-center justify-between px-4 py-2 bg-primary-50 border-b border-primary-100 text-sm text-gray-600 animate-fade-in-down delay-75">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Ikeja, Lagos • Abuja Store Available
          </span>
          <span className="flex items-center gap-1">
            Mon-Sat: 9am - 7pm • Sun: 12pm - 5pm
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+2348012345678" className="hover:text-primary-600 transition-colors">
            +234 801 234 5678
          </a>
          <a href="mailto:info@tailoredbymichael.shop" className="hover:text-primary-600 transition-colors">
            info@tailoredbymichael.shop
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-700 font-display font-bold text-2xl lg:text-3xl" aria-label="Tailored by Michael Home">
            <span className="hidden lg:block">Tailored by Michael</span>
            <span className="lg:hidden">TBA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                        isActive(item.href)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      )}
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {item.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.children!.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors',
                              isActive(child.href)
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <button
              onClick={toggleSearch}
              className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
            <Link
              to="/account"
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" aria-hidden="true" />
            </Link>
            <button
              onClick={toggleCartDrawer}
              className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
            aria-expanded={false}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Search products"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
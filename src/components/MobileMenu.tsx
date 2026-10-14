import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, ShoppingBag, Search, User, MapPin, Clock, Phone } from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '../lib/store';
import { useCartStore } from '../lib/store';
import { cn } from '../lib/utils';
import AnimatedSection from './AnimatedSection';

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

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { toggleCartDrawer, toggleSearch } = useUIStore();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onClose} aria-hidden="true" />
      <aside className="fixed left-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-xl flex flex-col lg:hidden transform animate-slide-in-left [animation_duration:300ms]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="font-display font-bold text-2xl text-primary-700" onClick={onClose}>
            Tailored by Michael
          </Link>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <AnimatedSection key={item.name} delay={index * 75} animation="fade-in-left" rootMargin="0px 0px -20px">
            <div>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-3 text-left text-base font-medium rounded-lg transition-colors',
                      expandedMenus.includes(item.name)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )}
                    aria-expanded={expandedMenus.includes(item.name)}
                  >
                    {item.name}
                    {expandedMenus.includes(item.name) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    )}
                  </button>
                  {expandedMenus.includes(item.name) && (
                    <ul className="mt-1 ml-4 space-y-1 border-l-2 border-primary-100 pl-3 animate-slide-down [animation_duration:200ms]">
                    
                      {item.children!.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={onClose}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                     </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
              {item.name}
                </Link>
              )}
            </div>
            </AnimatedSection>
          ))}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => { toggleSearch(); onClose(); }}
              className="btn-outline"
            >
              <Search className="w-5 h-5 mr-2" aria-hidden="true" />
              Search
            </button>
            <Link to="/account" className="btn-outline text-center" onClick={onClose}>
              <User className="w-5 h-5 mr-2" aria-hidden="true" />
              Account
            </Link>
            <button
              onClick={() => { toggleCartDrawer(); onClose(); }}
              className="btn-primary relative"
            >
              <ShoppingBag className="w-5 h-5 mr-2" aria-hidden="true" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3">Store Information</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary-600 flex-shrink-0" aria-hidden="true" />
              <span>Ikeja, Lagos • Abuja Store Available</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-primary-600 flex-shrink-0" aria-hidden="true" />
              <span>Mon-Sat: 9am - 7pm • Sun: 12pm - 5pm</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-primary-600 flex-shrink-0" aria-hidden="true" />
              <a href="tel:+2348012345678" className="hover:text-primary-600">+234 801 234 5678</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;
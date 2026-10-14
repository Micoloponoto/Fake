import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container-custom text-center">
        <AnimatedSection animation="scale-in" rootMargin="0px 0px -20px">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-8xl lg:text-9xl font-medium text-primary-600 mb-4">
              404
            </h1>
            <h2 className="font-display text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary text-lg px-6 py-3 flex items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
              <Link to="/shop" className="btn-outline text-lg px-6 py-3 flex items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5" />
                Shop All Products
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default NotFound;

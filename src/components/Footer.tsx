import { Link } from 'react-router-dom';
import { Globe, Camera, MessageSquare, Video, ArrowRight, Heart, Star, Shield, Truck } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Bubu Clothing', href: '/shop/bubu-clothing' },
    { name: 'Two Piece', href: '/shop/two-piece' },
    { name: 'Fitted Dresses', href: '/shop/fitted-dresses' },
    { name: 'Dressy Jumpsuits', href: '/shop/dressy-jumpsuits' },
    { name: 'Sale', href: '/shop?onSale=true' },
    { name: 'New Arrivals', href: '/shop?newArrival=true' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Size Chart', href: '/about#size-chart' },
    { name: 'Track Order', href: '/about#track-order' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Store Locations', href: '/store-location' },
  ],
  support: [
    { name: 'Shipping Info', href: '/faq#shipping' },
    { name: 'Returns & Exchanges', href: '/faq#returns' },
    { name: 'Payment Methods', href: '/faq#payment' },
    { name: 'Size Guide', href: '/about#size-chart' },
    { name: 'Wholesale', href: '/contact#wholesale' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  contact: [
    { name: 'Ikeja, Lagos Store', href: '/store-location' },
    { name: 'Abuja Store', href: '/store-location#abuja' },
    { name: 'Call Us', href: 'tel:+2348012345678' },
    { name: 'Email Us', href: 'mailto:info@tailoredbymichael.shop' },
    { name: 'WhatsApp', href: 'https://wa.me/2348012345678' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/tailoredbymichael', icon: Globe },
  { name: 'Instagram', href: 'https://instagram.com/tailoredbymichael', icon: Camera },
  { name: 'Twitter', href: 'https://twitter.com/tailoredbymichael', icon: MessageSquare },
  { name: 'YouTube', href: 'https://youtube.com/tailoredbymichael', icon: Video },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over ₦100,000' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
  { icon: Heart, title: 'Easy Returns', description: 'Within 14 days' },
  { icon: Star, title: 'Quality Guarantee', description: 'Premium fabrics only' },
];

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Features Bar */}
      <div className="container-custom py-8 border-b border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
              <div className="flex items-start gap-3 text-center md:text-left group">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <AnimatedSection animation="fade-in-up" delay={0} rootMargin="0px 0px -20px">
            <div className="lg:col-span-2">
              <Link to="/" className="font-display font-bold text-2xl lg:text-3xl text-primary-700 mb-4 block">
                Tailored by Michael
              </Link>
              <p className="text-gray-600 mb-6 max-w-xs">
                Women's RTW Clothing Brand in Ikeja, Lagos. Timeless fashion for every woman. 
                Discover stylish and elegant ready-to-wear outfits designed for today's modern woman.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <AnimatedSection key={social.name} delay={idx * 75} animation="fade-in-up" rootMargin="0px 0px -20px">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-all duration-300 transform hover:scale-110"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Shop */}
          <AnimatedSection animation="fade-in-up" delay={100} rootMargin="0px 0px -20px">
            <nav aria-label="Shop links">
              <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 text-sm block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimatedSection>

          {/* Company */}
          <AnimatedSection animation="fade-in-up" delay={150} rootMargin="0px 0px -20px">
            <nav aria-label="Company links">
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 text-sm block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimatedSection>

          {/* Support */}
          <AnimatedSection animation="fade-in-up" delay={200} rootMargin="0px 0px -20px">
            <nav aria-label="Support links">
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 text-sm block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection animation="fade-in-up" delay={250} rootMargin="0px 0px -20px">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-3">
                {footerLinks.contact.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 text-sm"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Newsletter */}
      <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
        <div className="bg-primary-50 py-12 border-t border-gray-100">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display font-semibold text-xl lg:text-2xl text-gray-900 mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 mb-6">
                Get 10% off your first order, early access to sales, and style inspiration.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom Bar */}
      <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
        <div className="border-t border-gray-100 py-6">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Tailored by Michael. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="/terms" className="hover:text-primary-600 transition-all duration-300 hover:translate-y-[-1px]">Terms of Service</a>
                <a href="/privacy" className="hover:text-primary-600 transition-all duration-300 hover:translate-y-[-1px]">Privacy Policy</a>
                <a href="/cookies" className="hover:text-primary-600 transition-all duration-300 hover:translate-y-[-1px]">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 input-field"
        disabled={status === 'loading' || status === 'success'}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="btn-primary whitespace-nowrap transform hover:scale-105 transition-transform duration-300"
        disabled={status === 'loading' || status === 'success'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export default Footer;
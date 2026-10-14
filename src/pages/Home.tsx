import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Star, Heart, Pause, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=80',
    alt: 'Bubu gown collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1618932453348-5c8f91b5b8f9?w=1600&q=80',
    alt: 'Elegant dress collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93d5b715?w=1600&q=80',
    alt: 'Jumpsuit collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1650562325232-538b70cccb32?w=1600&q=80',
    alt: 'Two-piece set collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1696962678565-bee84e6b9cb6?w=1600&q=80',
    alt: 'Elegant two-piece ensemble',
  },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over ₦100,000 nationwide' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure checkout with encryption' },
  { icon: Star, title: 'Quality Guarantee', description: 'Premium fabrics & craftsmanship' },
  { icon: Heart, title: 'Easy Returns', description: 'Within 14 days, hassle-free' },
];

const categories = [
  { name: 'Bubu Clothing', slug: 'bubu-clothing', description: 'Flowing, traditional elegance', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80' },
  { name: 'Two Piece', slug: 'two-piece', description: 'Stylish and effortless', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80' },
  { name: 'Fitted Dresses', slug: 'fitted-dresses', description: 'Chic and contemporary', image: 'https://images.unsplash.com/photo-1502716119720-b23a93d5b715?w=800&q=80' },
  { name: 'Dressy Jumpsuits', slug: 'dressy-jumpsuits', description: 'Bold, modern designs', image: 'https://images.unsplash.com/photo-1618932453348-5c8f91b5b8f9?w=800&q=80' },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (!isPlaying) setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const { data: featuredProducts } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.products.featured(8),
  });

  const { data: newArrivals } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => api.products.newArrivals(8),
  });

  const { data: saleProducts } = useQuery({
    queryKey: ['products', 'on-sale'],
    queryFn: () => api.products.onSale(1, 8),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow Background */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Content */}
        <div className="container-custom h-full flex items-center relative z-10">
          <div className="max-w-3xl text-center text-white mx-auto">
            <AnimatedSection animation="fade-in-down" delay={200} rootMargin="0px 0px -20px">
              <span className="inline-block bg-accent-100/90 text-accent-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in-down delay-200">
                40% Website Clearance Sale - Limited Time!
              </span>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={300} rootMargin="0px 0px -20px">
              <h1 className="font-display font-medium text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 drop-shadow-lg">
                Timeless Fashion for Every Woman
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={400} rootMargin="0px 0px -20px">
              <p className="text-lg lg:text-xl mb-10 max-w-2xl mx-auto drop-shadow-md">
                Discover stylish and elegant ready-to-wear outfits designed for today's modern woman. 
                From chic office wear to weekend essentials, we create pieces that bring comfort, quality, and class.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={500} rootMargin="0px 0px -20px">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/shop" className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-300">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
                <Link to="/about" className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-300">
                  Our Story
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white ${isPlaying ? '' : 'animate-pulse-slow'}`}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <div className="flex items-start gap-3 text-center md:text-left">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-12 bg-primary-600 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-medium text-3xl lg:text-4xl text-white mb-4">
              40% Website Clearance Sale
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Final Sale – Up to 40% Off Selected Styles. While stocks last!
            </p>
            <Link to="/shop?onSale=true" className="inline-flex items-center gap-2 bg-white text-primary-600 font-medium px-6 py-3 rounded-lg hover:bg-primary-50 transition-all duration-300 transform hover:translate-y-[-2px]">
              Shop Sale
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
            <div className="text-center mb-12">
              <h2 className="font-display font-medium text-3xl lg:text-4xl text-gray-900 mb-4">
                Explore Our Collections
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our exclusive collection of Bubu Clothing, Two Piece, Fitted Dresses, and Dressy Jumpsuits.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <AnimatedSection key={category.slug} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <Link
                  to={`/shop/${category.slug}`}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100"
                  aria-label={`Shop ${category.name}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                       style={{ backgroundImage: `url(${category.image})` }} 
                       aria-hidden="true" />
                  <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                    <h3 className="font-display font-medium text-xl lg:text-2xl text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-primary-100 text-sm mb-4">{category.description}</p>
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                      Shop Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
                <h2 className="font-display font-medium text-3xl lg:text-4xl text-gray-900 mb-2">
                  Featured Collection
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="fade-in-right" delay={100} rootMargin="0px 0px -20px">
                <p className="text-gray-600">Handpicked favorites from our latest arrivals</p>
              </AnimatedSection>
            </div>
            <AnimatedSection animation="fade-in-left" delay={50} rootMargin="0px 0px -20px">
              <Link to="/shop" className="mt-4 md:mt-0 inline-flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                View All
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.data?.slice(0, 4).map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
                <h2 className="font-display font-medium text-3xl lg:text-4xl text-gray-900 mb-2">
                  New Arrivals
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="fade-in-right" delay={100} rootMargin="0px 0px -20px">
                <p className="text-gray-600">Fresh styles just landed</p>
              </AnimatedSection>
            </div>
            <AnimatedSection animation="fade-in-left" delay={50} rootMargin="0px 0px -20px">
              <Link to="/shop?newArrival=true" className="mt-4 md:mt-0 inline-flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                View All
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals?.data?.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
                <h2 className="font-display font-medium text-3xl lg:text-4xl text-gray-900 mb-2">
                  On Sale
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="fade-in-right" delay={100} rootMargin="0px 0px -20px">
                <p className="text-gray-600">Up to 40% off selected styles</p>
              </AnimatedSection>
            </div>
            <AnimatedSection animation="fade-in-left" delay={50} rootMargin="0px 0px -20px">
              <Link to="/shop?onSale=true" className="mt-4 md:mt-0 inline-flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                View All Sale
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts?.data?.data?.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="container-custom">
          <AnimatedSection animation="scale-in" rootMargin="0px 0px -20px">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display font-medium text-3xl lg:text-4xl text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Get 10% off your first order, early access to sales, and style inspiration delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Star, title: '4.9/5 Rating', desc: 'Based on 17+ Google reviews' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide & international' },
              { icon: Shield, title: 'Secure Payments', desc: '100% secure checkout' },
              { icon: Heart, title: 'Easy Returns', desc: '14-day return policy' },
            ].map((signal, index) => (
              <AnimatedSection key={signal.title} delay={index * 100} animation="fade-in-up" rootMargin="0px 0px -20px">
                <div className="p-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <signal.icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-medium text-gray-900">{signal.title}</h3>
                  <p className="text-sm text-gray-600">{signal.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
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
        className="flex-1 px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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

export default Home;
import { Link } from 'react-router-dom';
import { Truck, Shield, Star, Heart, Clock, MapPin, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const values = [
  { icon: Heart, title: 'Quality Assurance', description: 'Premium fabrics and craftsmanship in every piece' },
  { icon: Star, title: 'Customer Satisfaction', description: 'We strive to exceed your expectations with every purchase' },
  { icon: Truck, title: 'Nationwide Delivery', description: 'Fast and reliable shipping across Nigeria' },
  { icon: Shield, title: 'Secure Shopping', description: 'Your payment and personal information is always protected' },
];

function About() {
  return (
    <div className="min-h-screen">
      <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded with a passion for timeless fashion, Tailored by Michael brings elegant ready-to-wear
              clothing to women across Nigeria. Every piece is crafted with care, blending traditional
              African aesthetics with modern silhouettes.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-6">
                The Beginning
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tailored by Michael began in Ikeja, Lagos as a small boutique with a big vision:
                to create beautiful, affordable ready-to-wear clothing that celebrates the
                modern African woman. Our founder, Michael Adeyemi, started by hand-picking
                fabrics and designing pieces that would make every woman feel confident and elegant.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we've grown into a beloved brand with a flagship store in Lagos and
                a presence in Abuja. Our collections now include Bubu Clothing, Two Piece Sets,
                Fitted Dresses, and Dressy Jumpsuits — all designed with the same care and attention
                to detail that started it all.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"
                alt="Tailored by Michael store"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      
      {/* Our Values */}
      <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at Tailored by Michael.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={value.title} delay={index * 100} animation="scale-in" rootMargin="0px 0px -20px">
                  <div className="text-center bg-white p-8 rounded-xl shadow-sm">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
              <h2 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                Our Stores
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={100} rootMargin="0px 0px -20px">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit us at our flagship stores in Lagos and Abuja. We'd love to see you in person
                and help you find the perfect piece.
              </p>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0} animation="fade-in-up" rootMargin="0px 0px -20px">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                <h3 className="font-display text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Lagos Store
                </h3>
                <p className="text-gray-600 mb-2">
                  123 Adeola Odeku Street, Ikeja, Lagos, Nigeria
                </p>
                <p className="text-gray-600 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mon-Sat: 9am - 7pm, Sun: 12pm - 5pm
                </p>
                <Link to="/store-location" className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                  View on Map
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150} animation="fade-in-up" rootMargin="0px 0px -20px">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                <h3 className="font-display text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Abuja Store
                </h3>
                <p className="text-gray-600 mb-2">
                  Plot 456 Aminu Kano Crescent, Maitama, Abuja, Nigeria
                </p>
                <p className="text-gray-600 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mon-Sat: 9am - 7pm, Sun: 12pm - 5pm
                </p>
                <Link to="/store-location" className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                  View on Map
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>
        </div>
      </div>
    </section>
    </div>
  );
}

export default About;
import { MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const stores = [
  {
    id: 1,
    name: 'Lagos Store',
    address: '123 Adeola Odeku Street, Ikeja, Lagos, Nigeria',
    phone: '+234 801 234 5678',
    email: 'lagos@tailoredbymichael.shop',
    hours: 'Mon-Sat: 9am - 7pm, Sun: 12pm - 5pm',
    lat: 6.6035,
    lng: 3.3456,
    isMain: true,
  },
  {
    id: 2,
    name: 'Abuja Store',
    address: 'Plot 456 Aminu Kano Crescent, Maitama, Abuja, Nigeria',
    phone: '+234 802 567 8901',
    email: 'abuja@tailoredbymichael.shop',
    hours: 'Mon-Sat: 9am - 7pm, Sun: 12pm - 5pm',
    lat: 9.0765,
    lng: 7.3946,
    isMain: false,
  },
];

function StoreLocation() {
  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
              Visit Our Stores
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find us at our flagship stores in Lagos and Abuja. We'd love to see you in person
              and help you find the perfect piece.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {stores.map((store, index) => (
            <AnimatedSection key={store.id} delay={index * 150} animation="fade-in-up" rootMargin="0px 0px -20px">
              <div
                className={`border rounded-xl p-8 transition-all duration-300 transform hover:scale-[1.02] group ${store.isMain ? 'border-primary-600 bg-primary-50' : 'border-gray-200'}`}
              >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className={`w-5 h-5 ${store.isMain ? 'text-primary-600' : 'text-gray-600'}`} />
                <h2 className={`font-display text-2xl font-medium ${store.isMain ? 'text-primary-600' : 'text-gray-900'}`}>
                  {store.name}
                </h2>
                {store.isMain && (
                  <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Flagship
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <span className="text-gray-700">{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{store.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a
                    href={`tel:${store.phone}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a
                    href={`mailto:${store.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {store.email}
                  </a>
                </div>
              </div>

              <div className="mt-6">
                  <a
                    href={`https://maps.google.com/?q=${store.lat},${store.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-all duration-300 group"
                  >
                  Get Directions
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in-up" delay={200} rootMargin="0px 0px -20px">
          <div className="border border-gray-200 rounded-xl overflow-hidden h-96 bg-gray-100">
            <iframe
              title="Store locations map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103443.40567874381!2d3.3456!3d6.6035!5m2!1sen!2s!4v1!6e5!3m1!1v0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-hidden="true"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default StoreLocation;

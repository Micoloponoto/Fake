import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const contactInfo = [
  { icon: Mail, title: 'Email Us', description: 'info@tailoredbymichael.shop', action: 'mailto:info@tailoredbymichael.shop' },
  { icon: Phone, title: 'Call Us', description: '+234 801 234 5678', action: 'tel:+2348012345678' },
  { icon: MapPin, title: 'Visit Us', description: '123 Adeola Odeku Street, Ikeja, Lagos', action: '/store-location' },
  { icon: Clock, title: 'Business Hours', description: 'Mon-Sat: 9am - 7pm, Sun: 12pm - 5pm', action: null },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setMessage('Please fill in all required fields');
      return;
    }

    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thank you for contacting us! We will respond soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a question? Need assistance with your order? Want to share your experience?
              We'd love to hear from you.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.title} delay={index * 100} animation="fade-in-left" rootMargin="0px 0px -20px">
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:translate-y-[-2px]">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group transition-transform duration-300 hover:scale-110">
                    <info.icon className="w-5 h-5 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{info.title}</h3>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {info.description}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{info.description}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-in-up" delay={200} rootMargin="0px 0px -20px">
              <div className="border border-gray-200 rounded-xl p-8">
              <h2 className="font-display text-xl font-medium text-gray-900 mb-6">Send us a Message</h2>

              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <p className="text-green-700">{message}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <p className="text-red-700">{message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2"
                >
                   {status === 'loading' ? 'Sending...' : 'Send Message'}
                   <Send className="w-5 h-5" />
                 </button>
              </form>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

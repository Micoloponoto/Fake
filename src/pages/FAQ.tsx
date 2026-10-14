import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 14-day return policy from the date of delivery. Items must be in their original condition with all tags attached. Refunds are processed within 5-7 business days after we receive the returned item.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Orders are processed within 1-2 business days. Delivery within Lagos takes 1-3 business days, while nationwide delivery takes 3-7 business days. International shipping may take 7-14 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You will see the shipping cost at checkout before confirming your order.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive a confirmation email with a tracking number. You can track your order through the carrier\'s website or through our order tracking page using your order number.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, Mastercard, American Express), bank transfers, and cash on delivery for orders within Nigeria. All transactions are secured with end-to-end encryption.',
  },
  {
    question: 'How do I choose the right size?',
    answer: 'We recommend referring to our Size Chart, which provides measurements for each size. If you need assistance, our customer support team is happy to help you find the perfect fit.',
  },
  {
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled within 2 hours of placement. Please contact our customer support immediately if you need to make changes.',
  },
  {
    question: 'Do you have a physical store?',
    answer: 'Yes! We have flagship stores in Ikeja, Lagos and Maitama, Abuja. Visit our Store Location page for addresses, hours, and directions.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom max-w-3xl mx-auto">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Search FAQs"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No results found for "{searchQuery}". Try a different search term.
            </p>
          ) : (
            filteredFaqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 75} animation="fade-in-up" rootMargin="0px 0px -20px">
                <div
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <div className="transition-transform duration-300">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 py-4' : 'max-h-0'}`}>
                    <div className={`px-6 transition-all duration-300 ${openIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px]'}`}>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>

        {searchQuery && filteredFaqs.length === 0 && (
          <div className="text-center mt-8 pt-8 border-t border-gray-100">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact us
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;

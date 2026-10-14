import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Check, Package, Calendar, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { formatPrice } from '../lib/utils';
import AnimatedSection from '../components/AnimatedSection';

function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  const { data: orderData, isLoading, error } = useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => api.orders.getByNumber(orderNumber!),
    enabled: !!orderNumber,
  });

  const order = orderData?.data;

  useEffect(() => {
    if (order) {
      window.scrollTo(0, 0);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="border border-gray-200 rounded-xl p-8 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen py-16">
        <div className="container-custom text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-medium text-gray-900 mb-4">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the order you're looking for.
          </p>
          <Link to="/shop" className="btn-primary text-lg px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <AnimatedSection animation="scale-in" rootMargin="0px 0px -20px">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay={200} rootMargin="0px 0px -20px">
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your order. Your order number is{' '}
                <span className="font-bold text-gray-900">#{order.order_number}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                A confirmation email has been sent to {order.customer_email}
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in-up" delay={100} rootMargin="0px 0px -20px">
            <div className="border border-gray-200 rounded-xl p-6 lg:p-8 mb-8">
              <h2 className="font-display text-xl font-medium text-gray-900 mb-6">Order Details</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {order.items?.map((item: any, itemIndex: number) => (
                      <AnimatedSection key={item.id} delay={itemIndex * 75} animation="fade-in-right" rootMargin="0px 0px -20px">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {item.product_images && (
                              <img
                                src={JSON.parse(item.product_images)[0] || '/images/placeholder.svg'}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} x {formatPrice(item.price)}
                              {item.size && ` • ${item.size}`}
                              {item.color && ` • ${item.color}`}
                            </p>
                          </div>
                          <span className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping To
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>{order.customer_name}</p>
                    <p>{order.shipping_address}</p>
                    <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                    <p>{order.shipping_country}</p>
                    {order.customer_phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {order.customer_phone}
                      </p>
                    )}
                    <p className="flex items-center gap-2 pt-2">
                      <Mail className="w-4 h-4" />
                      {order.customer_email}
                    </p>
                  </div>

                  <h3 className="font-medium text-gray-900 mb-3 mt-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Estimated Delivery
                  </h3>
                  <p className="text-sm text-gray-700">
                    3-5 business days
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-8 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7.5% VAT)</span>
                  <span className="font-medium text-gray-900">{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={300} rootMargin="0px 0px -20px">
            <div className="text-center">
              <Link to="/shop" className="btn-primary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

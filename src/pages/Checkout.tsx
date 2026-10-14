import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { useCartStore } from '../lib/store';
import { NIGERIAN_STATES } from '../lib/utils';
import { formatPrice } from '../lib/utils';
import type { ApiResponse } from '../types';
import AnimatedSection from '../components/AnimatedSection';

function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 100000 ? 0 : subtotal >= 50000 ? 2000 : 3000;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shippingCost + tax;

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
    shipping_country: 'Nigeria',
    notes: '',
  });

  const checkoutMutation = useMutation({
    mutationFn: (data: any) => {
      const cartItems = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }));
      return api.orders.create(data, cartItems);
    },
    onSuccess: (response: ApiResponse<any>) => {
      if (response.success && response.data) {
        clearCart();
        queryClient.invalidateQueries({ queryKey: ['products'] });
        navigate(`/order/${response.data.order_number}`);
      } else {
        setError(response.error || 'Failed to place order');
      }
      setIsSubmitting(false);
    },
    onError: () => {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customer_name || formData.customer_name.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (!formData.customer_email) {
      setError('Email is required');
      return;
    }
    if (!formData.shipping_address || formData.shipping_address.length < 5) {
      setError('Shipping address is required');
      return;
    }
    if (!formData.shipping_city) {
      setError('City is required');
      return;
    }
    if (!formData.shipping_state) {
      setError('State is required');
      return;
    }

    setIsSubmitting(true);
    checkoutMutation.mutate(formData);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container-custom text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-medium text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add items to your cart before checking out.</p>
           <button
             onClick={() => navigate('/shop')}
             className="btn-primary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300"
           >
             Start Shopping
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <h1 className="font-display text-3xl font-medium text-gray-900 mb-8">Checkout</h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Phone Number</label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

            <div>
              <h2 className="font-display text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label">Street Address</label>
                  <input
                    type="text"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    name="shipping_city"
                    value={formData.shipping_city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="label">State</label>
                  <select
                    name="shipping_state"
                    value={formData.shipping_state}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select State</option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="shipping_zip"
                    value={formData.shipping_zip}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="label">Country</label>
                  <input
                    type="text"
                    name="shipping_country"
                    value={formData.shipping_country}
                    onChange={handleChange}
                    className="input-field"
                    defaultValue="Nigeria"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Any special instructions for delivery..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-wiggle">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 text-lg transform hover:scale-105 transition-transform duration-300"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </form>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-left" delay={100} rootMargin="0px 0px -20px">
            <div>
              <div className="border border-gray-200 rounded-xl p-6 space-y-4">
                <h2 className="font-display text-xl font-medium text-gray-900">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7.5% VAT)</span>
                    <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

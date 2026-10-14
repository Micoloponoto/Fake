import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../lib/store';
import { formatPrice } from '../lib/utils';
import AnimatedSection from '../components/AnimatedSection';

function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100000 ? 0 : subtotal >= 50000 ? 2000 : 3000;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.productId, item.size, item.color);
    } else {
      updateQuantity(item.productId, newQuantity, item.size, item.color);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
      <div className="container-custom text-center">
        <AnimatedSection animation="scale-in" rootMargin="0px 0px -20px">
          <div>
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-medium text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
              Browse our collection and find something you love.
            </p>
            <Link to="/shop" className="btn-primary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
              Start Shopping
            </Link>
          </div>
        </AnimatedSection>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <h1 className="font-display text-3xl font-medium text-gray-900 mb-8">Shopping Cart</h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="hidden sm:table-row-header">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b">
                    <div className="col-span-5 font-medium text-gray-900">Product</div>
                    <div className="col-span-2 font-medium text-gray-900">Price</div>
                    <div className="col-span-2 font-medium text-gray-900 text-center">Quantity</div>
                    <div className="col-span-2 font-medium text-gray-900 text-right">Total</div>
                    <div className="col-span-1" />
                  </div>
                </div>

              <ul className="divide-y divide-gray-100">
                {items.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  const price = product.sale_price ?? product.price;
                  const itemTotal = price * item.quantity;
                  const key = `${item.productId}-${item.size || 'default'}-${item.color || 'default'}`;

                  return (
                    <AnimatedSection key={key} animation="fade-in-up" rootMargin="0px 0px -20px">
                      <li className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-4 sm:px-6 py-5 items-center">
                        <div className="sm:col-span-5 flex items-center gap-4">
                          <Link to={`/product/${product.slug}`} className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg group">
                            <img
                              src={product.images[0] || '/images/placeholder.svg'}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
                            />
                          </Link>
                          <div>
                            <Link to={`/product/${product.slug}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                              {product.name}
                            </Link>
                            {(item.size || item.color) && (
                              <p className="text-sm text-gray-500 mt-1">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && ' / '}
                                {item.color && `Color: ${item.color}`}
                              </p>
                            )}
                            <button
                              onClick={() => removeItem(item.productId, item.size, item.color)}
                              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-2 sm:hidden transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-2 text-gray-900">{formatPrice(price)}</div>

                        <div className="sm:col-span-2">
                          <div className="flex items-center justify-center gap-1 border border-gray-300 rounded-lg w-fit mx-auto sm:mx-0">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1.5 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                              disabled={product.stock_quantity ? item.quantity >= product.stock_quantity : false}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="sm:col-span-2 text-right font-medium text-gray-900">
                          {formatPrice(itemTotal)}
                        </div>

                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeItem(item.productId, item.size, item.color)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    </AnimatedSection>
                  );
                })}
              </ul>
            </div>

            <AnimatedSection animation="fade-in-up" delay={100} rootMargin="0px 0px -20px">
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </AnimatedSection>
        </div>
        </AnimatedSection>

          <AnimatedSection animation="fade-in-left" rootMargin="0px 0px -20px">
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-xl p-6 space-y-4">
                <h2 className="font-display text-xl font-medium text-gray-900">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
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

                {subtotal < 100000 && (
                  <p className="text-xs text-gray-500 text-center">
                    Add {formatPrice(100000 - subtotal)} more for free shipping!
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3 text-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../lib/store';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 100000 ? 0 : subtotal >= 50000 ? 2000 : 3000;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={onClose} aria-hidden="true" />
        <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col animate-slide-in-right [animation_duration:300ms]">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close cart">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
              <Link to="/shop" className="btn-primary" onClick={onClose}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 lg:hidden animate-fade-in" onClick={onClose} aria-hidden="true" />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-sm lg:max-w-md bg-white shadow-xl flex flex-col lg:static lg:h-auto lg:w-auto lg:shadow-none lg:border-l lg:border-gray-100 animate-slide-in-right [animation_duration:300ms]">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Shopping Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close cart">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4" role="list" aria-label="Cart items">
            {items.map((item) => {
              const product = item.product;
              if (!product) return null;
              const price = product.sale_price ?? product.price;
              const itemTotal = price * item.quantity;
              const key = `${product.id}-${item.size ?? 'default'}-${item.color ?? 'default'}`;
              
              return (
                <li key={key} className="flex gap-3 relative">
                  <Link to={`/product/${product.slug}`} className="flex-shrink-0 w-20 h-20 relative" aria-label={`${product.name} - ${formatPrice(price)}`}>
                    <img
                      src={product.images[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {product.on_sale && product.sale_price && (
                      <span className="absolute top-1 left-1 bg-accent-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        SALE
                      </span>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.slug}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors text-sm line-clamp-2" onClick={onClose}>
                      {product.name}
                    </Link>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <p className="font-semibold text-gray-900 mt-1">{formatPrice(itemTotal)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(product.id, item.size, item.color)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity - 1, item.size, item.color)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity + 1, item.size, item.color)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                        disabled={product.stock_quantity ? item.quantity >= product.stock_quantity : false}
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cart Summary */}
        <div className="border-t border-gray-100 p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (7.5% VAT)</span>
            <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
          </div>
          {subtotal < 100000 && (
            <p className="text-xs text-gray-500 text-center">
              Add {formatPrice(100000 - subtotal)} more for free shipping!
            </p>
          )}
          <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          <Link
            to="/checkout"
            className="btn-primary w-full text-center"
            onClick={onClose}
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
          
          <button
            onClick={clearCart}
            className="btn-outline w-full text-center"
            disabled={items.length === 0}
          >
            Clear Cart
          </button>
          
          <p className="text-center text-xs text-gray-500">
            Shipping and taxes calculated at checkout
          </p>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;
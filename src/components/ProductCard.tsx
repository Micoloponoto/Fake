import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice, isOnSale } from '../lib/utils';
import { useCartStore } from '../lib/store';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCartStore();
  const price = product.sale_price ?? product.price;
  const onSale = isOnSale(product);
  const discountPercent = onSale && product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  if (variant === 'compact') {
    return (
      <Link to={`/product/${product.slug}`} className="flex gap-3 group">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.images[0] || '/images/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            {onSale && (
              <span className="price-sale">{formatPrice(price)}</span>
            )}
            {onSale && (
              <span className="price-original">{formatPrice(product.price)}</span>
            )}
            {!onSale && (
              <span className="price-regular">{formatPrice(price)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="product-card group transition-transform duration-300 hover:translate-y-[-4px]">
      <Link to={`/product/${product.slug}`} className="block relative" aria-label={`View ${product.name} - ${formatPrice(price)}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0] || '/images/placeholder.svg'}
            alt={product.name}
            className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            {onSale && (
              <span className="sale-badge">
                -{discountPercent}%
              </span>
            )}
            {product.new_arrival && !onSale && (
              <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                New
              </span>
            )}
            {product.featured && !onSale && !product.new_arrival && (
              <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary text-sm py-2"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4 mr-1" aria-hidden="true" />
              Add to Cart
            </button>
            <button
              className="btn-secondary p-2 transition-transform duration-200 hover:scale-110"
              aria-label={`Add ${product.name} to wishlist`}
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category_name}
          </span>
          {product.sku && (
            <span className="text-xs text-gray-400">{product.sku}</span>
          )}
        </div>
        
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {onSale && (
            <>
              <span className="price-sale">{formatPrice(price)}</span>
              <span className="price-original">{formatPrice(product.price)}</span>
            </>
          )}
          {!onSale && (
            <span className="price-regular">{formatPrice(price)}</span>
          )}
        </div>

        {product.short_description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.short_description}
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
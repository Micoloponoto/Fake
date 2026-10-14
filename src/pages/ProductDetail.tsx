import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ShoppingBag, Star, Heart, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { api } from '../lib/api';
import { formatPrice, isOnSale, getProductPrice } from '../lib/utils';
import { useCartStore } from '../lib/store';
import AnimatedSection from '../components/AnimatedSection';

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.products.detail(slug!),
    enabled: !!slug,
  });

  const product = productData?.data;

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setSelectedColor(product.colors[0] || null);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes.length > 0 && !selectedSize) return;
    if (product.colors.length > 0 && !selectedColor) return;
    addItem(product, quantity, selectedSize ?? undefined, selectedColor ?? undefined);
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-lg aspect-square animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const price = getProductPrice(product);
  const onSale = isOnSale(product);
  const discountPercent = onSale && product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6 transition-all duration-300 hover:translate-x-[-2px]"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection animation="fade-in-right" rootMargin="0px 0px -20px">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                {product.images[selectedImage] && (
                  <img
                    src={product.images[selectedImage]}
                    alt={`${product.name} - ${selectedColor || ''}`}
                    className="w-full h-full object-cover transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
                  />
                )}
                {onSale && discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-accent-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index ? 'border-primary-600 scale-110' : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-left" delay={100} rootMargin="0px 0px -20px">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  {product.category_name}
                </p>
                <h1 className="font-display text-3xl font-medium text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(17 reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  {onSale ? (
                    <>
                      <span className="price-sale">{formatPrice(price)}</span>
                      <span className="price-original">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="price-regular">{formatPrice(price)}</span>
                  )}
                </div>
              </div>

              {product.short_description && (
                <p className="text-gray-600">{product.short_description}</p>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
                          selectedColor === color
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                    disabled={product.stock_quantity ? quantity >= product.stock_quantity : false}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 btn-primary py-3 text-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over ₦100,000 nationwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% secure checkout</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">14-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

        {product.description && (
          <AnimatedSection animation="fade-in-up" delay={200} rootMargin="0px 0px -20px">
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h2 className="font-display text-2xl font-medium text-gray-900 mb-4">Product Details</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </AnimatedSection>
        )}

        {product.sku && (
          <AnimatedSection animation="fade-in-up" delay={300} rootMargin="0px 0px -20px">
            <div className="mt-4 text-sm text-gray-500">
              SKU: {product.sku}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  </div>
  );
}

export default ProductDetail;

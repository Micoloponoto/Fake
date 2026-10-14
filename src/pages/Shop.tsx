import { useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Filter, Grid, List, X } from 'lucide-react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import AnimatedSection from '../components/AnimatedSection';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLOR_OPTIONS = ['Black', 'White', 'Navy', 'Emerald', 'Burgundy', 'Gold', 'Silver', 'Rose Gold', 'Champagne', 'Red', 'Royal Blue', 'Blush Pink', 'Mint Green', 'Teal', 'Coral', 'Lavender'];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ category?: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = params.category || searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const sortBy = (searchParams.get('sortBy') as any) || 'newest';
  const onSale = searchParams.get('onSale') === 'true' || undefined;
  const newArrival = searchParams.get('newArrival') === 'true' || undefined;
  const featured = searchParams.get('featured') === 'true' || undefined;

  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const minPrice = searchParams.get('minPrice') || undefined;
  const maxPrice = searchParams.get('maxPrice') || undefined;
  const selectedSizes = searchParams.getAll('sizes');
  const selectedColors = searchParams.getAll('colors');

  const filters: any = { sortBy, page: currentPage, limit };
  if (category) filters.category = category;
  if (search) filters.search = search;
  if (onSale) filters.onSale = true;
  if (newArrival) filters.newArrival = true;
  if (featured) filters.featured = true;
  if (minPrice !== undefined) filters.minPrice = parseFloat(minPrice);
  if (maxPrice !== undefined) filters.maxPrice = parseFloat(maxPrice);
  if (selectedSizes.length > 0) filters.sizes = selectedSizes;
  if (selectedColors.length > 0) filters.colors = selectedColors;

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.products.list(filters),
  });

  const products = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 0;

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    updateFilters({ sizes: newSizes });
  };

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    updateFilters({ colors: newColors });
  };

  const updateFilters = (updates: Record<string, any>) => {
    const newParams = new URLSearchParams();
    const current = Object.fromEntries(searchParams);
    Object.assign(current, updates);
    Object.entries(current).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => newParams.append(key, v));
        } else {
          newParams.set(key, value);
        }
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateFilters({ page });
  };

  if (error) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-gray-600">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container-custom">
        <AnimatedSection animation="fade-in-up" rootMargin="0px 0px -20px">
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="font-display text-2xl lg:text-3xl font-medium text-gray-900">
              {category ? category.replace(/-/g, ' ') : 'All Products'}
            </h1>
            <span className="text-sm text-gray-600">{total} products</span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={100} rootMargin="0px 0px -20px">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden btn-outline flex items-center gap-2"
                aria-label="Filter products"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value, page: 1 })}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600 scale-110' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600 scale-110' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice || ''}
                    onChange={(e) => updateFilters({ minPrice: e.target.value, page: 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice || ''}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value, page: 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                          selectedSizes.includes(size)
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                          selectedColors.includes(color)
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={clearFilters}
                  className="btn-outline text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500">No products found.</p>
                  </div>
                ) : (
                  <>
                   <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                     {products.map((product: any, index: number) => (
                       <AnimatedSection key={product.id} delay={index * 50} animation="fade-in-up" rootMargin="0px 0px -20px">
                         <ProductCard product={product} variant={viewMode === 'list' ? 'compact' : 'default'} />
                       </AnimatedSection>
                     ))}
                   </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-gray-100">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                              currentPage === pageNum
                                ? 'bg-primary-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50 hover:scale-105'
                            }`}
                          >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col overflow-y-auto animate-slide-in-right [animation_duration:300ms]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice || ''}
                    onChange={(e) => updateFilters({ minPrice: e.target.value, page: 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice || ''}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value, page: 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                          selectedSizes.includes(size)
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                          selectedColors.includes(color)
                            ? 'bg-primary-600 text-white border-primary-600 scale-105'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:scale-105'
                        }`}
                      >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button onClick={clearFilters} className="flex-1 btn-outline">
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 btn-primary"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;

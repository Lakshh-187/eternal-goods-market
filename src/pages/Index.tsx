
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart, ShoppingBag } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import productsData from '@/data/products';

const Index = () => {
  const featuredProducts = productsData.filter(product => product.isFeatured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60"></div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight">
              Products with a Guarantee <span className="text-gold-400">Beyond Life</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Every purchase empowers communities through education, nutrition, and clothing - creating blessings that last eternally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
                <Link to="/products">
                  Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/about">
                  Our Mission <Heart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-purple-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Button variant="ghost" className="text-purple-600" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Every purchase you make creates lasting change in communities around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Education</h3>
              <p className="text-gray-600">
                We've provided education support to over 500 children through your purchases.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Nutrition</h3>
              <p className="text-gray-600">
                Your purchases have provided over 10,000 nutritious meals to children in need.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Clothing</h3>
              <p className="text-gray-600">
                We've supplied clothing to over 1,200 individuals in underserved communities.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/impact">
                Learn More About Our Impact
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="container-custom">
          <h2 className="section-title text-white text-center mb-12">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-700 bg-opacity-50 p-6 rounded-lg">
              <div className="flex text-gold-400 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="italic mb-4">
                "Knowing that my purchase helped provide education to children gives me a sense of peace. The bracelet is beautiful and a constant reminder of the good it brought to the world."
              </p>
              <div className="font-medium">Sarah M.</div>
            </div>
            <div className="bg-purple-700 bg-opacity-50 p-6 rounded-lg">
              <div className="flex text-gold-400 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="italic mb-4">
                "I was skeptical at first, but after receiving my prayer shawl and seeing the impact report, I'm a true believer. The quality is amazing and knowing it helps others makes it priceless."
              </p>
              <div className="font-medium">Michael J.</div>
            </div>
            <div className="bg-purple-700 bg-opacity-50 p-6 rounded-lg">
              <div className="flex text-gold-400 mb-3">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="italic mb-4">
                "The blessing box subscription has transformed how I think about my purchases. Each month, I'm reminded of the eternal impact we can make. It's more than products - it's purpose."
              </p>
              <div className="font-medium">Priya K.</div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
              <Link to="/feedback">
                Share Your Story
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-purple-500 to-purple-800 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Start Creating Eternal Impact Today
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Every purchase creates blessings that last beyond life. Explore our collection and make a difference that transcends time.
            </p>
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
              <Link to="/products">
                Shop Our Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

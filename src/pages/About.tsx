
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight">
              Our Mission
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Creating products with impact that extends beyond life,
              empowering communities and creating eternal blessings.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Eternal Goods Market was founded on a simple but profound belief: the good we do in this world can last forever. Our founder, after experiencing a profound spiritual awakening, realized that material possessions are temporary, but the positive impact of our actions can be eternal.
              </p>
              <p className="text-gray-600 mb-4">
                We started with a single handcrafted bracelet, made by artisans from a small village, with proceeds funding education for local children. Today, we've expanded our collection, but our mission remains the same: to create beautiful products that carry blessings beyond life by supporting education, nutrition, and clothing initiatives globally.
              </p>
              <p className="text-gray-600">
                By purchasing our products, you're not just acquiring a material item—you're investing in eternal impact, creating ripples of positive change that extend far beyond your lifetime.
              </p>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg">
              <img src="/placeholder.svg" alt="Our founder" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-purple-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Eternal Impact</h3>
              <p className="text-gray-600">
                We believe the most valuable possessions are the positive changes we create in the world that continue to ripple outward long after we're gone.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Community Empowerment</h3>
              <p className="text-gray-600">
                We partner with artisans and communities around the world, ensuring fair wages and sustainable practices while preserving cultural traditions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Transparent Impact</h3>
              <p className="text-gray-600">
                We believe in complete transparency about how your purchases create positive change, providing detailed impact reports for every product.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                <img src="/placeholder.svg" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-playfair font-semibold">Sarah Johnson</h3>
              <p className="text-purple-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Passionate about creating sustainable businesses that make a positive impact on the world.
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                <img src="/placeholder.svg" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-playfair font-semibold">Michael Chen</h3>
              <p className="text-purple-600 mb-2">Community Impact Director</p>
              <p className="text-gray-600 text-sm">
                Coordinates with our partner communities to ensure effective implementation of our social good initiatives.
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                <img src="/placeholder.svg" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-playfair font-semibold">Priya Sharma</h3>
              <p className="text-purple-600 mb-2">Product Designer</p>
              <p className="text-gray-600 text-sm">
                Works with artisans to create products that honor traditional techniques while meeting modern design sensibilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Every purchase creates eternal impact. Explore our products and become part of our mission to create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
              <Link to="/products">
                Shop Our Products
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/impact">
                See Our Impact
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

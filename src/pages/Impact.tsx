
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Impact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight">
              Our Eternal Impact
            </h1>
            <p className="text-xl text-gray-200">
              Your purchases create lasting change in communities across the world - 
              blessings that continue beyond lifetimes.
            </p>
          </div>
        </div>
      </section>
      
      {/* Impact Metrics */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-purple-800 mb-2">12,500+</div>
              <h3 className="text-xl font-playfair mb-4">Meals Provided</h3>
              <p className="text-gray-600">
                Nutritious meals provided to children in underserved communities, supporting health and cognitive development.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-purple-800 mb-2">500+</div>
              <h3 className="text-xl font-playfair mb-4">Children Educated</h3>
              <p className="text-gray-600">
                Children received access to education, including school supplies, tuition, and educational support services.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-purple-800 mb-2">1,200+</div>
              <h3 className="text-xl font-playfair mb-4">Clothing Items</h3>
              <p className="text-gray-600">
                Clothing items provided to individuals in need, offering protection, dignity, and comfort.
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">How Your Purchase Creates Impact</h2>
            <p className="text-lg text-gray-600 mb-8">
              Every purchase you make directly contributes to our three core initiatives. We partner with established local organizations to ensure effective implementation and maximum impact.
            </p>
            
            <Tabs defaultValue="education" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="clothing">Clothing</TabsTrigger>
              </TabsList>
              <TabsContent value="education" className="p-6 bg-purple-50 rounded-lg mt-4 text-left">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img src="/placeholder.svg" alt="Education initiative" className="rounded-lg w-full aspect-square object-cover" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-playfair font-semibold mb-3">Education Initiative</h3>
                    <p className="text-gray-600 mb-4">
                      We partner with local schools and educational organizations to provide resources, teacher training, and scholarships to children who would otherwise lack access to quality education.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>School supplies for entire classrooms</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Teacher training and support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Scholarships for continuing education</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Building and renovating school facilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="p-6 bg-purple-50 rounded-lg mt-4 text-left">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img src="/placeholder.svg" alt="Nutrition initiative" className="rounded-lg w-full aspect-square object-cover" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-playfair font-semibold mb-3">Nutrition Initiative</h3>
                    <p className="text-gray-600 mb-4">
                      We work with food banks and community kitchens to provide nutritious meals to children and families in need, supporting healthy development and reducing food insecurity.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Daily meals for school children</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Community kitchen support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Nutrition education programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Emergency food relief during crises</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="clothing" className="p-6 bg-purple-50 rounded-lg mt-4 text-left">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img src="/placeholder.svg" alt="Clothing initiative" className="rounded-lg w-full aspect-square object-cover" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-playfair font-semibold mb-3">Clothing Initiative</h3>
                    <p className="text-gray-600 mb-4">
                      We provide new, quality clothing to those in need, focusing on children and individuals in challenging circumstances, offering protection, dignity, and a fresh start.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Seasonal clothing for children</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>School uniforms for students</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Work attire for job seekers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Emergency clothing during disasters</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Impact Stories */}
      <section className="py-16 bg-purple-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Impact Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img src="/placeholder.svg" alt="Impact story" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-2">Maya's Educational Journey</h3>
                <p className="text-gray-600 mb-4">
                  Maya, a 12-year-old from a remote village, received educational support through our program. Today, she's the first in her family to attend secondary school and dreams of becoming a teacher.
                </p>
                <Button variant="outline" className="text-purple-600 border-purple-600">
                  Read Full Story
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img src="/placeholder.svg" alt="Impact story" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-2">The Village School Transformation</h3>
                <p className="text-gray-600 mb-4">
                  A small school serving 120 children received supplies, teacher training, and facility upgrades. Attendance rates have increased by 40%, and test scores have improved significantly.
                </p>
                <Button variant="outline" className="text-purple-600 border-purple-600">
                  Read Full Story
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View All Impact Stories
            </Button>
          </div>
        </div>
      </section>
      
      {/* Partner Organizations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Partner Organizations</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center p-6 bg-gray-100 aspect-square rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">Org 1</div>
                <div className="text-sm text-gray-600">Education Partner</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-100 aspect-square rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">Org 2</div>
                <div className="text-sm text-gray-600">Nutrition Partner</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-100 aspect-square rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">Org 3</div>
                <div className="text-sm text-gray-600">Clothing Partner</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-100 aspect-square rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">Org 4</div>
                <div className="text-sm text-gray-600">Community Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
            Make Your Impact Today
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Every purchase creates eternal blessings. Explore our products and join our mission of creating lasting change.
          </p>
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
            <Link to="/products">
              Shop Our Products
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Impact;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Heart, Shield, Users, Check, BarChart4, FileCheck, Gift, User, UserRound, BookOpen, Route, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MissionAndModel = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-purple-800 bg-opacity-60"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 leading-tight">
              Our Mission & Working Model
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Creating eternal impact through products that empower communities, with a transparent
              ecosystem connecting donors, social activists, and beneficiaries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold" asChild>
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="#working-model">
                  How It Works
                </a>
              </Button>
            </div>
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
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Eternal Impact</h3>
              <p className="text-gray-600">
                We believe the most valuable possessions are the positive changes we create in the world that continue to ripple outward long after we're gone.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Community Empowerment</h3>
              <p className="text-gray-600">
                We partner with artisans and communities around the world, ensuring fair wages and sustainable practices while preserving cultural traditions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">Transparent Impact</h3>
              <p className="text-gray-600">
                We believe in complete transparency about how your purchases create positive change, providing detailed impact reports for every product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Model Section */}
      <section id="working-model" className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Our Working Model</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            A transparent ecosystem connecting donors, social activists, and beneficiaries to create lasting impact that extends beyond life.
          </p>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="mb-16">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="for-donors" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>For Donors</span>
              </TabsTrigger>
              <TabsTrigger value="for-activists" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>For Social Activists</span>
              </TabsTrigger>
              <TabsTrigger value="verification" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Verification</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 bg-white rounded-lg shadow-sm border mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-2xl font-playfair font-semibold mb-4 text-purple-800">How It Works</h2>
                  <p className="mb-4">
                    Our platform serves as a bridge between those who wish to make a difference and those who are actively working on social causes. When you purchase products through our platform:
                  </p>
                  <ol className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">1</div>
                      <div>
                        <strong className="text-purple-800">You select a product</strong> that resonates with your values and the cause you wish to support.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">2</div>
                      <div>
                        <strong className="text-purple-800">Your purchase funds</strong> go directly toward empowering underserved communities through education, food, clothing, and more.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">3</div>
                      <div>
                        <strong className="text-purple-800">You receive a product</strong> along with a guarantee receipt that details the beneficiaries who were helped.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">4</div>
                      <div>
                        <strong className="text-purple-800">The impact continues</strong> through the blessings and goodwill generated, extending your legacy beyond life.
                      </div>
                    </li>
                  </ol>
                  <Button asChild className="mt-2">
                    <Link to="/products">
                      Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-semibold mb-4 text-purple-800">Our Ecosystem</h2>
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <UserRound className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium text-purple-800">Donors</h3>
                      </div>
                      <p className="text-sm">
                        Individuals who purchase products, funding charitable initiatives while receiving quality items with eternal impact.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium text-purple-800">Social Activists</h3>
                      </div>
                      <p className="text-sm">
                        Change-makers who register campaigns and implement projects with the funds received from product sales.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium text-purple-800">Our Platform</h3>
                      </div>
                      <p className="text-sm">
                        We verify social activists, ensure proper fund allocation, and maintain transparency throughout the process.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Heart className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium text-purple-800">Beneficiaries</h3>
                      </div>
                      <p className="text-sm">
                        The underserved communities who receive support through your purchases, whose blessings extend your impact beyond life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* For Donors Tab */}
            <TabsContent value="for-donors" className="p-6 bg-white rounded-lg shadow-sm border mt-4">
              <h2 className="text-2xl font-playfair font-semibold mb-6 text-purple-800">For Donors: How Your Purchase Creates Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border p-5 rounded-lg">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Choose with Purpose</h3>
                  <p className="text-sm text-gray-600">
                    Browse our catalog of products, each attached to specific social causes. Choose items that align with the values and impacts you wish to support.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Receive Verification</h3>
                  <p className="text-sm text-gray-600">
                    With your purchase, you'll receive a Guarantee Receipt listing all beneficiaries helped through your contribution, providing full transparency.
                  </p>
                </div>
                <div className="border p-5 rounded-lg">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <BarChart4 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Track Your Impact</h3>
                  <p className="text-sm text-gray-600">
                    Follow the journey of your contribution through our impact tracking dashboard, with updates on the projects you've supported.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h3 className="font-medium text-lg mb-3">The Eternal Guarantee</h3>
                <p className="mb-4">
                  What makes our products truly unique is the eternal guarantee. When you purchase from us:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>The good deeds funded by your purchase create blessings that extend beyond life</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Your legacy continues through the positive impact on others' lives</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Every product purchase includes a spiritual guarantee based on universal principles of charity</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/products">Start Your Eternal Journey Today</Link>
                </Button>
              </div>
            </TabsContent>

            {/* For Social Activists Tab */}
            <TabsContent value="for-activists" className="p-6 bg-white rounded-lg shadow-sm border mt-4">
              <h2 className="text-2xl font-playfair font-semibold mb-6 text-purple-800">For Social Activists: Launch Your Campaign</h2>
              
              <div className="mb-8">
                <p className="mb-4">
                  Our platform empowers social activists to create meaningful change through structured campaigns and transparent operations.
                </p>

                <h3 className="font-medium text-lg mb-3">How to Join as a Social Activist</h3>
                <ol className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">1</div>
                    <div>
                      <strong className="text-purple-800">Register and Verify</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Apply with your organization details, past work, and credentials. Our team will verify your background and social impact history.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">2</div>
                    <div>
                      <strong className="text-purple-800">Create a Campaign</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Design your campaign with clear objectives, beneficiary details, budget breakdown, and expected outcomes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">3</div>
                    <div>
                      <strong className="text-purple-800">Link to Products</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Work with our team to associate your campaign with specific products in our catalog, creating a direct funding channel.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-purple-800 font-medium">4</div>
                    <div>
                      <strong className="text-purple-800">Implement & Report</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Receive funds as products sell, implement your campaign, and provide regular updates with photos, stories, and financial reports.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h3 className="font-medium text-lg mb-3">Activist Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Proven track record of social work or advocacy</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Detailed campaign plan with clear objectives and metrics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Commitment to transparent reporting and beneficiary documentation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Alignment with our mission of creating eternal impact</span>
                  </li>
                </ul>
              </div>

              <Separator className="my-8" />

              <div className="text-center">
                <h3 className="font-medium text-lg mb-4">Ready to Make a Difference?</h3>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Apply as a Social Activist
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  Our team will review your application within 5-7 business days
                </p>
              </div>
            </TabsContent>

            {/* Verification Process Tab */}
            <TabsContent value="verification" className="p-6 bg-white rounded-lg shadow-sm border mt-4">
              <h2 className="text-2xl font-playfair font-semibold mb-6 text-purple-800">Our Verification Process</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-lg mb-4">How We Ensure Transparency</h3>
                  <p className="mb-4">
                    Transparency is at the core of our operations. We implement a rigorous verification process to ensure that every donation reaches its intended beneficiaries.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Activist Verification</h4>
                      <p className="text-sm">
                        All social activists undergo background checks, reference verification, and must provide documentation of their past social work before being approved.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Campaign Auditing</h4>
                      <p className="text-sm">
                        Each campaign proposal is reviewed by our team to ensure realistic goals, proper budget allocation, and alignment with our mission.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Beneficiary Documentation</h4>
                      <p className="text-sm">
                        We require detailed information about all beneficiaries, including their names, situations, and the specific support they receive.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Financial Tracking</h4>
                      <p className="text-sm">
                        All funds are tracked from product purchase to final deployment, with regular financial reports available to donors.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">The Guarantee Receipt</h3>
                  <div className="border p-5 rounded-lg bg-white mb-6">
                    <div className="border-b pb-3 mb-3">
                      <h4 className="font-playfair text-xl text-purple-800 text-center">Eternal Impact Guarantee</h4>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-600">Receipt No:</span>
                        <span className="col-span-2 font-medium">EIG-2025-0042</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-600">Purchaser:</span>
                        <span className="col-span-2 font-medium">Sarah Johnson</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-600">Product:</span>
                        <span className="col-span-2 font-medium">Handcrafted Prayer Beads</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-600">Campaign:</span>
                        <span className="col-span-2 font-medium">Village Education Initiative</span>
                      </div>
                    </div>
                    <div className="border-t pt-3 mb-3">
                      <h5 className="font-medium text-sm mb-2">Beneficiaries:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Aarav Patel - School supplies and books</li>
                        <li>• Maya Sharma - School uniform and shoes</li>
                        <li>• Rahul Singh - Educational scholarship</li>
                        <li>• Village School - Learning materials</li>
                      </ul>
                    </div>
                    <div className="text-xs text-center text-gray-500 mt-4">
                      Verify this receipt at <span className="text-purple-600">verify.eternalpromise.org</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">How to Verify Your Impact</h4>
                    <p className="text-sm mb-3">
                      Each Guarantee Receipt contains a unique verification code that can be used to:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>View detailed information about the beneficiaries</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Access photos and videos of the campaign implementation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Track the progress of ongoing initiatives</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                        <span>Connect with social activists for direct updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-100 p-6 rounded-lg text-center">
                <h3 className="font-medium text-lg mb-3">Verify a Guarantee Receipt</h3>
                <div className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter receipt number" 
                      className="flex-1 px-4 py-2 border rounded-md"
                    />
                    <Button>Verify</Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Example format: EIG-2025-0042
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Roadmap Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-playfair font-semibold mb-6 text-purple-800 text-center">Our Roadmap</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 z-0"></div>
              
              {/* Timeline items */}
              <div className="relative z-10">
                {/* Phase 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="md:text-right">
                    <div className="flex md:justify-end">
                      <div className="inline-block md:ml-auto bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 flex items-center">
                        <Route className="h-4 w-4 mr-2" /> Phase 1: Launch
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Platform Establishment</h3>
                    <p className="text-gray-600">
                      Building our core marketplace connecting donors with carefully vetted social activists, offering initial product selection and impact tracking.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 md:-left-4 top-0 w-8 h-8 bg-purple-600 rounded-full transform -translate-x-1/2 flex items-center justify-center text-white font-medium">1</div>
                    <div className="pl-6 md:pl-8">
                      <h4 className="font-medium mb-2">Key Milestones</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Core e-commerce platform development</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Onboarding of initial social activists</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>First product catalog curation</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Implementation of payment processing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Phase 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="md:order-2 md:text-left">
                    <div className="flex md:justify-start">
                      <div className="inline-block md:mr-auto bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 flex items-center">
                        <Route className="h-4 w-4 mr-2" /> Phase 2: Growth
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Expanding Our Reach</h3>
                    <p className="text-gray-600">
                      Scaling operations to include more diverse product offerings, additional social causes, and enhanced verification systems.
                    </p>
                  </div>
                  <div className="relative md:order-1">
                    <div className="absolute right-0 md:-right-4 top-0 w-8 h-8 bg-purple-500 rounded-full transform translate-x-1/2 flex items-center justify-center text-white font-medium">2</div>
                    <div className="pr-6 md:pr-8 md:text-right">
                      <h4 className="font-medium mb-2">Key Milestones</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start md:justify-end">
                          <span>Mobile app development</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>Expanded product categories</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>Advanced impact tracking dashboard</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>Blockchain-based verification system</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Phase 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="md:text-right">
                    <div className="flex md:justify-end">
                      <div className="inline-block md:ml-auto bg-purple-400 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 flex items-center">
                        <Route className="h-4 w-4 mr-2" /> Phase 3: Expansion
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Global Impact Network</h3>
                    <p className="text-gray-600">
                      Creating a global ecosystem with international shipping, multilingual support, and cross-border activist collaboration.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 md:-left-4 top-0 w-8 h-8 bg-purple-400 rounded-full transform -translate-x-1/2 flex items-center justify-center text-white font-medium">3</div>
                    <div className="pl-6 md:pl-8">
                      <h4 className="font-medium mb-2">Key Milestones</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>International expansion</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Multi-language support</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Cross-border activist networking</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>Virtual reality impact experiences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Phase 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:order-2 md:text-left">
                    <div className="flex md:justify-start">
                      <div className="inline-block md:mr-auto bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-3 flex items-center">
                        <Route className="h-4 w-4 mr-2" /> Phase 4: Innovation
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Future Vision</h3>
                    <p className="text-gray-600">
                      Pioneering new approaches to eternal impact, including digital legacy solutions and immersive impact experiences.
                    </p>
                  </div>
                  <div className="relative md:order-1">
                    <div className="absolute right-0 md:-right-4 top-0 w-8 h-8 bg-purple-300 rounded-full transform translate-x-1/2 flex items-center justify-center text-purple-800 font-medium">4</div>
                    <div className="pr-6 md:pr-8 md:text-right">
                      <h4 className="font-medium mb-2">Key Milestones</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start md:justify-end">
                          <span>Digital legacy solutions</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>AI-powered cause matching</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>Decentralized governance</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                        <li className="flex items-start md:justify-end">
                          <span>Metaverse impact showcases</span>
                          <Check className="h-4 w-4 text-green-600 ml-2 mt-0.5 md:mr-0" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-purple-50">
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

export default MissionAndModel;

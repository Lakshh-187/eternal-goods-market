
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, MessageSquare } from 'lucide-react';

const Feedback = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Received",
      description: "Thank you for sharing your thoughts with us!",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white overflow-hidden min-h-[70vh]">
        <div className="container-custom relative z-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
            {/* Left Content */}
            <div className="space-y-6 lg:pr-8">
              <div className="inline-block">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  YOUR VOICE MATTERS
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight">
                Share Your
                <span className="text-gold-400 block">Experience</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                Your feedback helps us improve and continue our mission of creating eternal impact. 
                Every voice contributes to building better platforms and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold px-8">
                  Share Feedback
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8" asChild>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    Message Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop" 
                  alt="Customer sharing feedback"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feedback Form */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-playfair font-semibold mb-4">Send Us Your Thoughts</h2>
              <p className="text-gray-600 mb-6">
                We value your feedback! Let us know about your experience with our products, 
                our mission, or share any suggestions you have for improvement.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Subject of your message" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Share your feedback, experience, or suggestions..." 
                    rows={6} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Send Feedback
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-playfair font-semibold mb-4">Other Ways to Connect</h2>
              
              <div className="space-y-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">WhatsApp Support</h3>
                      <p className="text-gray-600 mb-4">
                        Connect with us directly on WhatsApp for immediate assistance or to share your thoughts.
                      </p>
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Message Us
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                        <Star className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Product Review</h3>
                      <p className="text-gray-600 mb-4">
                        Share your experience with a specific product and help others make informed decisions.
                      </p>
                      <Button className="bg-gold-500 hover:bg-gold-600 text-purple-900" asChild>
                        <a href="/products">Write a Review</a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                        <Heart className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Share Your Impact Story</h3>
                      <p className="text-gray-600 mb-4">
                        Tell us how our products have helped you create meaningful impact in your life and community.
                      </p>
                      <Button variant="outline" className="border-purple-600 text-purple-600" asChild>
                        <a href="https://forms.google.com/eternal-impact" target="_blank" rel="noopener noreferrer">
                          Share Your Story
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-playfair font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How can I track the impact of my purchase?</h3>
                <p className="text-gray-600">
                  Each product page details the specific impact your purchase will make. Additionally, we send impact updates via email to all customers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">What percentage of my purchase goes to the cause?</h3>
                <p className="text-gray-600">
                  At least 50% of profits from each sale goes directly to our impact initiatives. The remainder supports fair wages for artisans and sustainable business operations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How can I get involved beyond making a purchase?</h3>
                <p className="text-gray-600">
                  We welcome volunteers, partnerships, and ambassadors! Contact us through this form or via email at volunteer@eternalgoods.com to learn more.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">What does "guaranteed beyond death" mean?</h3>
                <p className="text-gray-600">
                  It means the impact of your purchase creates lasting positive change that continues beyond your lifetime. The education, nutrition, and clothing you help provide creates generational change and eternal blessings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;

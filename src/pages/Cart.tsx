import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    // This would integrate with a payment processor in a real implementation
    toast({
      title: "Checkout initiated",
      description: "This would connect to a payment gateway in a production environment",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white overflow-hidden min-h-[50vh]">
          <div className="container-custom relative z-10 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[40vh]">
              {/* Left Content */}
              <div className="space-y-6 lg:pr-8">
                <div className="inline-block">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    SHOPPING CART
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight">
                  Your Cart is
                  <span className="text-gold-400 block">Empty</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                  Looks like you haven't added any products to your cart yet. 
                  Start shopping to create eternal impact with every purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-purple-900 font-semibold px-8" asChild>
                    <Link to="/products">
                      Start Shopping
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8" asChild>
                    <Link to="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative order-first lg:order-last">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop" 
                    alt="Empty shopping cart"
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white overflow-hidden">
        <div className="container-custom relative z-10 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                SHOPPING CART
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Your <span className="text-gold-400">Cart</span>
            </h1>
            <p className="text-xl text-gray-200">
              Review your items and proceed to checkout to create eternal impact.
            </p>
          </div>
        </div>
      </section>
      
      {/* Cart Content */}
      <div className="container-custom py-12">
        <h1 className="section-title mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              <Separator className="mb-6" />
              
              {items.map((item) => (
                <div key={item.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/products/${item.id}`} className="hover:text-purple-600">
                            {item.name}
                          </Link>
                        </h3>
                        <button
                          className="text-sm text-red-500 flex items-center mt-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center md:text-center">
                      <div className="md:hidden inline-block mr-2 font-medium">Price:</div>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center md:justify-center">
                      <div className="md:hidden inline-block mr-2 font-medium">Quantity:</div>
                      <div className="flex items-center border rounded">
                        <button 
                          className="px-2 py-1 border-r"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >-</button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 border-l"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-right md:text-center font-medium">
                      <div className="md:hidden inline-block mr-2">Total:</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <Separator className="mt-6" />
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="font-playfair text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-xl text-purple-800">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

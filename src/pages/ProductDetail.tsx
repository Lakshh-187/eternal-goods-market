
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share2, ShoppingCart, Star, Check, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import productsData from '@/data/products';
import { useCart } from '@/hooks/useCart';
import ProductGrid from '@/components/product/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = productsData.find(p => p.id === id);
  const relatedProducts = productsData
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(error => console.log('Error sharing', error));
    } else {
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="container-custom py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" className="flex items-center" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[currentImageIndex]}
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square w-20 border rounded ${
                  index === currentImageIndex ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Badge className="bg-purple-500 mb-3">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-1 mb-2">
            <Star className="h-5 w-5 fill-current text-yellow-400" />
            <Star className="h-5 w-5 fill-current text-yellow-400" />
            <Star className="h-5 w-5 fill-current text-yellow-400" />
            <Star className="h-5 w-5 fill-current text-yellow-400" />
            <Star className="h-5 w-5 fill-current text-yellow-400" />
            <span className="text-sm text-gray-600 ml-2">(25 reviews)</span>
          </div>
          <div className="text-2xl font-bold text-purple-800 mb-4">
            ${product.price.toFixed(2)}
          </div>
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-purple-800 mb-2">Eternal Impact</h3>
            <p className="text-sm">{product.impact}</p>
          </div>

          {product.inStock ? (
            <div className="flex items-center mb-6">
              <div className="flex items-center text-green-600 mr-2">
                <Check className="h-5 w-5 mr-1" />
                <span className="font-medium">In Stock</span>
              </div>
              <span className="text-sm text-gray-600">Ready to ship in 1-2 business days</span>
            </div>
          ) : (
            <div className="text-red-500 mb-6 font-medium">Currently Out of Stock</div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded">
              <button 
                className="px-3 py-2 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
              >-</button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                className="px-3 py-2 border-l"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >+</button>
            </div>
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-8">
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>

          {/* WhatsApp Inquiry */}
          <div className="mb-8">
            <a 
              href={`https://wa.me/1234567890?text=I'm%20interested%20in%20purchasing%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ask About This Product
            </a>
          </div>

          <Separator className="my-6" />

          {/* Product Details Tabs */}
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start border-b mb-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="impact">Social Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-4">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="impact" className="p-4">
              <h3 className="font-medium mb-3">How Your Purchase Helps:</h3>
              <ul className="space-y-2">
                {product.socialGood.map((impact, index) => (
                  <li key={index} className="flex items-start">
                    <Heart className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="section-title mb-8">You Might Also Like</h2>
        <ProductGrid products={relatedProducts} columns={4} />
      </div>
    </div>
  );
};

export default ProductDetail;

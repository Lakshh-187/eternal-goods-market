
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showCategory = true }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };

  return (
    <Card className="overflow-hidden hover-scale h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="relative block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        {!product.inStock && (
          <div className="absolute top-0 right-0 m-2">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
        {showCategory && (
          <div className="absolute top-0 left-0 m-2">
            <Badge className="bg-purple-500">{product.category}</Badge>
          </div>
        )}
        <div className="absolute bottom-0 right-0 m-2">
          <Badge className="bg-green-600 flex items-center">
            <Gift className="h-3 w-3 mr-1" /> Eternal Impact
          </Badge>
        </div>
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <Link to={`/products/${product.id}`} className="hover:text-purple-600 transition-colors">
          <h3 className="font-playfair font-medium text-lg mb-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.shortDescription}</p>
        <p className="font-semibold text-lg text-purple-800">${product.price.toFixed(2)}</p>
        <div className="mt-2">
          <p className="text-xs text-green-600 font-medium">
            <span className="text-green-600">♥</span> {product.impact}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

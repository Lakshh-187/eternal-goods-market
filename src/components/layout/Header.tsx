
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-playfair text-purple-800">
              <span className="gradient-text">Eternal</span> Goods
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Our Mission
            </Link>
            <Link to="/impact" className="font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Impact
            </Link>
            <Link to="/feedback" className="font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Feedback
            </Link>
          </nav>

          {/* Cart and Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-80 max-w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-playfair font-semibold">Menu</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium py-2 text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="font-medium py-2 text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/about" className="font-medium py-2 text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Our Mission
              </Link>
              <Link to="/impact" className="font-medium py-2 text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Impact
              </Link>
              <Link to="/feedback" className="font-medium py-2 text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Feedback
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

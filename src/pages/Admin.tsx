
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, Search, Upload, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '@/data/products';

// Note: This is a simplified admin panel. In a real application, 
// this would connect to a backend with proper authentication.

const Admin = () => {
  // Authentication would normally be required here
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  
  // Filtered products based on search
  const filteredProducts = productsData.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      || product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock campaigns data for demonstration
  const campaigns = [
    { id: '1', name: 'Village Education Initiative', status: 'active', activists: 'Maya Foundation', beneficiaries: 42, funds: 12500 },
    { id: '2', name: 'Clean Water Project', status: 'pending', activists: 'Blue Planet', beneficiaries: 120, funds: 8700 },
    { id: '3', name: 'Women Empowerment Workshop', status: 'active', activists: 'Rise Together', beneficiaries: 35, funds: 6300 },
    { id: '4', name: 'Healthcare for Children', status: 'completed', activists: 'Health Hands', beneficiaries: 87, funds: 15200 },
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-4" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Site
            </Link>
          </Button>
          <h1 className="text-2xl font-playfair font-semibold">Admin Dashboard</h1>
        </div>
        <div>
          {/* This would normally be a logout button with proper auth */}
          <Button variant="outline" asChild>
            <Link to="/">Exit Admin Mode</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
          <TabsTrigger value="products">Products Management</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        
        {/* Products Management Tab */}
        <TabsContent value="products" className="space-y-6">
          {showAddProduct ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Add New Product</h2>
                <Button variant="ghost" onClick={() => setShowAddProduct(false)}>Cancel</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="productCategory">Category</Label>
                    <Input id="productCategory" placeholder="Enter category" />
                  </div>
                  <div>
                    <Label htmlFor="productPrice">Price ($)</Label>
                    <Input id="productPrice" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="productStock">In Stock</Label>
                    <Input id="productStock" type="number" placeholder="0" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="inStock" className="rounded border-gray-300" />
                    <Label htmlFor="inStock">Product is in stock</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input id="shortDescription" placeholder="Brief product description" />
                  </div>
                  <div>
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <textarea 
                      id="fullDescription" 
                      rows={3} 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Detailed product description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="impact">Social Impact</Label>
                    <textarea 
                      id="impact" 
                      rows={2} 
                      className="w-full p-2 border rounded-md" 
                      placeholder="How this product creates impact"
                    />
                  </div>
                  <div>
                    <Label>Product Images</Label>
                    <div className="mt-2 border-2 border-dashed rounded-md p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Drag images here or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Label>Link to Campaign</Label>
                <select className="w-full p-2 border rounded-md mt-1">
                  <option value="">Select a campaign</option>
                  {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Save Product
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt={product.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {product.inStock ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                In Stock
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Out of Stock
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            Village Education
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredProducts.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No products found matching your search.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </TabsContent>
        
        {/* Campaign Management Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          {showAddCampaign ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Add New Campaign</h2>
                <Button variant="ghost" onClick={() => setShowAddCampaign(false)}>Cancel</Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input id="campaignName" placeholder="Enter campaign name" />
                </div>
                
                <div>
                  <Label htmlFor="campaignDescription">Description</Label>
                  <textarea 
                    id="campaignDescription" 
                    rows={3} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Describe the campaign and its goals"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="socialActivist">Social Activist/Organization</Label>
                    <Input id="socialActivist" placeholder="Organization name" />
                  </div>
                  <div>
                    <Label htmlFor="targetAmount">Target Amount ($)</Label>
                    <Input id="targetAmount" type="number" placeholder="0.00" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="beneficiaries">Beneficiaries</Label>
                  <textarea 
                    id="beneficiaries" 
                    rows={3} 
                    className="w-full p-2 border rounded-md" 
                    placeholder="List the beneficiaries of this campaign"
                  />
                </div>
                
                <div>
                  <Label>Campaign Images</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Drag images here or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Create Campaign
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setShowAddCampaign(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Campaign
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activist</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funds Raised</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                            campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.activists}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.beneficiaries}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${campaign.funds.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {campaign.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-900">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </TabsContent>
        
        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <h3 className="text-lg font-medium mb-4">User Management</h3>
            <p className="text-gray-500 mb-4">
              This section would typically contain user management features, including:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Donor account management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Social activist verification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Admin privileges management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>User activity tracking</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500">
              In a full implementation, this would connect to a backend user management system.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

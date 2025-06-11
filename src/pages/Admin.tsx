
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Search, Upload, Edit, Trash2, CheckCircle2, Users, Package, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '@/data/products';

const Admin = () => {
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

  // Mock statistics
  const stats = [
    { title: 'Total Products', value: productsData.length, icon: Package, color: 'bg-blue-500' },
    { title: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: Target, color: 'bg-green-500' },
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-purple-500' },
    { title: 'Funds Raised', value: '$42,700', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your platform efficiently</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Exit Admin Mode</Link>
          </Button>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="products">Products Management</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          {/* Products Management Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your product catalog</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button onClick={() => setShowAddProduct(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddProduct ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Add New Product</h3>
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
                          <Label htmlFor="shortDescription">Short Description</Label>
                          <Input id="shortDescription" placeholder="Brief product description" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullDescription">Full Description</Label>
                          <textarea 
                            id="fullDescription" 
                            rows={3} 
                            className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                            placeholder="Detailed product description"
                          />
                        </div>
                        <div>
                          <Label htmlFor="impact">Social Impact</Label>
                          <textarea 
                            id="impact" 
                            rows={3} 
                            className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                            placeholder="How this product creates impact"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium text-gray-900 mb-2">Upload Product Images</p>
                        <p className="text-sm text-gray-500 mb-4">Drag images here or click to browse</p>
                        <Button variant="outline">Select Files</Button>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-end pt-4">
                      <Button className="bg-purple-600 hover:bg-purple-700">Save Product</Button>
                    </div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img className="h-12 w-12 rounded-lg object-cover" src={product.images[0]} alt={product.name} />
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">ID: {product.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {product.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {product.inStock ? (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                In Stock
                              </span>
                            ) : (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Out of Stock
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">Village Education</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Campaign Management Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Campaigns</CardTitle>
                    <CardDescription>Manage social impact campaigns</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search campaigns..." className="pl-10" />
                    </div>
                    <Button onClick={() => setShowAddCampaign(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Campaign
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddCampaign ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Create New Campaign</h3>
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
                          rows={4} 
                          className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
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
                      
                      <Card className="border-dashed">
                        <CardContent className="p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-900 mb-2">Upload Campaign Images</p>
                          <p className="text-sm text-gray-500 mb-4">Add visual content for your campaign</p>
                          <Button variant="outline">Select Files</Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button className="bg-purple-600 hover:bg-purple-700">Create Campaign</Button>
                    </div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Activist</TableHead>
                        <TableHead>Beneficiaries</TableHead>
                        <TableHead>Funds Raised</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{campaign.name}</p>
                              <p className="text-sm text-gray-500">ID: {campaign.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                              campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-900">{campaign.activists}</TableCell>
                          <TableCell className="text-gray-900">{campaign.beneficiaries}</TableCell>
                          <TableCell className="font-medium">${campaign.funds.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {campaign.status === 'pending' && (
                                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-900">
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Management System</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    This section would contain comprehensive user management features including donor accounts, 
                    social activist verification, admin privileges, and activity tracking.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Donor account management</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Social activist verification</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Admin privileges management</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-sm">User activity tracking</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

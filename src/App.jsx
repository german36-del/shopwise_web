import React, { useState } from 'react'
import { Upload, List, ShoppingCart, Store, ImageIcon, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

export default function Component() {
  const [shoppingList, setShoppingList] = useState('')
  const [selectedStores, setSelectedStores] = useState([])
  const [results, setResults] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result
        setShoppingList(content)
      }
      reader.readAsText(file)
    }
  }

  const toggleStore = (store) => {
    setSelectedStores(prev => 
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Simulating API call to backend for web scraping
    setResults({
      supermarket: selectedStores[0] || 'Best Supermarket',
      price: 99.99,
      images: ['/placeholder.svg?height=100&width=100', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=100&width=100']
    })
  }

  const handleImageSearch = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulating API call to backend for image-based product search
      setSimilarProducts([
        { name: 'Similar Product 1', price: 19.99, image: '/placeholder.svg?height=100&width=100' },
        { name: 'Similar Product 2', price: 24.99, image: '/placeholder.svg?height=100&width=100' },
        { name: 'Similar Product 3', price: 29.99, image: '/placeholder.svg?height=100&width=100' },
      ])
    }
  }

  const stores = ['Walmart', 'Target', 'Costco', 'Kroger']

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Supermarket Product Scraper</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Shopping List</TabsTrigger>
              <TabsTrigger value="image">Image Search</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Shopping List (.txt)
                  </label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="shopping-list" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Or Enter Shopping List Manually
                  </label>
                  <Textarea
                    id="shopping-list"
                    value={shoppingList}
                    onChange={(e) => setShoppingList(e.target.value)}
                    placeholder="Enter your shopping list here..."
                    rows={5}
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Supermarkets</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stores.map((store) => (
                      <Button
                        key={store}
                        type="button"
                        variant={selectedStores.includes(store) ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => toggleStore(store)}
                      >
                        <Store className="h-4 w-4" />
                        {store}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Find Best Deals
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="image">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Product Image
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSearch}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Search className="mr-2 h-4 w-4" /> Find Similar Products
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {results && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <h3 className="font-semibold mb-2 text-lg text-primary">Best Deal Found:</h3>
              <p className="mb-2">Supermarket: <span className="font-bold text-primary">{results.supermarket}</span></p>
              <p className="mb-4">Total Price: <span className="font-bold text-primary">${results.price.toFixed(2)}</span></p>
              <div className="flex flex-wrap gap-4">
                {results.images.map((img, index) => (
                  <Image key={index} src={img} alt={`Product ${index + 1}`} width={100} height={100} className="rounded-md" />
                ))}
              </div>
            </div>
          )}
          
          {similarProducts.length > 0 && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <h3 className="font-semibold mb-4 text-lg text-primary">Similar Products:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProducts.map((product, index) => (
                  <div key={index} className="flex flex-col items-center p-2 border rounded-md">
                    <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-md mb-2" />
                    <p className="font-medium text-center">{product.name}</p>
                    <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
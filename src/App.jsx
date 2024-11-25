import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui";
import alcampoIcon from './assets/supermarket-icons/alcampo.png';
import aldiIcon from './assets/supermarket-icons/aldi.png';
import eroskiIcon from './assets/supermarket-icons/eroski.png';
import mercadonaIcon from './assets/supermarket-icons/mercadona.png';
import './styles/global.css';  
// Custom Image component for Vite compatibility
function Image({ src, alt, width, height, ...props }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      loading="lazy" 
      {...props} 
    />
  );
}

export default function Component() {
  const [shoppingList, setShoppingList] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [results, setResults] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setShoppingList(content);
      };
      reader.readAsText(file);
    }
  };

  const toggleStore = (store) => {
    setSelectedStores(prev =>
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults({
      supermarket: selectedStores[0] || 'Best Supermarket',
      price: 99.99,
      images: ['/placeholder.svg?height=100&width=100', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=100&width=100']
    });
  };

  const handleImageSearch = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSimilarProducts([ 
        { name: 'Similar Product 1', price: 19.99, image: '/placeholder.svg?height=100&width=100' },
        { name: 'Similar Product 2', price: 24.99, image: '/placeholder.svg?height=100&width=100' },
        { name: 'Similar Product 3', price: 29.99, image: '/placeholder.svg?height=100&width=100' },
      ]);
    }
  };

  const stores = [
    { name: 'Alcampo', icon: alcampoIcon },
    { name: 'Aldi', icon: aldiIcon },
    { name: 'Eroski', icon: eroskiIcon },
    { name: 'Mercadona', icon: mercadonaIcon },
  ];

  return (
    <div className="container">
      <Card className="card">
        <CardHeader>
          <CardTitle className="card-title">Supermarket Product Scraper</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList className="tabs-list">
              <TabsTrigger value="list">Shopping List</TabsTrigger>
              <TabsTrigger value="image">Image Search</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <form onSubmit={handleSubmit} className="form-container">
                <div>
                  <label htmlFor="file-upload" className="input-label">Upload Shopping List (.txt)</label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="file-upload-button"
                  />
                </div>
                <div>
                  <label htmlFor="shopping-list" className="input-label">Or Enter Shopping List Manually</label>
                  <Textarea
                    id="shopping-list"
                    value={shoppingList}
                    onChange={(e) => setShoppingList(e.target.value)}
                    placeholder="Enter your shopping list here..."
                    rows={5}
                    className="textarea"
                  />
                </div>
                <div>
                  <label className="input-label">Select Supermarkets</label>
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {stores.map((store) => (
                      <Button
                        key={store.name}
                        type="button"
                        variant={selectedStores.includes(store.name) ? "default" : "outline"}
                        className={`store-button ${selectedStores.includes(store.name) ? 'active' : ''}`}
                        onClick={() => toggleStore(store.name)}
                      >
                        <Image 
                          src={store.icon} 
                          alt={`${store.name} icon`} 
                          className="store-icon"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="submit-button">
                  <ShoppingCart className="mr-2" /> Find Best Deals
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="image">
              <div className="form-container">
                <div>
                  <label htmlFor="image-upload" className="input-label">Upload Product Image</label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSearch}
                    className="file-upload-button"
                  />
                </div>
                <Button className="submit-button" onClick={handleImageSearch}>
                  <Search className="mr-2" /> Find Similar Products
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results */}
          {results && (
            <div className="results-container">
              <h3>Best Match: {results.supermarket}</h3>
              <p>Price: {results.price} EUR</p>
              <div className="flex gap-4">
                {results.images.map((img, idx) => (
                  <Image key={idx} src={img} alt={`product-${idx}`} width={100} height={100} />
                ))}
              </div>
            </div>
          )}

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="similar-products-container">
              <h3>Similar Products</h3>
              <div className="grid grid-cols-3 gap-4">
                {similarProducts.map((product, idx) => (
                  <div key={idx} className="product-card">
                    <Image className="product-image" src={product.image} alt={product.name} width={100} height={100} />
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price} EUR</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

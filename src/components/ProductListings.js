import ProductCard from "../components/ProductCard";

// it is simply a function named ProductListings
// accepts a property 'products' attribute
// in js, { } means object
// and if we place a word inside, what we mean is that this is an object with a key/value named products
// products is actually where the data is
function ProductListings({ products }) {
  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default ProductListings;

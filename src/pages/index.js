import ProductListings from "@/components/ProductListings";
import { getAllProductsInCollection } from "@/lib/shopify";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <ProductListings products={products} />
    </div>
  );
}
// cool :-)
export async function getStaticProps() {
  const products = await getAllProductsInCollection();

  return {
    props: {
      products,
    },
  };
}

export default IndexPage;

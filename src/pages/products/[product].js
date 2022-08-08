import { getProductSlugs, getProduct } from "@/lib/shopify";

function ProductPage({ productData }) {
  return <div></div>;
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs();

  const paths = productSlugs.map((slug) => {
    const product = String(slug.node.handle);
    return {
      params: { product },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.product);

  return {
    props: {
      productData,
    },
  };
}

export default ProductPage;

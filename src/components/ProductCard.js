import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  const { title, description, _id, picture } = product;
  // this is a concept in web development commonly referred to as "slugify" a string to become a URL slug
  const handle = title.replace(/\s+/g, "-").toLowerCase();

  // products/1 - page which will show the product "1" details
  // products/2 - page which will show the product "1" details
  return (
    <Link href={`/products/${handle}`} passHref>
      <a className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
        <div className="h-48 relative">
          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
            {title}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            {description}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;

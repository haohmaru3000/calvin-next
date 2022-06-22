import { useRouter } from "next/router";

const ProductDetails = () => {
  const router = useRouter();
  const { handle } = router.query;

  if (!handle) return null;
  console.log(handle);

  let title = handle.split("-"); // split into array
  console.log(title);
  let title2 = title
    .map((word) => {
      const newWord = word[0].toUpperCase() + word.slice(1, word.length);
      console.log(newWord);
      return newWord;
    })
    .join(" ");

  console.log("title2", title2);

  return <div>{title2}</div>;
};

export default ProductDetails;

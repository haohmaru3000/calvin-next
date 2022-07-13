import { createContext, useContext, useState, useEffect } from "react";
import { setLocalData } from "@/utils/helpers";

const CartContext = createContext();
const AddToCartContext = createContext();
const UpdateCartQuantityContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function useAddToCardContext() {
  return useContext(AddToCartContext);
}

export function useUpdateCartQuantityContext() {
  return useContext(UpdateCartQuantityContext);
}

// we can think of "children" as all the React components
// that this CartProvider will wrap around
// <CartProvider value={}>
//       <ProductListing /> (it can be many nested components or just a bunch of components)
// </CartProvider>
export function CartProvider({ children }) {
  // in this case, the variable that we are keeping track of is
  // "cart"
  // in-memory variable initialization
  const [cart, setCart] = useState([]);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [isLoading, setisloading] = useState(false);

  useEffect(() => {
    // in-browser local storage initialization
    setLocalData(setCart, setCheckoutId, setCheckoutUrl);
  }, []);

  useEffect(() => {
    // do this to make sure multiple tabs are always in sync
    const onReceiveMessage = (e) => {
      console.log(e);
      setLocalData(setCart, setCheckoutId, setCheckoutUrl);
    };

    // this is basically setting an event listener to local storage
    window.addEventListener("storage", onReceiveMessage);
    return () => {
      // and this is removing the event after an update has happened
      // for performance reasons
      window.removeEventListener("storage", onReceiveMessage);
    };
  }, []);

  async function addToCart(newItem) {
    // here is where the detailed logic is implemented when someone clicks on "add" button
    setisloading(true);
    // a whole bunch of memory, local storage AND remote API call is going to happen

    // and when all these IO operations are done
    setisloading(false);
  }

  async function updateCartItemQuantity(id, quantity) {
    // here is where the detailed logic is implemented when someone updates the quantity of a particular purchase
  }

  return (
    <CartContext.Provider value={[cart, checkoutUrl, isLoading]}>
      <AddToCartContext.Provider value={addToCart}>
        <UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
          {children}
        </UpdateCartQuantityContext.Provider>
      </AddToCartContext.Provider>
    </CartContext.Provider>
  );
}

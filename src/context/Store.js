import { createContext, useContext, useState, useEffect } from "react";
import {
  createShopifyCheckout,
  updateShopifyCheckout,
  setLocalData,
  saveLocalData,
} from "@/utils/helpers";

const CartContext = createContext();
const AddToCartContext = createContext();
const UpdateCartQuantityContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function useAddToCartContext() {
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    // a whole bunch of memory, local storage AND remote API call is going to happen
    // empty cart
    if (cart.length === 0) {
      setCart([...cart, newItem]);

      const response = await createShopifyCheckout(newItem);
      setCheckoutId(response.id);
      setCheckoutUrl(response.webUrl);
      saveLocalData(newItem, response.id, response.webUrl);
    } else {
      let newCart = [...cart];
      let itemAdded = false;
      // loop through all cart items to check if variant
      // already exists and update quantity
      newCart.map((item) => {
        if (item.variantId === newItem.variantId) {
          item.variantQuantity += newItem.variantQuantity;
          itemAdded = true;
        }
      });

      let newCartWithItem = [...newCart];
      if (itemAdded) {
      } else {
        // if its a new item than add it to the end
        newCartWithItem = [...newCart, newItem];
      }

      setCart(newCartWithItem);
      await updateShopifyCheckout(newCartWithItem, checkoutId);
      saveLocalData(newCartWithItem, checkoutId, checkoutUrl);
    }
    // and when all these IO operations are done
    setIsLoading(false);
  }

  async function updateCartItemQuantity(id, quantity) {
    // here is where the detailed logic is implemented when someone updates the quantity of a particular purchase
    setIsLoading(true);
    let newQuantity = Math.floor(quantity);
    if (quantity === "") {
      newQuantity = "";
    }
    let newCart = [...cart];
    newCart.forEach((item) => {
      if (item.variantId === id) {
        item.variantQuantity = newQuantity;
      }
    });

    // take out zeroes items
    newCart = newCart.filter((i) => i.variantQuantity !== 0);
    setCart(newCart);

    await updateShopifyCheckout(newCart, checkoutId);
    saveLocalData(newCart, checkoutId, checkoutUrl);
    setIsLoading(false);
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

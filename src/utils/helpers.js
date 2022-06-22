function getLocalData() {
  return JSON.parse(
    localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME)
  );
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData();

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]]);
    } else {
      setCart([localData[0]]);
    }
    setCheckoutId(localData[1]);
    setCheckoutUrl(localData[2]);
  }
}

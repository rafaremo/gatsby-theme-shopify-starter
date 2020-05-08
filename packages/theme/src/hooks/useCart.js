import React, {useEffect, useState, useCallback, useContext} from 'react';

const initialCartValues = {
  store: null,
  addVariantToCart: null,
  removeLineItem: null,
  updateLineItem: null
}

export const StoreContext = React.createContext(initialCartValues);

export const ContextProvider = ({ children }) => {
  let initialStoreState = {
    client: null,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
    loading: true
  }

  const [store, updateStore] = useState(initialStoreState);

  const addVariantToCart = useCallback(
    (variantId, quantity) => {
      if (variantId === '' || !quantity) {
        console.error('Both a variant and quantity are required.')
        return
      }
  
      updateStore(prevState => {
        return { ...prevState, adding: true }
      })
  
      const { checkout, client } = store
  
      const checkoutId = checkout.id
      const lineItemsToUpdate = [
        { variantId, quantity: parseInt(quantity, 10) },
      ]
  
      return client.checkout
        .addLineItems(checkoutId, lineItemsToUpdate)
        .then(checkout => {
          updateStore(prevState => {
            return { ...prevState, checkout, adding: false }
          })
        })
    }, [store]
  );

  const removeLineItem = useCallback(
    (client, checkoutID, lineItemID) => {
      return client.checkout
        .removeLineItems(checkoutID, [lineItemID])
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },[]
  );

  const updateLineItem = useCallback(
    (client, checkoutID, lineItemID, quantity) => {
      const lineItemsToUpdate = [
        { id: lineItemID, quantity: parseInt(quantity, 10) },
      ]
  
      return client.checkout
        .updateLineItems(checkoutID, lineItemsToUpdate)
        .then(res => {
          updateStore(prevState => {
            return { ...prevState, checkout: res }
          })
        })
    },[]
  );

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';

    const initializeCheckout = async (isBrowser) => {
      // Check for an existing cart.
      
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        updateStore(prevState => {
          return { ...prevState, checkout, loading: false }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      setCheckoutInState(newCheckout)
    }

    if(isBrowser && !store.client){
      updateStore(prevState => {
        return { ...prevState, client: window.storeClient }
      });
    }

    if(isBrowser && store.client && store.loading){
      initializeCheckout(isBrowser);
    }
  }, [store.client, store.loading])

  return (
    <StoreContext.Provider
      value={{
        store,
        addVariantToCart,
        removeLineItem,
        updateLineItem
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useCart = () => {
  const { store, addVariantToCart, removeLineItem, updateLineItem } = useContext(StoreContext);

  return {
    store,
    addVariantToCart,
    removeLineItem,
    updateLineItem
  }
}
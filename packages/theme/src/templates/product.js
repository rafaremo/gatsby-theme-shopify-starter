import React, { useCallback } from 'react';
import { graphql } from 'gatsby';

import { useCart } from "../hooks/useCart";
import { useEffect } from 'react';

export const query = graphql`
  query ($productId: String!){
    shopifyProduct(shopifyId: {eq: $productId}) {
      descriptionHtml
      description
      title
      tags
      vendor
      productType
      availableForSale
      createdAt(formatString: "MMMM D, YYYY", locale: "es-MX")
      images {
        originalSrc
        id
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants {
        shopifyId
        title
        price
        compareAtPrice
        sku
      }
    }
  }
`

const ProductTemplate = ({ data: { shopifyProduct } }) => {
  const { addVariantToCart, store } = useCart();

  const handleBuy = useCallback(
    () => {
      addVariantToCart(shopifyProduct.variants[0].shopifyId, 1);
      console.log(store.checkout.webUrl)
    },[addVariantToCart, store, shopifyProduct]
  )

  useEffect(
    () => {
      
    }, []
  )

  return (
    <><button onClick={handleBuy}>Comprar</button><pre>{JSON.stringify(shopifyProduct, null, 2)}</pre></>
  )
};

export default ProductTemplate;
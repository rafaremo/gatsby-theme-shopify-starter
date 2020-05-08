## Description

Shopify starter theme to easily connect a Shopify store to your gatsby site and develope a custome store experience. It includes a custome hook to acces helper functions to add, update and remove objects from your shopify checkout.

## How to install

`npm i -S @rafaremo/gatsby-theme-shopify-starter`

or

`yarn add @rafaremo/gatsby-theme-shopify-starter`

After install open your `gatsby-config.js` file and add the theme as follows.

```js
module.exports = {
  plugins: [
    {
      `@rafaremo/gatsby-theme-shopify-starter`,
      options: {
        shopName: "<your-store>.myshopify.com",
        accessToken: "STOREFRONT ACCESS TOKEN",
        basePath: "/",
        productBasePath: "/product", //Product base path
        collectionBasePath: "/collection" //Collection base path
      }
    }
  ],
}
```

Run your development environment

```sh
gatsby develop
```

## Examples of usage

To start building your Gatsby Storefront you just need too [shadow](https://egghead.io/lessons/gatsby-use-component-shadowing-to-override-gatsby-theme-components) theme template pages and make usage of the custom cart hook to update the shopify checkout.

To use the custom hook import the hook from the theme package

```js
import { useCart } from '@rafaremo/gatsby-theme-shopify-starter';
```

Then use the hook to acces the different utility functions to update the shopify checkout

```js
const { store, addVariantToCart, removeLineItem, updateLineItem } = useCart();
```

When you are ready to send your client to the Shopify checkout use the store object from the `useCart` hook to get the checkout URL and redirect your client to that URL.

```js
window.open(store.checkout.webUrl);
```

module.exports = {
  plugins: [
    {
      resolve: `@rafaremo/gatsby-theme-shopify-starter`,
      options: {
        shopName: "cafexico.myshopify.com",
        accessToken: "3f968f207a87c08939594a599a7f21e3",
        basePath: "/",
        productBasePath: "/prodprod",
        collectionBasePath: "/colcol"
      }
    }
  ]
}
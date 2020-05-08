exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';
  const productBasePath = options.productBasePath || '/product';
  const collectionBasePath = options.collectionBasePath || '/collection';

  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/index.js'),
    context: {
      productBasePath,
      collectionBasePath
    }
  });

  const productResult = await graphql(`
    query {
      allShopifyProduct(sort: {fields: title, order: ASC}) {
        nodes {
          shopifyId
          handle
        }
      }
    }
  `);

  const collectionResult = await graphql(`
    query {
      allShopifyCollection(sort: {fields: title, order: ASC}) {
        nodes {
          shopifyId
          handle
        }
      }
    }
  `);

  if(productResult.errors || collectionResult.errors){
    reporter.panic('Error loading shopify', productResult.errors, collectionResult.errors);
    return;
  }

  const products = productResult.data.allShopifyProduct.nodes;
  const collections = collectionResult.data.allShopifyCollection.nodes;

  products.forEach(product => {
    const slug = `${productBasePath}/${product.handle}`;

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/product.js'),
      context: {
        productId: product.shopifyId
      }
    })
  });

  collections.forEach(collection => {
    const slug = `${collectionBasePath}/${collection.handle}`;

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/collection.js'),
      context: {
        collectionId: collection.shopifyId,
        productBasePath,
      }
    })
  });
}
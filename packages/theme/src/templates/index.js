import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const HomePageTemplate = ({ pageContext }) => {

  const data = useStaticQuery(graphql`
    query {
      allShopifyProduct(sort: { fields: title, order: ASC }) {
        nodes {
          shopifyId
          title
          handle
          description
        }
      }
      allShopifyCollection(sort: { fields: title, order: ASC }) {
        nodes {
          shopifyId
          title
          handle
        }
      }
    }
  `);

  const products = data.allShopifyProduct.nodes;
  const collections = data.allShopifyCollection.nodes;

  return (
    <>
      <h1>Store Products</h1>
      <ul>
        {products.map((producto) => (
          <li key={producto.shopifyId}>
            <Link to={`${pageContext.productBasePath}/${producto.handle}`}>
              {producto.title}
            </Link>
            <br />
            {producto.description}
          </li>
        ))}
      </ul>
      <h2>Store Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.shopifyId}>
            <Link to={`${pageContext.collectionBasePath}/${collection.handle}`}>
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePageTemplate;

import React from 'react';
import { graphql, Link } from 'gatsby';

export const query = graphql`
  query ($collectionId: String!){
    shopifyCollection(shopifyId: {eq: $collectionId}) {
      title
      description
      image {
        src
        altText
      }
      products {
        shopifyId
        handle
        title
        images {
          originalSrc
        }
      }
    }
  }
`

const CollectionTemplate = ({ data: { shopifyCollection }, pageContext }) => (
  <>
    <h1>{shopifyCollection.title}</h1>
    <p>{shopifyCollection.description}</p>
    <h3>Products in Collection Original:</h3>
    <ul>
      {shopifyCollection.products.map(producto => (
        <li key={producto.shopifyId}>
          <Link to={`${pageContext.productBasePath}/${producto.handle}`}>{producto.title}</Link>
          <br/>
          {producto.description}
        </li>
      ))}
    </ul>
  </>
);

export default CollectionTemplate;
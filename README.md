I. GraphQL:
  * Info:
  {
    "base_url": "ctkfashion.myshopify.com",
    "api_version": "2021-01",
    "storefront_access_token": "4b44db5fb3b09cd4b76d567023e7bfe4"
  }
  https://{{ _.base_url }}/api/{{ _.api_version }}/graphql.json

  * Session 1:
    (concept 1) query X number of products (which will return X products and related handle)

    (concept 2) when user clicks on a particular product, query the details of that product by product handle
    In shopify, we can associate a product that we created in the admin, with a collection name.

    (concept 3: collections)
    For example, I have store that has a collection called
    "electronics" 
    Maybe, I habe a 2nd collection called "clothes"
    if I want all products in a given collection, then I just query with the collection handle.
    If you know that you have "100" products, then you will just query, the first "100"
    if you don't know how many products in total, you can just query by collection handle
    all products in the collection, will be returned.

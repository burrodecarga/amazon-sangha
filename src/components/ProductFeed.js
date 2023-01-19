import React from 'react'
import Product from './Product'

export default function ProductFeed({products}) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-32 mx-auto">
      {products.slice(0,4).map(({id,title,description,price,category,image}) =>(
       <Product
       key={id}
       id={id}
       title={title}
       price = {price}
       description={description}
       category={category}
       image={image}
       />
      ))}

      <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />
      <div className="md:col-span-2">
      {products.slice(4,5).map(({id,title,description,price,category,image}) =>(
       <Product
       key={id}
       id={id}
       title={title}
       price = {price}
       description={description}
       category={category}
       image={image}
       />
      ))}
</div>
{products.slice(5,products.length).map(({id,title,description,price,category,image}) =>(
       <Product
       key={id}
       id={id}
       title={title}
       price = {price}
       description={description}
       category={category}
       image={image}
       />
      ))}
      

    </div>
  )
}

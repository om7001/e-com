'use client'

import React from 'react';
import ProductCard from '@/app/_components/productCard';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import Link from 'next/link';

const Page = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  console.log("🚀 ~ products ~ data:", data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <div className='flex gap-8'>
      {data ?
        data.getAllProduct &&
        data.getAllProduct.map((product) => (
          <Link href={`/products/` + product?._id}>
            <ProductCard product={product} />
          </Link>
        ))
        :
        <h1>Loading...</h1>}
        </div>
    </>
  );
}

export default Page;

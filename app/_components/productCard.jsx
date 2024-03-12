'use client';

import Image from 'next/image';
import React from 'react';


const ProductCard = ({product}) => {

    return (
        <>
            <div className='rounded-md shadow-md max-w-xs'>
                <div className="relative mb-4">
                    <Image src={product.image[0]} alt="Product Image" width={500} height={100} className="rounded-md" />
                </div>
                <div className='flex justify-between'>
                    <p className="text-lg font-semibold mb-2">{product.name}</p>
                    <p className="text-gray-700">{product.price}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
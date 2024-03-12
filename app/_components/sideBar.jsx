'use client'

import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, GET_ALL_BRAND, GET_ALL_COLOR } from '@/apollo/client/query';

const SideBar = () => {

    const { data:categoryData, loading:categoryLoading, error:categoryError } = useQuery(GET_ALL_CATEGORY);
    console.log("🚀 ~ category ~ data:", categoryData)

    const { data:BrandData, loading:brandLoading, error:brandError } = useQuery(GET_ALL_BRAND);
    console.log("🚀 ~ brand ~ data:", BrandData)
    
    const { data:colorData, loading:colorLoading, error:colorError } = useQuery(GET_ALL_COLOR);
    console.log("🚀 ~ color ~ data:", colorData)


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div>sideBar</div>
            <div>Category</div>
            {categoryData ? categoryData.getAllCategory && categoryData.getAllCategory.map(category => (
                <div key={category.id}>{category.name}</div>
            ))
            :
            <h1>Loading...</h1>}
            
            <div>Brand</div>
            {BrandData ? BrandData.getAllBrand && BrandData.getAllBrand.map(brand => (
                <div key={brand.id}>{brand.name}</div>
            ))
            :
            <h1>Loading...</h1>}
           
            <div>Color</div>
            {colorData ? colorData.getAllColor && colorData.getAllColor.map(color => (
                <div key={color.id}>
                    <div>{color.name}</div>
                    <div>{color.hexCode}</div>
                </div>
            ))
            :
            <h1>Loading...</h1>}
        </>
    )
}

export default SideBar
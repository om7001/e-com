'use client'

import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, GET_ALL_BRAND, GET_ALL_COLOR } from '@/apollo/client/query';

const sideBar = () => {

    const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_ALL_CATEGORY);
    console.log("🚀 ~ category ~ data:", categoryData)

    const { data: BrandData, loading: brandLoading, error: brandError } = useQuery(GET_ALL_BRAND);
    console.log("🚀 ~ brand ~ data:", BrandData)

    const { data: colorData, loading: colorLoading, error: colorError } = useQuery(GET_ALL_COLOR);
    console.log("🚀 ~ color ~ data:", colorData)


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <>
                    <div>
                <input type="text" className="border rounded py-2 px-3 bg-slate-300" />
                {
                    categoryData ?
                        <>
                            <p className='text-xl font-bold'>Category</p>
                            {
                                categoryData?.getAllCategory?.map((category) => (
                                    <div key={category.id}>{category.name}</div>
                                ))
                            }
                        </>
                        :
                        <h1>loading...</h1>
                }

                {
                    BrandData ?
                        <>
                            <p className='text-xl font-bold'>Company</p>
                            {
                                BrandData?.getAllBrand?.map((brand) => (
                                    <div key={brand.id}>{brand.name}</div>
                                ))
                            }
                        </>
                        :
                        <h1>loading...</h1>
                }

                {colorData ?
                    <>
                        <p className='text-xl font-bold'>Colors</p>
                        <div className='flex'>
                            {colorData?.getAllColor?.map((color) => (
                                <div key={color.id}>
                                    <div style={{ width: '20px', height: '20px', backgroundColor: color.hexCode, borderRadius: '50%', padding: '10px' }}></div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <h1>loading...</h1>
                }

            </div>
        </>
    )
}

export default sideBar
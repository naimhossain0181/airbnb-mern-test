import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import {  getProducts } from '../store/productSlice';
import { minmax } from '../store/minMaxSlice';
const HomePage = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getProducts())
        dispatch(minmax())
    },[])
    
    const {data,loading} =useSelector((state)=>state.products)

    return (
        <div className='mt-[200px] -z-50'>
            {loading? '':(
                <>
                <div className=' grid grid-cols-4 gap-4 m-10'>
                {data.data.data.map((item)=>
                    <div key={item._id} className=' '>
                        <Card item={item}/>
                    </div>
                )}
                </div>
                </>
                
            )}

        </div>
        
    );
};

export default HomePage;
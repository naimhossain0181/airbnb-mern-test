import  Card  from '../components/Card.jsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchProductsByCategory } from '../store/productSlice';
import { useParams } from 'react-router-dom';



const Category = () => {

    const dispatch=useDispatch()
    const params=useParams()
    const qName=params.category.charAt(0).toUpperCase() + params.category.slice(1).toLocaleLowerCase()
    

    useEffect(()=>{
        dispatch(SearchProductsByCategory(qName))
        console.log(`Category Useeffect`)
    },[params])
    const {data,loading} =useSelector((state)=>state.products)
    return (
        <div className=' mt-[200px]'>
              <div className=' grid grid-cols-4 gap-4 m-10'>
                {data.data?.data?.map((item)=>
                    <div key={item._id} className=' '>
                        <Card item={item}/>
                    </div>
                )}
                </div>
        </div>
    );
};

export default Category;
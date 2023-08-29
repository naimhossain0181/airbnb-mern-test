import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  SearchProductsByCategory, getProducts, getProductsCategory } from "../../store/productSlice";
import { BiFilter } from 'react-icons/bi';

import FilterItem from "./FilterItem";

const CategoryNav = () => {

    const dispatch = useDispatch()
    const { category, loading } = useSelector((state) => state.products)
    const [isActive, setIsActive] = useState()
    const [show, setSHow] = useState(false)
    

    useEffect(() => {
            dispatch(getProductsCategory())
    }, [])

    const clickHandller = (id, name) => {
        setIsActive(id)
        dispatch(SearchProductsByCategory({ "category": name }))

    }

    const rangeHandler = (e) => {
        setSHow(true)
    }

    return (

        <>
            {loading ? null : (
                <div className=' fixed top-[80px]  bg-white shadow-lg flex w-full h-20 justify-around items-center'>
                    {category.data.data.map((item,) =>
                        <button key={item._id} className={`flex justify-center items-center flex-col ${isActive === item._id ? ' border-b-2 border-black' : ''}`} onClick={() => clickHandller(item._id, item.name)}>
                            <div className=' w-5 h-5 mb-1'>
                                <img className=' w-full h-full object-cover' src={item.icon} alt="" />
                            </div>
                            <p>{item.name}</p>

                        </button>
                    )}
                    <button onClick={rangeHandler} className=" border-2 w-28 h-12 flex justify-center items-center rounded-md">
                        <BiFilter />
                        Filter
                    </button>
                    {show?(     <FilterItem setShow={setSHow}/>      ):""}
         

                </div>

            )}

        </>

    );
};

export default CategoryNav;
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../store/productSlice';
import { motion } from 'framer-motion';

const button = [
    {
        id: 0,
        name: "Any"
    },
    {
        id: 1,
        name: 1
    },
    {
        id: 2,
        name: 2
    },
    {
        id: 3,
        name: 3
    },
    {
        id: 4,
        name: 4
    },
    {
        id: 5,
        name: 5
    },
    {
        id: 6,
        name: 6
    },
    {
        id: 7,
        name: 7
    }
]

const Property = [
    {
        id: 0,
        name: "House"
    },
    {
        id: 1,
        name: "Apartment"
    },
    {
        id: 2,
        name: "Guesthouse"
    },
]


const FilterItem = (props) => {
    const [minPrice,setMinPrice]=useState(props.data.data.minmax.minPrice)
    const [maxPrice,setMaxPrice]=useState(props.data.data.minmax.maxPrice)
    const products = useSelector((state) => state.products.data.data.data)
    const dispatch = useDispatch()
    const prices = products.map((item) => item.price)

    // const minPrice = Math.min(...prices);
    // const maxPrice = Math.max(...prices);
    // const [minInput, setMinInput] = useState(minPrice)
    // const [maxInput, setMaxnInput] = useState(maxPrice)

    const [bed, setBed] = useState(0)
    const [bath, setBath] = useState(0)
    const [property, setProperty] = useState("House")

    const rangeHandller = (e) => {
        const [min, max] = e.target.value
        setMinPrice(min)
        setMaxPrice(max)
    }
    const minInputHandller=(e)=>{
        setMinPrice(e.target.value)
    }
    const maxInputHanddler=(e)=>{
        setMaxPrice(e.target.value)

    }
    const selectBedHanddler = (id) => {
        setBed(id)
    }
    const selectBathHanddler = (id) => {
        setBath(id)
    }
    const selectPropertyHandler = (name) => {
        setProperty(name)
    }
    const searchHanddler = () => {
        const filterData = {
            "searchByPoperty": property,
            "Beds": bed,
            "Bathroom": bath,
            "minPrice": minPrice,
            "maxPrice": maxPrice
        }
        dispatch(filters(filterData))
        props.setShow(false)

    }
    return (
            <motion.div  initial={{ top: 500 }}
            animate={{ top: 80 }}
            exit={{ opacity: 0.2 }}   transition={{ duration: 0.3 }} className=" fixed z-50 bg-white w-[600px] overflow-scroll h-[500px] top-20 bottom-[50%] border-2">
                <div className="  flex flex-col justify-center gap-3 w-full h-[200px]">
                    <div className="m-6">
                        <h1>Type of place</h1>
                        <h3>Search rooms, entire homes, or any type of place.</h3>
                    </div>
                    <div className=" mr-12 ml-12 bg-slate-400 max-w-full grid grid-cols-3 gap-0 border-b-2 rounded-lg">
                        <button className=" h-16 text-white rounded-xl">AnyType</button>
                        <button className=" border-r-2 border-l-2 border-blue-100 h-16 text-white">AnyType</button>
                        <button className=" h-16 text-white">AnyType</button>

                    </div>
                </div>

                <div className="  flex flex-col justify-center gap-3 w-full h-[200px]">
                    <div className="m-6">
                        <h1>Price range</h1>
                        <h3>Nightly prices before fees and taxes</h3>

                        <Box sx={{ width: 500 }}>
                            <Slider
                                track="inverted"
                                aria-labelledby="track-inverted-range-slider"
                                min={props.data.data.minmax.minPrice}
                                max={props.data.data.minmax.maxPrice}
                                value={[minPrice, maxPrice]}
                                onChange={rangeHandller}
                            />
                        </Box>
                    </div>
                    <div className=" mr-12 ml-12 max-w-full grid grid-cols-2 gap-0 border-2 rounded-lg">
                        <input type="number" value={minPrice} onChange={minInputHandller} className=" h-16 rounded-xl" />
                        <input type="number" value={maxPrice} onChange={maxInputHanddler} className=" border-r-2 border-l-2 border-blue-100 h-16" />
                    </div>
                </div>


                <div className="  flex flex-col justify-center gap-3 w-full  mt-8">
                    <div className="m-6">
                        <h1>Bed & Bathroom</h1>
                    </div>
                    <h1 className='m-6'>Bed</h1>
                    <div className=" mr-12 ml-12 max-w-full grid grid-cols-8 gap-0 border-b-2 rounded-lg">
                        {button.map((item) =>
                            <button key={item.id} className={`${bed == item.id ? " bg-black text-white" : ""} h-11 w-16 border-2 rounded-xl`} onClick={() => selectBedHanddler(item.id)}>{item.name}</button>
                        )}

                    </div>

                    <h1 className='m-6'>Bathrooms</h1>
                    <div className=" mr-12 ml-12 max-w-full grid grid-cols-8 gap-0 border-b-2 rounded-lg">
                        {button.map((item) =>
                            <button key={item.id} className={`${bath == item.id ? " bg-black text-white" : ""} h-11 w-16 border-2 rounded-xl`} onClick={() => selectBathHanddler(item.id)}>{item.name}</button>
                        )}

                    </div>
                </div>

                <div className="  flex flex-col justify-center gap-3 w-full  mt-8">
                    <div className="m-6">
                        <h1>Property type</h1>
                    </div>
                    <div className=" mr-12 ml-12 max-w-full grid grid-cols-3 gap-1 border-b-2 rounded-lg mb-20">
                        {Property.map((item) =>
                            <button className={`${property === item.name ? 'bg-black text-white' : " bg-slate-500"} w-[150px] h-[100px]`} onClick={() => selectPropertyHandler(item.name)}>{item.name}</button>
                        )}


                    </div>
                </div>
                <div className=' fixed flex justify-around items-center border-2 bg-white text-white h-24 w-[600px] rounded-sm  bottom-0 '>
                    <button className=' bg-black text-white h-12 w-24 rounded-sm '>Clear all</button>
                    <button className=' bg-black text-white h-12 w-32 rounded-sm ' onClick={searchHanddler}>Show</button>
                    <button className=' z-50 relative left-[0%] -top-[460px] w-12 h-8 bg-red-600 rounded-md text-white' onClick={() => props.setShow(false)}>X</button>
                </div>
            </motion.div>
    );
};

export default FilterItem;
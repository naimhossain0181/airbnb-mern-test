import React from 'react';

const Card = (props) => {
    return (
        
        <div className="w-2xl">
            
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 h-[360px]">
                <a href="#">
                    <div className='w-[300] h-[200px]'>

                    <img className="rounded-t-lg  w-full h-full object-cover" src={props.item.image} alt=""/>
                    </div>
                </a>
                <div className="p-5">
                    <a href="#">
                        <h1 className="text-gray-900 font-semibold  tracking-tight mb-2 dark:text-white">{`${props.item.title.substring(0, 19)} ,${props.item.country}`}</h1>
                    </a>
                    <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">{props.item.description.substring(0, 59)}</p>
                    <p className='text-gray-900 font-bold  tracking-tight mb-2'>${props.item.price} <span className='text-gray-900 font-light  tracking-tight mb-2'>night</span></p>
                </div>
            </div>
        
        </div>

    );
};

export default Card;
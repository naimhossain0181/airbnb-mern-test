import React from 'react';

const NavSearch = (props) => {
    return (
            <div className=" w-[370px] h-[60px] text-center flex justify-center items-center">
                <button onClick={props.showHide} className=" flex w-full h-[50px] justify-around border-2 items-center rounded-3xl hover:shadow-md transition-shadow duration-200 delay-100" >
                    <div>
                        <p className=" text-sm font-medium">Anywhere</p>
                    </div>
                    <div>
                        <p className=" relative text-sm font-medium before:block before:bg-slate-400  before:w-[1px] before:h-6 before:-left-5 before:absolute after:bg-slate-400 after:w-[1px] after:h-6 after:-right-5 after:absolute">Any week</p>
                    </div>
                    <div>

                        <p className="text-sm font-medium"> Add Guests</p>
                    </div>
                    <div className=" h-8 w-8 rounded-full  bg-[#FF5A5F] flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                </button>
            </div>
    );
};

export default NavSearch;
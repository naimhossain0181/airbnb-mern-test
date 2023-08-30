import { useState } from "react";
import NavSearch from "./NavComponent/NavSearch";
import NavRightProfile from "./NavComponent/NavRightProfile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {BiSearchAlt} from 'react-icons/bi'
import { Link, json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { SearchProductsByDate , getProducts} from "../store/productSlice";


const NavBar = () => {
  const dispatch=useDispatch()
  const [isSearch, setItSearch] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [person,setPerson]=useState(1)
  const [isActive, setIsActive] = useState(0);

  const [Indate, setIndate] = useState(new Date());
  const [Outdate, setOutdate] = useState(new Date());
  const [CountryName,setCountryName]=useState("Bangladesh")

  const formattedDateCheckIn = Indate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedDateCheckOut = Outdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const showHide = () => {
    setItSearch(!isSearch);
  };

  const chekInHandller =(index)=>{
    setIsCheckIn(true)
    setIsCheckOut(false)
    setIsActive(index)
  }
  const chekOutHandleller =(index)=>{
    setIsCheckOut(true)
    setIsCheckIn(false)
    setIsActive(index)
  }
  const locationInputHandller =(index)=>{
    setIsCheckOut(false)
    setIsCheckIn(false)
    setIsActive(index)
  }
  const searchHandller=()=>{
    let str1=CountryName.charAt(0).toUpperCase()
    let str2=CountryName.slice(1).toLocaleLowerCase()
    let Country=str1+str2
        const SearchData={
        
          checkInDate:formattedDateCheckIn,
          checkOutDate:formattedDateCheckOut,
          CountryName:Country,
          totalPerson:Number(person)
        }
      dispatch(SearchProductsByDate(SearchData))
      console.log(SearchData)
      setItSearch(false)
  }

  const addGuestHanddler=(index)=>{
    setIsCheckOut(false)
    setIsCheckIn(false)
    setIsActive(index)
  }
  return (
    <div className=" z-10 fixed left-0 top-0 bg-white flex h-[80px] w-full justify-between items-center  border-b-[1px] ">
      <div className=" ml-11 w-1/3 justify-start">
        <div className=" h-8 w-[100px]" onClick={()=>dispatch(getProducts())}>
      <Link to="/">
          <img
            className=" h-full w-full object-fill"
            src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb_logo_PNG3.png"
            alt="logo"
          />
        </Link>
        </div>
      </div>
      <div className=" w-1/3 flex justify-center">
        {!isSearch ? (
          <NavSearch showHide={showHide} />
        ) : (
          <motion.div  initial={{ scale:0 }}
          animate={{ scale: 1 }}
          transition={{ duration:0.2 }} className=" flex-col flex items-center ">
            <div className={`w-[370px] h-[60px] flex justify-between items-center`}>
              <button>Stay</button>
              <button>Experiences</button>
              <button>Online Experiences </button>
            </div>

            <div className=" fixed top-20  flex w-full justify-center">
              <div className=" bg-slate-400 w-[720px] h-[80px] flex justify-between border-2 rounded-full">
                <div className={`flex pl-10 overflow-hidden flex-col h-[78px] w-[280px] items-start justify-center  ${isActive===0?" bg-white rounded-full":""} `} onClick={()=>locationInputHandller(0)}>
                  <span className=" text-d">Where</span>
                  <input type="text" placeholder="Ex :Bangladesh,India" className={`h-[40px] border-none outline-none rounded-3xl ${!isActive==0?"bg-[#94A3B8] text-yellow-400 placeholder-slate-600":""}`} onChange={(e)=>setCountryName(e.currentTarget.value)}  />
                </div>

                <div className=" relative flex flex-col h-[80px] w-[180px]  justify-center">
                  <button
                    className={` absolute w-full h-full ${isActive===1?"rounded-full bg-white block":""} `}
                    onClick={()=>chekInHandller(1) }
                  >
                    <span>Check In</span>
                    <br />
                    <span>{`${Indate.getDate()} ${Indate.toLocaleString(
                      "default",
                      { month: "long" }
                    )}`}</span>
                  </button>

                  <div className=" flex justify-around items-center bg-opacity-70 rounded-2xl absolute -left-[350px] top-20 w-[960px] h-[400px] bg-white">
                  {isCheckIn ? (
                      <Calendar
                        showDoubleView={true}
                        value={Indate}
                        onChange={(date) => setIndate(date)}
                      />
                      ) : isCheckOut?
                      (
                         
                      <Calendar
                        showDoubleView={true}
                        value={Outdate}
                        onChange={(date) => setOutdate(date)}
                        />
                  ):""}
                  </div>
                  <div>
                  </div>
                </div>

                <div className={` relative flex flex-col h-[80px] w-[180px] justify-center items-center ${isActive===2?"bg-white rounded-full":""}`}>
                  <button
                    className=" absolute"
                    onClick={() => chekOutHandleller(2)}
                  >
                    <span>Check Out</span>
                    <br />
                    <span>{`${Outdate.getDate()} ${Outdate.toLocaleString(
                      "default",
                      { month: "long" }
                    )}`}</span>
                  </button>
                </div>

                <div className={`flex w-[280px] h-[78px] justify-end items-center ${isActive==3?"bg-white rounded-full":""}`}>
                    <button className=" relative" onClick={()=>addGuestHanddler(3)}>
                    <p>Who</p>
                    <p>Add guest</p>
                    {isActive===3?( <div className=" absolute -left-20 top-28 w-[280px] h-[300px] bg-yellow-50" >
                        <div className="flex justify-center mt-10">
                            <button className=" bg-red-400 w-10" onClick={()=>setPerson(person-1)}>-</button>
                            <h1 className=" p-10">Person {person}</h1>
                            <button className=" bg-red-400 w-10" onClick={()=>setPerson(person+1)}>+</button>
                        </div>
                    </div>):""}
                   
                    </button>
                    <button className="w-[120px] h-[50px] flex justify-center items-center bg-red-400 rounded-full mr-4" onClick={()=>searchHandller(3)}>
                      <BiSearchAlt size={40}/>
                      <p className=" text-white font-semibold text-[20px]">search</p>
                    </button>
                    <button className=' relative -left-[800px] top-10 w-12 h-8 bg-red-600 rounded-md text-white' onClick={()=>setItSearch(false)} >X</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="  w-1/3 flex justify-end mr-11">
        <NavRightProfile />
      </div>
    </div>
  );
};

export default NavBar;

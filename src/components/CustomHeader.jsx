import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, Typography } from "antd";
import CustomModal from "./CustomModal";

const CustomHeader = () => {
  const [openModal, setOpenModal]=useState(false);
  const cartItems = useSelector((state)=> state.cartItems);
  return (
    <div className="flex flex-row justify-between shadow-xl	">
       <CustomModal openModal={openModal} setOpenModal={setOpenModal}/>
      <Link to={"/"} className="no-underline text-xl mt-4 ml-4 font-semibold">
        {" "}
        Home{" "}
      </Link>

      <div className="flex mt-1">
        <Link
          to={"/profile"}
          className="no-underline text-xl mt-4 font-semibold"
        >
          {" "}
          Profile {" "}
        </Link>
        <div className="mr-2 flex flex-row cursor-pointer"  onClick={()=>setOpenModal(true)}>
          <Image
            //  width={200}
            height={60}
            src={`https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-add-to-cart--icon-design-png-image_1013293.jpg`}
            preview={false}
       
          />
             
       
        {cartItems?.filter((ele)=>ele.selectedQuantity >0)?.map((item)=>item)?.length>0 && 
        <Typography.Paragraph className=" bg-slate-500 rounded-[50%] ml-[-1.7rem] z-10 pt-3  w-[2.5rem] text-white text-center">
            {cartItems?.filter((ele)=>ele.selectedQuantity >0)?.map((item)=>item)?.length}
         </Typography.Paragraph>}
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;

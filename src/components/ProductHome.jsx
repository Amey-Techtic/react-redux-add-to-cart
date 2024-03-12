import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import { Button, Image, Typography, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../services/Actions/action";
import { cartNotification } from "../App";
const { Paragraph } = Typography;

const ProductHome = () => {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch(); //we can dipatch any reducer action function using useDispatch
  const CartItem = useSelector((state) => state.cartItems); //using useSelector we can use any reducer functions
  const notificationProvider = useContext(cartNotification);
  
 
  useEffect(() => {
    async function getApiData() {
      try {
        await axios
          .get("https://fakestoreapi.com/products")
          .then((res) => setProducts(res.data));
      } catch (error) {
        console.log("error ", error);
      }
    }

    getApiData();
  }, []);
  //   console.log(products);
  if (products === null)
    return (
      <div className="flex flex-col align-middle text-center mt-[19rem]">
        <Spin size="large" />
        <div className="mt-2.5 text-lg font-semibold text-blue-500">
          Loading...
        </div>
      </div>
    );

  const handleAddCart = (item) => {

    let filterArray = CartItem.some((ele) => ele.title == item.title);
    if (!filterArray) {
      dispatch(
        addToCart({
          title: item.title,
          image: item.image,
          price:
            Math.trunc(item.price) < 100
              ? Math.trunc(item.price) * 100
              : Math.trunc(item.price),
          selectedQuantity: 1,
        })
      );
      notificationProvider("bottomRight", `${item.title} was successfully add in your cart!`);
      return;
      // props.addToCartHandler();
    } else {
      notificationProvider("bottomRight", `${item.title} is already present in your cart!`);
      return;
    }
  };
  // console.log("CartItem", CartItem);
  return (
    <div>
      {/* ProductHome component body */}
      <Dashboard>
        <div className="grid grid-cols-4 mt-10 gap-7 w-[90%] ml-[70px]">
          {products?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-[100%]  p-4  shadow-xl justify-between align-center rounded-lg"
            >
              <Image
                className="flex justify-center ml-[20px]"
                width={200}
                height={200}
                src={`${item.image}`}
                preview={false}
              />

              <Paragraph className="text-center text-lg mt-4 h-[33%]">
                {item.title}
              </Paragraph>

              <Paragraph className="text-xl text-center h-fit !mb-1.5">
                &#8377;
                {Math.trunc(item?.price) < 100
                  ? Math.trunc(item?.price) * 100
                  : Math.trunc(item?.price)}
              </Paragraph>

              <Space>
                <Button
                  className="bg-red-500 text-white font-semibold text-lg p-2 h-auto ml-[64px] w-fit "
                  onClick={() => handleAddCart(item)}
                >
                  Add To Cart
                </Button>
              </Space>
            </div>
          ))}
        </div>
      </Dashboard>
    </div>
  );
};

export default ProductHome;

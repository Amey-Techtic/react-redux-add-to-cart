import { Button, Modal, Typography } from "antd";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increasedecreaseSelectedQuantity } from "../services/Actions/action";
import { handleCheckOutItems } from "../services/Actions/checkoutAction";
import { cartNotification } from "../App";

const CustomModal = ({ openModal, setOpenModal }) => {
  const cartSelectedItems = useSelector((state) => state.cartItems);
  const checkoutCartItems = useSelector((state) => state.checkOutCartItems);
  const checkoutNotification = useContext(cartNotification);

  console.log("checkoutCartItems ", checkoutCartItems);
  console.log("cartSelectedItems", cartSelectedItems);
  const dispatch = useDispatch();

  const handleSelectedQuantity = (item, btnAction) => {
    // Find the item in the cartSelectedItems array
    let selectedItemIndex = cartSelectedItems.findIndex(
      (ele) => ele.title === item.title
    );

    // If the item is found in the cart, update its quantity
    if (selectedItemIndex !== -1) {
      let updatedCartItems = [...cartSelectedItems];
      //we are saving redux store state in updatedCartItems
      const basePrice = updatedCartItems[selectedItemIndex].price; //this is original price that is we are going to update it because we need that to increase or decrease item selectedQuantity

      if (btnAction == "+") {
        const newQuantity = (updatedCartItems[
          selectedItemIndex
        ].selectedQuantity += 1);
        updatedCartItems[selectedItemIndex].totalPrice = basePrice * newQuantity;
        // updatedCartItems[selectedItemIndex].price
      }
      if (btnAction == "-") {
        updatedCartItems[selectedItemIndex].selectedQuantity -= 1;
        updatedCartItems[selectedItemIndex].totalPrice -= basePrice;
        if (updatedCartItems[selectedItemIndex].selectedQuantity == 0) {
          //splice out element from array if its selectedQuantity is 0
          cartSelectedItems.splice(selectedItemIndex, 1);
        }
      }

      dispatch(increasedecreaseSelectedQuantity(updatedCartItems));
    } 
  };

  const handleCheckout = () => {

      dispatch(      
        handleCheckOutItems(cartSelectedItems)
      )
      setOpenModal(false);
      checkoutNotification("bottomRight", "Checked out successfully!")
  


  };

  return (
    <Modal
      title={
        <Typography.Paragraph className="text-2xl font-bold text-zinc-500">
          Your Cart
        </Typography.Paragraph>
      }
      footer={[
        <Button key="back" size="large" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button
          className={ `bg-red-500 text-white font-semibold ${cartSelectedItems.length>0 ? "inline-block" : "hidden"}` }
          size="large"
          onClick={() => handleCheckout()}
        >
          Checkout
        </Button>,
      ]}
      onCancel={() => setOpenModal(false)}
      open={openModal}
    >
      {cartSelectedItems
        ?.filter((ele) => ele.selectedQuantity > 0)
        ?.map((items) => items).length > 0 ? (
        cartSelectedItems
          ?.filter((ele) => ele.selectedQuantity > 0)
          ?.map((items, index) => (
            <div className="flex flex-row justify-between mb-2" key={index}>
              <div className="flex flex-row w-[20rem]">
                <Typography.Paragraph className="w-[35rem] font-semibold text-base">
                  {items?.title}
                </Typography.Paragraph>
                <Typography.Paragraph className=" text-right w-64 font-semibold text-slate-600 text-lg">
                  &#8377;{items?.totalPrice ?? items.price}
                </Typography.Paragraph>
              </div>

              <div className="flex ml-[-15rem]">
                <Button onClick={() => handleSelectedQuantity(items, "+")}>
                  +
                </Button>
                <Typography.Paragraph className="mx-2 mt-1 text-lg">
                  {items?.selectedQuantity}
                </Typography.Paragraph>
                <Button onClick={() => handleSelectedQuantity(items, "-")}>
                  -
                </Button>
              </div>
            </div>
          ))
      ) : (
        <Typography.Paragraph className="text-red-500 text-center text-lg font-semibold">
          No cart Items added yet...
        </Typography.Paragraph>
      )}
      {cartSelectedItems.length>0 ? <Typography.Paragraph className="text-lg font-semibold">
        Grand Total: &#8377;
        {cartSelectedItems.reduce((total=0, currentValue) => {

          return (total = total + (currentValue.totalPrice==undefined ? currentValue.price : currentValue.totalPrice));
        }, 0)
        //second parameter of reduce method is initial values
        }
      </Typography.Paragraph> : ""}
    </Modal>
  );
};

export default CustomModal;

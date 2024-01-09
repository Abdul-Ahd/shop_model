import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/shop.json";
const item = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center" id="dash2">
        <Lottie animationData={animationData} id="ani1" />
      </div>
    </>
  );
};

export default item;

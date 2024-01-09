import Lottie from "lottie-react";
import React from "react";
import animationData from "../../assets/Animation - 1704799928475.json";
const dashborad = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center" id="dash1">
        <div
          className="text-center sapce-y-4 justify-center backdrop-blur-2 "
          id="dash2"
        >
          <h1 className="text-5xl font-bold">Welcome to My Store</h1>
          <Lottie animationData={animationData} />
        </div>
      </div>
    </>
  );
};

export default dashborad;

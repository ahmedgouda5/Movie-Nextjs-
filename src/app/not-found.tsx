"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import animationData from "../../public/Notfound.json"; 

export default function Notfound() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-[50%] "
      />
    </div>
  );
}

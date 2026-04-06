import React from 'react'
import Image from 'next/image';

const StudentCard = ({ name, image }) => {
  return (
    <div className="relative min-w-40 max-w-60 h-100  rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={name}
        width={250}
        height={250}
        className=" object-cover object-top"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>

      {/* Text */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm opacity-90">Hafiz-e-Qur&apos;an</p>
      </div>
    </div>
  );
};


export default StudentCard

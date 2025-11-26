// src/components/InfoCard.jsx
import React from 'react';

const InfoCard = ({ title, value, bgColor, icon: Icon, iconColor }) => (
  <div className={`p-4 h-full rounded-2xl shadow-md ${bgColor} flex flex-col justify-between relative overflow-hidden transition duration-300 hover:shadow-xl`}>
    {/* Background Icon (Low Opacity) */}
    <div className={`absolute top-1 right-1 text-7xl opacity-10 ${iconColor}`}>
        <Icon />
    </div>

    <div className="text-center mt-4">
      <p className="text-5xl font-extrabold mb-1 text-gray-800">{value}</p>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
    </div>
  </div>
);

export default InfoCard;
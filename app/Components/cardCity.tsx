"use client";
import cardOfCitys from "../../public/Data/cardOfCitys.json";
import React from "react";

export const CardCity = () => {
  return (
    <div className=" flex flex-wrap justify-center gap-10 mt-10 mb-10 bg-white">
      {cardOfCitys.map((city, idx) => (
        <div className="card  w-96 shadow-sm mb-10 bg-white">
          <React.Fragment key={city.id ?? idx}>
            <figure className="px-10 pt-10">
              <img
                src={
                  city.image ??
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={city.city ?? "City"}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{city.city ?? "Card Title"}</h2>
              <p>
                {city.description ??
                  "A card component has a figure, a body part, and inside body there are title and actions parts"}
              </p>
              <div className="card-actions">
                <button className=" w-60 bg-blue-400">Buy Now</button>
              </div>
            </div>
          </React.Fragment>
        </div>
      ))}
    </div>
  );
};

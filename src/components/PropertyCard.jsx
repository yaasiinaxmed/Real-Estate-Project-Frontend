import React from "react";
import { ImLocation2 } from "react-icons/im";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { Badge, NumberFormatter, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div className="card w-[340px] bg-white flex flex-col shadow-[0px_0px_12px_rgb(0,0,0,0.1)] rounded-lg overflow-hidden duration-100 hover:scale-105 ">
      {/* image */}
      <figure className="relative w-full h-[200px]">
        {/* Badge */}
        {property.type === "for sell" && (
          <div className="absolute top-2 right-3"><Badge>For Sell</Badge></div>
        )}
        <img src={property.imageUrl} alt="" className="w-full h-full" />
      </figure>
      {/* Details */}
      <div className="mt-1 flex flex-col gap-3 p-4">
        <h2 className="text-xl flex items-center gap-2">
          <ImLocation2 />{" "}
          <span className="text-lg font-medium">
            {property.address.slice(0, 8) +
              " , " +
              property.city.slice(0, 8) +
              " - " +
              property.country}{" "}
          </span>
        </h2>
        <div className="flex items-center justify-between ">
          <span className="flex items-center text-lg gap-2">
            <IoBed /> <p className="text-sm">{property.bedrooms} Bed Rooms</p>
          </span>
          <span className="flex items-center text-lg gap-2">
            <FaBath /> <p className="text-sm">{property.bathrooms} Bath Rooms</p>
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
        <h2 className="text-lg font-medium">
            <NumberFormatter
              prefix="$ "
              value={property.price}
              thousandSeparator
            />

            {property.type === "for rent" ? (<Text span fz="sm" c="dimmed">
              / mo
            </Text>) : ""}
          </h2>
          <Link to={`/Property/${property._id}/${property.title.toLowerCase().split(" ").join("-")}`}>
            <button className="bg-white text-primaryColor px-4 py-3 text-sm font-medium">
              See More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;

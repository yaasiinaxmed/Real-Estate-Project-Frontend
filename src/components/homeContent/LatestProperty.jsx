import React from "react";
import PropertyCard from "../PropertyCard";
import { Link } from "react-router-dom";
import { useGetPropertiesQuery } from "../../store/api/PropertySlice";

function LatestProperty() {
  const { data: properties = [], isLoading } = useGetPropertiesQuery();

  return (
    <section>
      <div className="container flex flex-col items-center ">
        {/* Title */}
        <h2 className="text-center text-2xl font-medium text-HeadingColor">
          Latest <span className="text-primaryColor">Properties</span>
        </h2>
        {/* Properties */}
        <div className="flex items-center justify-center flex-wrap gap-6 mt-8">
          {isLoading ? (
            <div className="flex gap-2 items-center justify-center ">
              <span className="w-6 h-6 rounded-full border-2 border-primaryColor border-l-white animate-spin"></span>
              Loading...
            </div>
          ) : (
            <>
              {properties.slice(0, 6).map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </>
          )}
        </div>
        {/* button more */}
        <Link to="/properties">
          <button className="bg-primaryColor mt-10 text-white px-8 py-2 h-[44px] font-medium flex items-center justify-center rounded-3xl duration-100 hover:scale-110 ">
            See More
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LatestProperty;

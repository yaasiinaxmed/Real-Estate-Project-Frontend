import React, { useState } from "react";
import PropertyCard from "../../components/PropertyCard";
import SearchBar from "../../components/SearchBar";
import { useGetPropertiesQuery } from "../../store/api/PropertySlice";
import searchImg from "../../assets/search.png";
import emptyImg from "../../assets/empty.png";
import heroImg from "../../assets/hero.jpg";

function Properties() {
  console.log("test")
  const { data: properties = [], isLoading } = useGetPropertiesQuery();
  const [filter, setFilter] = useState("");
  const searchData = properties.filter(
    (property) =>
      property.country.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.address.toLowerCase().includes(filter.toLowerCase()) ||
      property.propertyType.toLowerCase().includes(filter.toLowerCase()) ||
      property.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* cover */}
      <div
        className="w-full h-[200px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      {/* Properties */}
      <div className="container pb-12 flex items-center justify-center flex-wrap gap-6 mt-8">
        {isLoading ? (
          <div className="py-[14rem] flex gap-2 items-center justify-center ">
            <span className="w-6 h-6 rounded-full border-2 border-primaryColor border-l-white animate-spin"></span>
            Loading...
          </div>
        ) : (
          <>
            {searchData.length === 0 ? (
              <section className="py-[3rem] flex flex-col items-center justify-center">
                <figure className="w-[20rem]">
                  <img src={searchImg} alt="" className="w-full" />
                </figure>
                <h1>No Results Found</h1>
              </section>
            ) : (
              <>
                {properties.length === 0 ? (
                  <section className="py-[3rem] flex flex-col items-center justify-center">
                    <figure className="w-[12rem]">
                      <img src={emptyImg} alt="" className="w-full" />
                    </figure>
                    <h1 className="mt-3 text-gray-500">Properties Is Empty</h1>
                  </section>
                ) : (
                  searchData.map((property) => (
                    <PropertyCard property={property} key={property._id} />
                  ))
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Properties;

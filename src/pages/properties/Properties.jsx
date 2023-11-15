import React, { useState } from "react";
import properties from "../../components/data";
import PropertyCard from "../../components/PropertyCard";
import SearchBar from "../../components/SearchBar";

function Properties() {
  const [filter, setFilter] = useState("");
  const searchData = properties.filter(
    (property) =>
      property.country.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.address.toLowerCase().includes(filter.toLowerCase()) ||
      property.propertyType.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* cover */}
      <div className="w-full h-[200px] bg-hero bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      {/* Properties */}
      <div className="container pb-12 flex items-center justify-center flex-wrap gap-6 mt-8">
        {searchData.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          searchData.map((property) => (
            <PropertyCard property={property} key={property._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Properties;

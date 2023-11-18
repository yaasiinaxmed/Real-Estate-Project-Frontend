import React from "react";
import { BsSearch } from "react-icons/bs";

function SearchBar({filter, setFilter}) {
  return (
    <div className="flex items-center justify-between w-3/4 sm:w-2/5 bg-white rounded-3xl overflow-hidden">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by title, country, city , address and propertyType"
        className="w-full px-5 p-4 outline-none"
      />
      <button className="text-primaryColor p-3 px-5">
        <BsSearch />
      </button>
    </div>
  );
}

export default SearchBar;

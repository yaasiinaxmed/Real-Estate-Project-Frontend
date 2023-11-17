import React, { useState } from "react";
import { useGetRequestsQuery } from "../../store/api/PropertySlice";
import searchImg from "../../assets/search.png";
import heroImg from "../../assets/hero.jpg";
import RequestsCard from "../../components/RequestsCard";

function YourRequests() {

  const { data: requests = [], isLoading } = useGetRequestsQuery();

  return (
    <div className="w-full">
      {/* cover */}
      <div
        className="w-full h-[200px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(to bottom , #1E88E5, rgba(0,0,0,0.1)), url(${heroImg})` }}
      >
      <h2 className="my-3 font-medium text-2xl md:text-3xl text-white">Your Requests</h2>
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
            {requests.length === 0 ? (
              <section className="py-[3rem] flex flex-col items-center justify-center">
                <figure className="w-[20rem]">
                  <img src={searchImg} alt="" className="w-full" />
                </figure>
                <h1>No Results Found</h1>
              </section>
            ) : (
              requests.map((request) => (
                <RequestsCard request={request} key={request._id} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default YourRequests
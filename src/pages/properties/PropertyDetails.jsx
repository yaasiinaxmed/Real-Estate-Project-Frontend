import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Badge, Group, NumberFormatter, Text } from "@mantine/core";
import { ImLocation2 } from "react-icons/im";
import { HiHome } from "react-icons/hi2";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import Map from "../../components/propertyContent/Map";
import { useDeletePropertyMutation, useGetPropertiesQuery, useSendRequestMutation } from "../../store/api/PropertySlice";
import { useGetUserQuery } from "../../store/api/UserSlice";
import toast from "react-hot-toast";

function PropertyDetails() {
  const {data: properties = [], error, isLoading} = useGetPropertiesQuery()
  const { data: user = [] } = useGetUserQuery();
  const [deleteProperty] = useDeletePropertyMutation()
  const [ sendRequest ] = useSendRequestMutation()

  const { id } = useParams();
  const navigate = useNavigate()

  const property = properties.find((pro) => pro && pro._id === id);

  // Delete Property
  const handleDelete = (id) => {
    if(confirm("Do you went to delete this property?")) {
      deleteProperty(id).unwrap().then((result) => {
        toast.success(result.message)
        navigate("/")
      }).catch((error) => {
        toast.error(error.data.message)
      })
    }
  }

  // Send Request
  const HandleSendRequest = (id) => {
    sendRequest(id).unwrap().then((result) => {
      toast.success(result.message)
    }).catch((error) => {
      if(error.data.status === 409) {
        toast.error(error.data.message)
      }

      toast.error(error.data.message)
    })
  }

  return (
    <section className="relative">
      <div className="container">
        {isLoading ? (
          <div className="py-[14rem] flex gap-2 items-center justify-center ">
            <span className="w-6 h-6 rounded-full border-2 border-primaryColor border-l-white animate-spin"></span>
            Loading...
          </div>
        ) : (
         <>
          {/* cover img */}
        <figure className="w-full cover-img h-[cover] max-h-[700px]  relative overflow-hidden !rounded-2xl ">
        {/* Badge Availabe status */}
        <div className="absolute top-2 left-3">
          <Badge color={property.available ? "lime" : "red"}>
            {property.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
        {/* img */}
        <img
          src={property.imageUrl}
          alt=""
          className="w-full h-full !bg-cover !bg-center !bg-no-repeat !object-center"
        />
      </figure>
      {/* Details */}
      <div className="flex flex-col xl:flex-row justify-between mt-4 gap-4">
        {/* info */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <h2 className="font-medium text-2xl md:text-3xl text-HeadingColor">
              {property.title}
            </h2>
            <h3 className="text-xl md:text-3xl font-medium">
              <NumberFormatter
                prefix="$ "
                value={property.price}
                thousandSeparator
                className="text-HeadingColor"
              />

              {property.type.toLowerCase() === "for rent" ? (
                <Text span fz="sm" c="dimmed">
                  / mo
                </Text>
              ) : (
                ""
              )}
            </h3>
          </div>
          <p className="my-2 whitespace-pre-wrap text-lg text-gray-600 ">
            {property.description}
          </p>
          {/* property info */}
          <div className="flex flex-col gap-3">
          <Text size="xl" className="font-medium">
              Property Info
            </Text>
          <div className="flex flex-col gap-4 sm:flex-row justify-between text-HeadingColor">
            <span className="flex items-center text-sm sm:text-lg gap-2">
              <HiHome /> <p className="text-sm">{property.propertyType}</p>
            </span>
            <span className="flex items-center text-lg gap-2">
              <IoBed />{" "}
              <p className="text-sm">{property.bedrooms} Bed Rooms</p>
            </span>
            <span className="flex items-center text-lg gap-2">
              <FaBath />{" "}
              <p className="text-sm">{property.bathrooms} Bath Rooms</p>
            </span>
          </div>
          </div>
          {/* address info */}
          <div className="flex flex-col gap-3 mt-4">
            <Text size="xl" className="font-medium">
              Address
            </Text>
            <h2 className="text-lg sm:text-xl flex !items-center gap-2">
              <ImLocation2 />{" "}
              <span className="text-sm sm:text-lg font-medium">
                {property.address +
                  " , " +
                  property.city +
                  " - " +
                  property.country}{" "}
              </span>
            </h2>
          </div>
          {/* owner info */}
        {property.owner !== null && user && (
            <div className="flex flex-col gap-3 mt-3">
            <Text size="xl" className="font-medium">
              Owner Info
            </Text>
            <div className="flex flex-col gap-3 md:flex-row justify-between">
              <Group>
                {/* avatar */}
                <Avatar src={property.owner.avatar} radius="xl" />
                {/* info */}
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {property.owner.name} {property.owner._id === user._id && ("(You)")}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {property.owner.email}
                  </Text>
                </div>
              </Group>
              {/* buttons */}
              {property.owner._id !== user._id ? (
                <div className="flex flex-col gap-3 md:flex-row mt-3 md:mt-0">
                <Link to={`/property/${property._id}/contact`}>
                <button className="bg-primaryColor px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 hover:scale-105">
                  Contact Owner
                </button>
                </Link>
                <button onClick={() => HandleSendRequest(property._id)} className="bg-primaryColor px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 hover:scale-105">
                Send Request
                </button>
              </div>
              ) : (
                <div className="flex flex-col gap-3 md:flex-row mt-3 md:mt-0">
               <Link to={`/edit-property/${property._id}/${property.title.toLowerCase().split(" ").join("-")}`} className="w-full flex md:w-auto">
               <button className="!w-full bg-primaryColor px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 hover:scale-105">
                  Edit Property
                </button>
               </Link>
                <button onClick={() => handleDelete(property._id)} className="bg-red-500 px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 hover:scale-105">
                  Delete Property
                </button>
              </div>
              )}
            </div>
          </div>
        )}
        </div>
        {/*  location map */}
        <div className="w-full xl:!w-[600px]">
          <Map
            country={property.country}
            city={property.city}
            address={property.address}
          />
        </div>
      </div>
         </>
        )}
      </div>
    </section>
  );
}

export default PropertyDetails;

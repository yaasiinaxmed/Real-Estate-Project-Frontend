import React from "react";
import { Avatar, Badge, NumberFormatter, Text } from "@mantine/core";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../store/api/UserSlice";

function TransactionCard({ transaction, isLoading }) {
  const { data: user = {} } = useGetUserQuery();

  return (
    <div
      className={`card w-[340px] bg-white p-4 flex flex-col shadow-[0px_0px_12px_rgb(0,0,0,0.1)] ${
        isLoading && "animate-pulse"
      } rounded-lg overflow-hidden duration-100 hover:scale-105`}
    >
      {/* user Info */}
      <div className="flex items-center justify-between p-3 border-b-2 border-b-gray-200">
        <div className="flex gap-2">
          <Avatar src={user.role === "owner" ? transaction?.request?.sender?.avatar : transaction?.request?.property?.owner?.avatar} radius="xl" />
          <div>
            <Text size="sm" fw={500}>
            {user.role === "owner" ? transaction?.request?.sender?.name : transaction?.request?.property?.owner?.name}
            </Text>
            <Text c="dimmed" size="xs">
            {user.role === "owner" ? transaction?.request?.sender?.email : transaction?.request?.property?.owner?.email}
            </Text>
          </div>
        </div>
        <Badge variant="light" className="!capitalize !font-medium">
          {transaction?.request?.property?.type}
        </Badge>
      </div>
      {/* content info */}
      <div className="my-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <Text size="sm">Property Title</Text>
          <Text size="xs" c="dimmed">
            {transaction?.request?.property?.title.slice(0, 20) + "..."}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text size="sm">Date </Text>
          <Text size="xs" c="dimmed">
            {format(new Date(transaction?.createdAt), "yyyy/MM/dd")} -{" "}
            {formatDistanceToNow(new Date(transaction?.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text size="sm">Property Type</Text>
          <Text size="xs" c="dimmed">
            {transaction?.request?.property?.propertyType}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text size="sm">Price</Text>
          <NumberFormatter
            prefix="$"
            value={transaction?.request?.property?.price}
            thousandSeparator
          />
        </div>
      </div>
      {/* buttons */}
      <Link
        to={`/property/${transaction?.request?.property._id}/contact`}
        className="w-full flex md:w-auto"
      >
        <button className="!w-full bg-primaryColor px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100">
          Contact Owner
        </button>
      </Link>
    </div>
  );
}

export default TransactionCard;

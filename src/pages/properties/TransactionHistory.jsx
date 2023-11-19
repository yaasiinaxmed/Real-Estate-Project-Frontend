import React from "react";
import { useGetTransactionsQuery } from "../../store/api/PropertySlice";
import emptyImg from "../../assets/empty.png";
import heroImg from "../../assets/hero.jpg";
import TransactionCard from "../../components/TransactionCard";

function TransactionHistory() {

  const { data: transactions = [], isLoading } = useGetTransactionsQuery();

  return (
    <div className="w-full h-screen">
      {/* cover */}
      <div
        className="w-full h-[200px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(to bottom , #1E88E5, rgba(0,0,0,0.1)), url(${heroImg})` }}
      >
      <h2 className="my-3 font-medium text-2xl md:text-3xl text-white">Transaction History</h2>
      </div>
      {/* Transactions */}
      <div className="container pb-12 flex items-center justify-center flex-wrap gap-6 mt-8">
        {isLoading ? (
          <div className="py-[14rem] flex gap-2 items-center justify-center ">
            <span className="w-6 h-6 rounded-full border-2 border-primaryColor border-l-white animate-spin"></span>
            Loading...
          </div>
        ) : (
          <>
            {transactions.length === 0 ? (
               <section className="py-[3rem] flex flex-col items-center justify-center">
               <figure className="w-[12rem]">
                 <img src={emptyImg} alt="" className="w-full" />
               </figure>
               <h1 className="mt-3 text-gray-500">Your Transaction History Is Empty</h1>
             </section>
            ) : (
                transactions.map((transaction) => (
                <TransactionCard transaction={transaction} key={transaction._id} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
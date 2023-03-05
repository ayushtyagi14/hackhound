import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

const Summary = () => {
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    setSummaryData(JSON.parse(localStorage.getItem("orderSummary")));
    console.log(JSON.parse(localStorage.getItem("orderSummary")));
  }, []);

  return (
    <>
      {console.log("summary", summaryData)}
      <div className="h-screen">
        <h1 className="text-[40px] text-center font-vollkron font-bold">
          Order Summary
        </h1>
        <div className="flex flex-col">
          <div>
            <h1 className="text-[30px] font-bold mt-3">
              Table Reservation Details
            </h1>
            <div className="border rounded-lg py-4 mx-3 flex flex-col items-center text-center px-5">
              <h1 className="text-[20px] flex flex-row justify-between items-center w-full">
                Name:
                <span>{summaryData.userName}</span>
              </h1>
              <h1 className="flex flex-row justify-between items-center w-full">
                Email:
                <span>{summaryData.userEmail}</span>
              </h1>
              <h1 className="flex flex-row justify-between items-center w-full">
                Phone Number:
                <span>{summaryData.contactNumber}</span>
              </h1>
              <span className="flex flex-row justify-between items-center w-full">
                Number of People: <span>{summaryData.numberOfPeople}</span>
              </span>
              <p className="flex flex-row justify-between items-center w-full">
                Special Request:
                <span>{summaryData.specialRequest}</span>
              </p>
              <p className="flex flex-row justify-between items-center w-full">
                Reservation On: <span>{summaryData.date}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mt-10 mx-20">
          <h1 className="text-[30px]">
            Total Amount: ${summaryData.totalAmount}{" "}
          </h1>
          <Link
            href={"https://hackhound-metamask-8288.vercel.app/"}
            className="ml-20 border py-2 px-4 rounded-lg hover:bg-[#743a7d]"
          >
            Pay Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Summary;

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Summary = () => {
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    setSummaryData(JSON.parse(localStorage.getItem("orderSummary")));
    console.log(JSON.parse(localStorage.getItem("orderSummary")));
  }, []);

  return (
    <>
      {console.log("summary", summaryData)}
      <div>
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
          <div className="mt-10">
            <h1 className="text-[30px] font-bold mb-5">Food Item Details</h1>
            <div className="border mx-3 rounded-lg">
              {/* {summaryData.dishInfo.map((item, index) => (
                <>
                  {console.log(item.dishImgLink)}
                  <div
                    className="flex flex-row items-start text-left mt-8 mb-3 mx-3"
                    key={index}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.dishImgLink}
                        alt="food-item"
                        height={250}
                        width={250}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex flex-row items-center justify-between">
                        <h1> {item.dishName} </h1>
                        <span> ${item.dishPrice} </span>
                      </div>
                      <p className="mt-4"> {item.dishDesc} </p>
                    </div>
                  </div>
                </>
              ))} */}
            </div>
          </div>
        </div>
        <h1 className="text-[30px] mb-10 mt-8">
          Total Amount: ${summaryData.totalAmount}{" "}
        </h1>
      </div>
    </>
  );
};

export default Summary;

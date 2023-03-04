import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Reservation = ({ onTabClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [people, setPeople] = useState("");
  const [request, setRequest] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submit clicked");

    console.log(userId, name, email, number, people, request, selectedDate);

    setLoading(true);
    const data = {
      userId,
      name,
      email,
      people,
      selectedDate,
      number,
      request,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("https://gravity-grill.onrender.com/api/reservation", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        const data = JSON.parse(result);
        console.log("DATA", data);
        setLoading(false);
        if (data.resCode === 200) {
          toast.success("Table Reserved Succesfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          handleTabClick("Menu");
        } else {
          toast.error(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleTabClick = (tab) => {
    console.log("Clicked on tab:", tab);
    onTabClick(tab);
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border w-[90%] mx-auto p-5 h-[90vh] flex flex-col justify-between"
      >
        <div>
          <div className="grid grid-cols-2">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="text">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between items-center mx-8">
              <label htmlFor="text">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between items-center mt-4">
              <label htmlFor="number">Phone Number:</label>
              <input
                type="number"
                name="phone"
                id="phone"
                onWheel={(e) => e.target.blur()}
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between items-center mx-8 mt-4">
              <label htmlFor="people">Number of People:</label>
              <input
                type="number"
                name="people"
                id="people"
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={people}
                onChange={(event) => setPeople(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col my-6">
            <label htmlFor="date-time">Select Date and Time:</label>
            <DatePicker
              id="date-time"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              showTimeSelect
              dateFormat="Pp"
              className="form-input bg-[#3a3c3b] border border-white rounded py-1.5 px-1 text-[12px] mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="request">Special Request:</label>
            <textarea
              name="request"
              id="request"
              className="text-white bg-[#3a3c3b] border border-white rounded py-1.5 px-1 text-[12px] mt-2"
              rows="10"
              cols="50"
              value={request}
              onChange={(event) => setRequest(event.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <button
            type="submit"
            className="py-1 px-7 text-[#ebebeb] font-bold bg-[#7d4e84] rounded hover:text-[#7d4e84] hover:bg-[#ebebeb]"
          >
            <span>Proceed</span>
          </button>
        )}
      </form>
    </>
  );
};

export default Reservation;

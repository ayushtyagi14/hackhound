import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = {
      name: name,
      email: email,
      subject: subject,
      feedback: feedback,
      stars: stars,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://gravity-grills-backend.onrender.com/api/giveFeedback",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        const data = JSON.parse(result);
        console.log("DATA", data);
        setLoading(false);
        if (data.resCode === 200) {
          toast.success("Feeback Submitted Succesfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          localStorage.setItem("menuItem", JSON.stringify(data.menu));
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

  return (
    <>
      <h1 className="text-[40px] text-center font-vollkron font-bold mb-3">
        Give Your Feedback!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg w-[90%] mx-auto p-5 h-[90vh] flex flex-col justify-between mb-10"
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
              <label htmlFor="number">Subject:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between items-center mx-8 mt-4">
              <label htmlFor="people">Number of Stars: ⭐</label>
              <input
                type="number"
                name="people"
                id="people"
                className="bg-[#3a3c3b] border border-white ml-3 rounded py-1.5 px-1 text-[12px]"
                value={stars}
                onChange={(event) => setStars(event.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <label htmlFor="request">Feedback:</label>
            <textarea
              name="request"
              id="request"
              className="text-white bg-[#3a3c3b] border border-white rounded py-1.5 px-1 text-[12px] mt-2"
              rows="10"
              cols="50"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
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
            <span>Submit</span>
          </button>
        )}
      </form>
    </>
  );
};

export default Feedback;

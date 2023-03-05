import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Menu = ({ onTabClick }) => {
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem("menuItem"));
    if (storedMenu) {
      setMenu(storedMenu);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const requestBody = {
      userId,
      order: selectedItems,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    fetch("https://gravity-grills-backend.onrender.com/api/orderedFood", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        const data = JSON.parse(result);
        console.log("DATA", data);
        setLoading(false);
        if (data.resCode === 200) {
          toast.success("Food Ordered Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          localStorage.setItem("orderSummary", JSON.stringify(data.details));
          handleTabClick("Summary");
        } else {
          toast.error(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      });
  };

  const handleTabClick = (tab) => {
    console.log("Clicked on tab:", tab);
    onTabClick(tab);
  };

  return (
    <div className="mb-8">
      <h1 className="text-[40px] font-vollkron font-bold text-center mb-4">
        MENU
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2">
        {menu.map((item) => (
          <div key={item._id} className="flex flex-row items-center">
            <label>
              <input
                type="checkbox"
                value={item._id}
                onChange={handleCheckboxChange}
              />
            </label>
            <div className="flex flex-col items-center border rounded-lg shadow-xl p-3 mx-10 w-full h-[250px] mb-10">
              <div className="overflow-hidden">
                <img
                  src={item.dishImgLink}
                  alt="food-item"
                  height={250}
                  width={250}
                />
              </div>
              <div className="flex flex-col items-center justify-between pb-2">
                <div className="flex flex-row items-center mt-2">
                  <h1 className="capitalize font-bold">{item.dishName}</h1>
                  <h1 className="ml-10">${item.dishPrice}</h1>
                </div>
                <p className="text-[14px] text-center">{item.dishDesc}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <button
              type="submit"
              className="py-1 px-7 text-[#ebebeb] font-bold bg-[#7d4e84] rounded hover:text-[#7d4e84] hover:bg-[#ebebeb] mx-auto"
            >
              <span>Submit</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Menu;

// return (
//   <>
//     <h1 className="text-[40px] font-vollkron font-bold text-center mb-4">
//       MENU
//     </h1>
//     <div className="grid grid-cols-2">
//       {menu.length > 0 &&
//         menu.map((item, index) => (
//           <>
//             <div className="flex flex-row items-center">
//               <input type="checkbox" name="food" id="food" />
//               <div
//                 className="flex flex-col items-center border rounded-lg shadow-xl p-3 mx-10 w-full h-[250px] mb-10"
//                 key={index}
//               >
//                 <div className="overflow-hidden">
//                   <img
//                     src={item.dishImgLink}
//                     alt="food-item"
//                     height={250}
//                     width={250}
//                   />
//                 </div>
//                 <div className="flex flex-col items-center justify-between pb-2">
//                   <div className="flex flex-row items-center mt-2">
//                     <h1 className="capitalize font-bold">{item.dishName}</h1>
//                     <h1 className="ml-10">₹{item.dishPrice}</h1>
//                   </div>
//                   <p className="text-[14px] text-center">{item.dishDesc}</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         ))}
//     </div>
//   </>
// );

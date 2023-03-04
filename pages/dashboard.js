import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Reservation from './components/Reservation';
import Feedback from './components/Feedback';
import Profile from './components/Profile';
import Menu from './components/Menu';

const dashboard = () => {
    const [activeTab, setActiveTab] = useState("");

    const handleTabClick = (tab) => {
        console.log("Updating active tab:", tab);
        setActiveTab(tab);
    };

    const renderPage = () => {
        console.log("Rendering page for active tab:", activeTab);
        if (activeTab === "Reservation") {
            return <Reservation onTabClick={handleTabClick} />;
        } else if (activeTab === "Feedback") {
            return <Feedback />;
        } else if (activeTab === "Profile") {
            return <Profile />;
        } else if (activeTab === "Menu") {
            return <Menu />;
        } else {
            return <Profile />;
        }
    };

    return (
        <>
            <div className="flex">
                <Sidebar onTabClick={handleTabClick} />
                <main
                    className="flex-grow ml-[17rem] mt-4 transition-all duration-300 ease-in-out text-[#ebebeb]"
                >
                    {renderPage()}
                </main>
            </div>
        </>
    )
}

export default dashboard

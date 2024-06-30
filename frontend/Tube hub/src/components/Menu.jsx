import React, { useState } from "react";
import "./menu.css";
import Logo from "./../assets/LOGO.jpg";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import HistoryIcon from "@mui/icons-material/History";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components";

function Menu({ darkMode, setDarkMode }) {
  const Container = styled.div`
    flex: 1;
    color: ${({ theme }) => theme.text};
    height: 100vh;
    background-color: ${({ theme }) => theme.bgLighter};
    font-size: 14px;
    position: sticky;
    top: 0;
  `;

  const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
  `;
  return (
    <Container>
      <div className=" px-4 py-6 ">
        <div className=" flex items-center gap-1 font-bold mb-7 text-2xl">
          <div className=" ">
            <img src={Logo} alt="" className="h-7" />
          </div>
          Tube
        </div>

        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <HomeIcon />
          Home
        </div>

        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <ExploreIcon />
          Explore
        </div>

        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <SubscriptionsIcon />
          Subsciription
        </div>

        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <LibraryAddIcon />
          Library
        </div>
        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <HistoryIcon />
          History
        </div>
        <Hr />
        <div className=" px-1 font-bold text-base">
          Sign in to like videos , comment and subscribe
          <div>
            <button className=" px-4 py-1 bg-transparent border-2 border-solid border-blue-600 text-blue-600 border-r-3 font-bold my-2 flex gap-2 items-center rounded-xl">
              {" "}
              <AccountCircleOutlinedIcon />
              Sign in
            </button>
          </div>
        </div>

        <Hr />

        <div className=" flex items-center gap-4 cursor-pointer px-1 py-2">
          <SettingsIcon />
          Settings
        </div>
        <div
          className=" flex items-center gap-4 cursor-pointer px-1 py-2"
          onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          Light-Mode
        </div>
      </div>
    </Container>
  );
}

export default Menu;

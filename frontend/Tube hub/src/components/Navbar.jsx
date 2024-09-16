import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOulinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  margin-bottom:30px;
`;

const Wrapper = styled.div`
  margin-top:10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width:40%;
  position:absolute;
  left:0px;
  right:0px;
  margin:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:5px;
  border:1px solid #ccc;
  border-radius:20px;
`;

const Input = styled.input`
  padding:6px;
  width:630px;
  border:none;
  // border:2px solid white;
  background-color: transparent;

`;


const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Navbar() {

  const {currentUser} = useSelector(state=>state.user)
  // console.log(currentUser.user.username);

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" className=" focus:outline-none focus:border-none"/>
          <SearchOulinedIcon />
        </Search>
        <div>
          {currentUser ? (
            
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.avatar} />
              {/* {currentUser.user.username} */}
          </User>
          ) : (
             <Link to="register" style={{textDecoration:"none"}}>
          <button className=" px-4 py-1 bg-transparent border-2 border-solid border-blue-600 text-blue-600 border-r-3 font-bold flex gap-2 items-center rounded-xl">
            <AccountCircleOutlinedIcon />
            Sign in
          </button>
          </Link>
        )}
        </div>
      </Wrapper>
    </Container>
  );
}

export default Navbar;

import React from 'react'
import styled from "styled-components";
import Logo from "../assets/LOGO.jpg"

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
`;

const Details = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  color:${({theme})=>theme.text};

`;

const Name = styled.span`
  font-size:13px;
  font-weight:500px;
`;

const Date = styled.span`
  font-size:12px;
  font-weight:400;
  color:${({theme})=>theme.textSoft};
  margin-left:5px;
`;

const Text = styled.span`
  font-size:14px;
`;


function Comment() {
  return (
    <Container>
      <Avatar src={Logo}/>
      <Details>
        <Name>John Doe <Date> 1 day ago</Date></Name>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum deleniti corrupti labore vitae beatae placeat dolore obcaecati ex molestias magnam!</Text>
      </Details>
    </Container>
  )
}

export default Comment
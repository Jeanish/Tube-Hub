import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from "./../assets/LOGO.jpg";
import {Link }from "react-router-dom";
import {format} from "timeago.js";
import axios from "axios"
import { BASE_URL } from '../constants/config';

const Conatiner = styled.div`
  width:${(props)=>props.type !== "sm" && "360px"};
  margin-bottom:${(props)=>props.type === "sm" ? "10px" : "45px"};
  cursor:pointer;
  display:${(props)=>props.type === "sm" && "flex"};
  `;

const Image = styled.img`
  width:100%;
  height:${(props)=>props.type === "sm"  ? "120px" : "202px"};
  object-fit:cover;
  background-color:#999;
  flex:1;
`;

const Detail = styled.div`
  display:flex;
  margin-top:${(props)=>props.type !== "sm" && "16px"};
  gap:12px;
  flex:1;
  `;

const ChannelImage = styled.img`
  width:36px;
  height:36px;
  border-radius:50%;
  background-color:#999;
  display:${(props)=>props.type === "sm" && "none"};

  `;

  const Texts = styled.div`
  `;
  const Title = styled.h1`
    font-size:16px;
    font-weight:500;
    color:${({theme})=>theme.text};
  `;
  const Channelname = styled.h2`
    font-size:14px;
    color:${({theme})=>theme.textSoft};
    
  `;

  const Info = styled.div`
    font-size:14px;
    color:${({theme})=>theme.textSoft};
  `;


const Card = ({type,video,title}) => {
  
  const [channel,setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async() => {

      const url = `${BASE_URL}/users/find/${video.owner}`
      console.log(url);
      
      const res = await axios.get(url);

      console.log(res);
      console.log(res.data.data);
      setChannel(res.data.data);
    };
    fetchChannel();
  // onsole.log("vhn");
    
    console.log(channel);
    // console.log./(video.owner);
    console.log("vhn ");
    // console.log("video id is :- "+video._id);
    // console.log("video owner name "+ channel);
  },[video.owner]);

  return (
    // {`/video/${video.video}`}
    <Link to={`/videos/${video._id}`} style={{textDecoration:"none"}}>
    <Conatiner type={type}>
      <Image type={type} src={video.thumbnail}/>
      <Detail type={type}>
        <ChannelImage type={type} src={channel?.avatar} />
        <Texts >
          <Title>{video.title}</Title>
          <Channelname> {channel ? channel.username : "Unknown"}</Channelname>
          <Info>{video.views} views - {format(video.createdAt)}</Info>
        </Texts>
      </Detail>
    </Conatiner>
    </Link>
  )
}

export default Card
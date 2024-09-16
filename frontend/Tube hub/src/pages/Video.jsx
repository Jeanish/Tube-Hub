import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Logo from "../assets/LOGO.jpg";
import Comments from "../components/Comments.jsx";
import Card from "../components/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/config.js";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice.js";
import { format } from "timeago.js";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display:flex;
  gap:20;
`;
const Image = styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
`;

const ChannelDetail = styled.div`
display:flex;
flex-direction:column;
color:${({theme})=>theme.text};
`;

const ChannelName = styled.div`
font-weight:500`;

const ChannelCounter = styled.span`
  margin-top:5px;
  margin-bottom:20px;
  color:${({theme})=>theme.textSoft};

`;

const Description = styled.p`
  font-size:14px;
`;

const Subscribe = styled.button`

  background-color:red;
  font-weight:500;
  color:white;
  border:none;
  border-radius:3px;
  height:max-content;
  padding:10px 20px;
  cursor:pointer;

`;

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  // console.log(path);
  // const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem('accessToken');
        // console.log(token);
                
        const url = `${BASE_URL}/videos/${path}`;
                const videoRes = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    // withCredentials: true
                });

                console.log(videoRes);
                console.log("Full video response from video page:"); // Log full response

                if (videoRes.status === 200 && videoRes.data) {
                    console.log("Owner field:", videoRes.data.data.owner); // Log owner field

                    const channelUrl = `${BASE_URL}/users/find/${videoRes.data.data.owner}`;
                    const channelRes = await axios.get(channelUrl);

                    setChannel(channelRes.data);

                    dispatch(fetchSuccess(videoRes.data));
                } else {
                    console.error("Invalid video response", videoRes);
                }
            } catch (err) {
                console.error("Error fetching data", err);
                // setError("Error fetching data");
            }
    };
    fetchData();
  }, [path],dispatch);

  
  if (!channel) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }
  console.log("current video is : ");
  console.log(currentVideo);
  
  // console.log(currentUser);
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src={`${currentVideo.data.video}`}
            title="Youtube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.data.title}</Title>
        <Details>
          <Info>{currentVideo.data.views} views - {format(currentVideo.data.createdAt)}</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> 123
            </Button>
            <Button>
              
              <ThumbDownOffAltOutlinedIcon /> DisLike
            </Button>
            <Button>
              
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
            
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
              <Image src = {Logo}/>
            <ChannelDetail>
              <ChannelName>{currentUser.user.username}</ChannelName>
              <ChannelName>200K subscribber</ChannelName>
              <Description>
                {currentVideo.data.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr/>
        <Comments/>
      </Content>
      {/* <Recommendation>
        <Card type="sm"/>

      </Recommendation> */}
    </Container>
  );
}

export default Video;

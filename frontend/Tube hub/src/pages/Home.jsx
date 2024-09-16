import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import styled from 'styled-components'
import axios from "axios"
import { BASE_URL } from '../constants/config'


const Conatiner = styled.div`
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
`;

const Home = ({type}) => {

  const [videos,setVideos] = useState([]);

  useEffect(()=>{
    const fetchVideo = async () => {
      try {
        const url = `${BASE_URL}/videos/${type}`; // Replace with your exact API endpoint

        // Assuming your proxy target URL is http://localhost:8000
        const res = await axios.get(url);        // const user = await axios.get("http://localhost:8000/api/v1/videos/")
        // const data = await res.json();
        setVideos(res.data.data);
        console.log(res.data.data);

      } catch (error) { 
        if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
}
    fetchVideo()
  },[type]) 

  return (
    <Conatiner>
         {videos.length > 0 ? (
          videos.map((video) => (
          <Card key={video._id} video={video} />
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </Conatiner>
  )
}

export default Home
import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../utils/Theme'
import styled  from 'styled-components'
import {BrowserRouter , Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login';
import Video from './pages/Video';
import SignInPage from './pages/Register';

function App() {

  const Main = styled.div`
  background-color:${({theme})=>theme.bg};
  flex:7;
  color:${({theme})=>theme.text};
`;

  const Wrapper = styled.div``;

  const [darkMode,setDarkMode] = useState(true)

  return (
    
  <ThemeProvider theme={darkMode ? darkTheme:lightTheme}>
    
     <div id='Container' className=' flex'>
      <BrowserRouter>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Main>
        <Navbar/>
        <Wrapper>
          <Routes>
            <Route path="/">
              <Route index element={<Home type="explore"/>}/>
              <Route path='explore' element={<Home type="explore"/>}/>
              {/* <Route path="register" element={<SignIn/>}/> */}
              
              <Route path="register" element={<SignInPage/>}/>
              <Route path="login" element={<Login/>}/>
              {/* <Route path="videos/:id" element={<Video />} /> */}
              <Route path="videos">
               <Route path=":id" element={<Video/>}/>
              </Route>
            </Route>
          </Routes>
        </Wrapper>
      </Main>
      </BrowserRouter>
     </div>
     </ThemeProvider>
  
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../utils/Theme'
import styled  from 'styled-components'
import {BrowserRouter , Routes,Route } from "react-router-dom"
// import {Home} from './pages/Home'
// import Video from './pages/video';

function App() {

  const Main = styled.div`
  background-color:${({theme})=>theme.bg};
  flex:7;
  color:${({theme})=>theme.text};
  `;

  const Wrapper = styled.div`
  
  `;

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
              <Route index element={Home}/>
              <Route path="video">
               <Route path=":id" element={Video}/>
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

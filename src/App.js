
import * as React from 'react';
import Home from './pages/Home'
import Nav from './component/Nav'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Filter from './pages/Filter';
import Div from './pages/Div';
import Message from './pages/Messages'
import Layout from './component/Layout'
function App() {
  
  return (
  <>

{/* <Nav/> */}
    {/* <Home/> */}
    <Routes>
        <Route path="/" element={<Lay />}>
        <Route index element={<Home />}/>
        <Route path="filter" element={<Filter />} />
        <Route path="div" element={<Div />} />
        <Route path="message" element={<Message />} />

        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
    
  );
}
function NotFound() {
  return (
    <h1>
      NotFound
    </h1>
  )
}

export default App;
function Lay(){
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}
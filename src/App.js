import React, { Suspense } from "react";
// import Home from "./pages/Home";
import Nav from "./component/Nav";
import { Routes, Route, Outlet } from "react-router-dom";
// import Filter from "./pages/Filter";
// import Div from "./pages/Div";
// import Message from "./pages/Messages";
import Loading from "./pages/Loading";
const Message = React.lazy(() => import('./pages/Messages'));
const Home = React.lazy(() => import('./pages/Home'));
const Filter = React.lazy(() => import('./pages/Filter'));
const Div = React.lazy(() => import('./pages/Div'));

function App() {
  return (
    <>
    <Lay />
    
      <Suspense
        fallback={
          <Loading/>
        }
      >

      <Routes>
        {/* <Route path="/" element={<Lay />}> */}
          <Route index element={<Home />} />
          <Route path="filter" element={<Filter />} />
          <Route path="div" element={<Div />} />
          <Route path="message" element={<Message />} />
          <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
      </Suspense>
    </>
  );
}
function NotFound() {
  return <h1>NotFound</h1>;
}

export default App;
function Lay() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

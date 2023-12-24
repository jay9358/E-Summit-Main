import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Preloader from "./components/Preloader/Preloader";

import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 7000);
    
    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loader ? <Preloader /> :
       <>
      <Navbar></Navbar>
      <LandingPage/>
      <About></About>
      </>
  }
    </>
  );
}

export default App;

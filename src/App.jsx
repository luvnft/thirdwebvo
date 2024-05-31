import "./index.css";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";

import {
  ThirdwebProvider
} from "thirdweb/react";

function App() {
  return (
    <ThirdwebProvider>
      <div className="bg-black h-screen">
      <Navbar />
      <Content/>
      <Footer/>
    </div>
    </ThirdwebProvider>
  );
}

export default App;

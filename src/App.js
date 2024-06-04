import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Assuming you have a CSS file for your app styles
import PricingSection from "./components/card"; // Adjust the path according to your directory structure
import BankForm from "./components/bankerregister"; // Adjust the path according to your directory structure
import DSARegistrationForm from "./components/dsaregister";
import ChannelForm from "./components/channelpartner";
import DisplayData from "./components/displaydata"; // Import the DisplayData component
import Navbar from "./components/navbar"; // Import the Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PricingSection />} />
          <Route path="/register-banker" element={<BankForm />} />
          <Route path="/register-dsa" element={<DSARegistrationForm />} />
          <Route path="/register-channel-partner" element={<ChannelForm />} />
          <Route
            path="/display-bankers"
            element={<DisplayData type="bankers" />}
          />
          <Route path="/display-dsas" element={<DisplayData type="dsas" />} />
          <Route
            path="/display-channelpartners"
            element={<DisplayData type="channelpartners" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

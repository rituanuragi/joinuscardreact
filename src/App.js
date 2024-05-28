import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Assuming you have a CSS file for your app styles
import PricingSection from "./components/card"; // Adjust the path according to your directory structure
import BankForm from "./components/bankerregister"; // Adjust the path according to your directory structure
import DSARegistrationForm from "./components/dsaregister";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Add any other components or content here */}
        <Routes>
          <Route path="/" element={<PricingSection />} />
          <Route path="/" element={<DSARegistrationForm />} />

          <Route path="/register-banker" element={<BankForm />} />
          <Route path="/register-dsa" element={<DSARegistrationForm />} />
          <Route path="/register-channel-partner" element={<BankForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

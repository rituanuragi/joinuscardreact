import React from "react";
import "./App.css"; // Assuming you have a CSS file for your app styles
import PricingSection from "./components/card"; // Adjust the path according to your directory structure
// import BankForm from "./components/registerdsa";

function App() {
  return (
    <div className="App">
      {/* Add any other components or content here */}
      <PricingSection />
      {/* <BankForm /> */}
    </div>
  );
}

export default App;

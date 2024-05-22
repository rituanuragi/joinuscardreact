import React, { useState } from "react";

const BankForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    bank: "",
    otherBankName: "",
    post: "",
    state: "",
    city: "",
    email: "",
    otp: "",
    contact: "",
    whatsapp: "",
    products: [],
  });

  const [showOtherBank, setShowOtherBank] = useState(false);
  const [sameAsContact, setSameAsContact] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "sameAsContact") {
        setSameAsContact(checked);
        if (checked) {
          setFormData({ ...formData, whatsapp: formData.contact });
        } else {
          setFormData({ ...formData, whatsapp: "" });
        }
      } else {
        const newProducts = checked
          ? [...formData.products, value]
          : formData.products.filter((product) => product !== value);
        setFormData({ ...formData, products: newProducts });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtpClick = () => {
    fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((response) => {
        if (response.ok) {
          setOtpSent(true);
          alert("OTP sent to your email. Please check your inbox.");
        } else {
          alert("Failed to send OTP email. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: "center" }}>Fill Your Details</h2>
        <form id="bankForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bank">
              Please Mention Where Are you Currently Associated
              (Bank/NBFC/Fintech)
            </label>
            <select
              className="form-control"
              id="bank"
              name="bank"
              value={formData.bank}
              onChange={(e) => {
                handleChange(e);
                setShowOtherBank(e.target.value === "Other");
              }}
            >
              {/* Add all the bank options here */}
              <option>ADITYA BIRLA</option>
              <option>AXIS</option>
              <option>BAJAJ FINANCE</option>
              <option>BAJAJ MARKET</option>
              <option>BAJAJ SALPL</option>
              <option>Bank of Baroda</option>
              <option>Bank of India</option>
              <option>Canara Bank</option>
              <option>CHOLA MANDALAM</option>
              <option>Federal Bank</option>
              <option>FINNABLE</option>
              <option>FULLERTON</option>
              <option>GODREJ</option>
              <option>HDFC Bank</option>
              <option>HERO FINCORP</option>
              <option>ICICI</option>
              <option>ICICI EDUCATION LOAN</option>
              <option>IDBI Bank</option>
              <option>IDFC</option>
              <option>INCRED</option>
              <option>IndusInd</option>
              <option>Kotak Mahindra Bank</option>
              <option>L&T</option>
              <option>LENDING KART</option>
              <option>PAYSENSE</option>
              <option>Punjab National Bank (PNB)</option>
              <option>RBL Bank</option>
              <option>SBI</option>
              <option>Standard Chartered Bank</option>
              <option>TATA CAPITAL</option>
              <option>Union Bank of India</option>
              <option>UPWARD</option>
              <option>YES BANK</option>
              <option>Other</option>
            </select>
          </div>
          {showOtherBank && (
            <div className="form-group">
              <label htmlFor="otherBankName">
                Please specify Your Currently Associated Bank/NBFC/Fintech
              </label>
              <input
                type="text"
                className="form-control"
                id="otherBankName"
                name="otherBankName"
                value={formData.otherBankName}
                onChange={handleChange}
                placeholder="Your Currently Associated Bank/NBFC/Fintech"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="post">Your Post in Bank</label>
            <input
              type="text"
              className="form-control"
              id="post"
              name="post"
              value={formData.post}
              onChange={handleChange}
              placeholder="Enter your post"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">In which state you work/reside</label>
            <select
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              {/* Add all the state options here */}
              <option value="" disabled selected>
                Select your state
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">In which city you work/reside</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="product">
              Which Product Do you Take Care For Your Lenders?
            </label>
            <div className="dropdown-checkboxes">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Select Product
              </button>
              <div
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                {/* Add all the product checkboxes here */}
                <div>
                  <input
                    type="checkbox"
                    id="homeLoan"
                    name="product"
                    value="Home Loan"
                    checked={formData.products.includes("Home Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="homeLoan">Home Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="homeLoanAffordable"
                    name="product"
                    value="Home Loan Affordable"
                    checked={formData.products.includes("Home Loan Affordable")}
                    onChange={handleChange}
                  />
                  <label htmlFor="homeLoanAffordable">
                    Home Loan Affordable
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="lap"
                    name="product"
                    value="LAP"
                    checked={formData.products.includes("LAP")}
                    onChange={handleChange}
                  />
                  <label htmlFor="lap">LAP</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="businessLoan"
                    name="product"
                    value="Business Loan"
                    checked={formData.products.includes("Business Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="businessLoan">Business Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="personalLoan"
                    name="product"
                    value="Personal Loan"
                    checked={formData.products.includes("Personal Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="personalLoan">Personal Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="carLoan"
                    name="product"
                    value="Car Loan"
                    checked={formData.products.includes("Car Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="carLoan">Car Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="doctorLoan"
                    name="product"
                    value="Doctor Loan"
                    checked={formData.products.includes("Doctor Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="doctorLoan">Doctor Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="professionalLoan"
                    name="product"
                    value="Professional Loan"
                    checked={formData.products.includes("Professional Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="professionalLoan">Professional Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="educationLoan"
                    name="product"
                    value="Education Loan"
                    checked={formData.products.includes("Education Loan")}
                    onChange={handleChange}
                  />
                  <label htmlFor="educationLoan">Education Loan</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="financeLiteracyProgramme"
                    name="product"
                    value="Customer Durable(CD)"
                    checked={formData.products.includes("Customer Durable(CD)")}
                    onChange={handleChange}
                  />
                  <label htmlFor="financeLiteracyProgramme">
                    Customer Durable(CD)
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="leaseRentalDiscounting"
                    name="product"
                    value="Lease Rental Discounting (LRD)"
                    checked={formData.products.includes(
                      "Lease Rental Discounting (LRD)"
                    )}
                    onChange={handleChange}
                  />
                  <label htmlFor="leaseRentalDiscounting">
                    Lease Rental Discounting (LRD)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="otp">Get OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
            />
            <button
              type="button"
              className="btn btn-primary"
              id="getOTPBtn"
              onClick={handleOtpClick}
            >
              Get OTP
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="sameAsContact"
              name="sameAsContact"
              checked={sameAsContact}
              onChange={handleChange}
            />
            <label htmlFor="sameAsContact">
              WhatsApp number is the same as contact number
            </label>
          </div>
          {!sameAsContact && (
            <div className="form-group" id="whatsappGroup">
              <label htmlFor="whatsapp">WhatsApp Number</label>
              <input
                type="text"
                className="form-control"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Enter your WhatsApp number"
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankForm;

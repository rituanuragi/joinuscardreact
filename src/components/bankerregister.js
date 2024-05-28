import React, { useState, useEffect, useRef } from "react";
import "../style/registerdsa.css";

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

  const dropdownRef = useRef(null);

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
    fetch("http://15.207.26.255:5000/send-otp", {
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

    fetch("http://15.207.26.255:5000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully.");
        } else {
          alert("Failed to submit form. Please check the OTP and try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <option value="" disabled>
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
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
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
          <div className="form-group" ref={dropdownRef}>
            <label htmlFor="dropdown">
              Which Product Do you Take Care For Your Lenders?
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                onClick={handleDropdownClick}
              >
                Select Products
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu show">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product1"
                      name="products"
                      value="Home Loan"
                      checked={formData.products.includes("Home Loan")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product1">
                      Home Loan
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product2"
                      name="products"
                      value="Personal Loan"
                      checked={formData.products.includes("Personal Loan")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product2">
                      Personal Loan
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product3"
                      name="products"
                      value="Credit Card"
                      checked={formData.products.includes("Credit Card")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product3">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product4"
                      name="products"
                      value="Savings Account"
                      checked={formData.products.includes("Savings Account")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product4">
                      Savings Account
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product5"
                      name="products"
                      value="Fixed Deposit"
                      checked={formData.products.includes("Fixed Deposit")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product5">
                      Fixed Deposit
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOtpClick}
            disabled={otpSent}
          >
            Send OTP
          </button>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the OTP"
            />
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
            <label htmlFor="whatsapp">WhatsApp Number</label>
            <input
              type="text"
              className="form-control"
              id="whatsapp"
              name="whatsapp"
              value={sameAsContact ? formData.contact : formData.whatsapp}
              onChange={handleChange}
              placeholder="Enter your WhatsApp number"
              disabled={sameAsContact}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsContact"
              name="sameAsContact"
              checked={sameAsContact}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="sameAsContact">
              Same as Contact Number
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankForm;

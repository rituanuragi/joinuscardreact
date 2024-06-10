import React, { useState, useEffect, useRef } from "react";

const ChannelForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    otp: "",
    state: "",
    city: "",
    workStatus: "",
    customWorkStatus: "",
    officeArea: "",
    processCustomerLoans: [],
    teamMembers: "",
    products: [],
    disbursements: {},
    contact: "",
    whatsapp: "",
    paymentMode: "",
    upiId: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
  });

  const [showOtherBank, setShowOtherBank] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sameAsContact, setSameAsContact] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
      }
      if (name === "processCustomerLoans") {
        setFormData((prevData) => ({
          ...prevData,
          processCustomerLoans: checked
            ? [...prevData.processCustomerLoans, value]
            : prevData.processCustomerLoans.filter((loan) => loan !== value),
        }));
      } else if (name === "products") {
        const newProducts = checked
          ? [...formData.products, value]
          : formData.products.filter((product) => product !== value);
        setFormData((prevData) => ({
          ...prevData,
          products: newProducts,
        }));
      }
    } else if (name.startsWith("disbursement_")) {
      const product = name.split("_")[1];
      setFormData((prevData) => ({
        ...prevData,
        disbursements: {
          ...prevData.disbursements,
          [product]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://35.154.194.202:5000/submitchannelpartner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Submitted Successfully");
      });
  };

  const handleOtpClick = () => {
    fetch("http://35.154.194.202:5000/send-otp", {
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

  const renderDisbursementInputs = () => {
    return formData.products.map((product) => (
      <div key={product} className="form-group">
        <label htmlFor={`disbursement_${product}`}>
          {`What Is Your Approx ${product} Disbursement?`}
        </label>
        <input
          type="text"
          className="form-control"
          id={`disbursement_${product}`}
          name={`disbursement_${product}`}
          placeholder={`Enter ${product} Disbursement`}
          value={formData.disbursements[product] || ""}
          onChange={handleChange}
        />
      </div>
    ));
  };

  const handleWorkStatusChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      workStatus: value,
      customWorkStatus: value === "Other" ? "" : formData.customWorkStatus,
    });
  };

  const handleCustomWorkStatusChange = (e) => {
    setFormData({
      ...formData,
      customWorkStatus: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2 className="text-center">Channel Partner Registration</h2>
        <form id="dsaRegistrationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
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
            <label htmlFor="state">In Which State You Work/Reside</label>
            <select
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Your State
              </option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli and Daman and Diu",
                "Lakshadweep",
                "Delhi",
                "Puducherry",
                "Ladakh",
                "Jammu and Kashmir",
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="Enter your City"
              value={formData.city}
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="city">Enter Your Current Office Address</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="Enter your Office Address"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Profession Of Channel Partner</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="workStatus_CA"
                name="workStatus"
                value="CA"
                checked={formData.workStatus === "CA"}
                onChange={handleWorkStatusChange}
              />
              <label className="form-check-label" htmlFor="workStatus_CA">
                CA
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="workStatus_Real Estate Agent"
                name="workStatus"
                value="Real Estate Agent"
                checked={formData.workStatus === "Real Estate Agent"}
                onChange={handleWorkStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor="workStatus_Real Estate Agent"
              >
                Real Estate Agent
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="workStatus_freelancer"
                name="workStatus"
                value="Financial Advisor"
                checked={formData.workStatus === "Financial Advisor"}
                onChange={handleWorkStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor="workStatus_freelancer"
              >
                Financial Advisor
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="workStatus_freelancer"
                name="workStatus"
                value="Medical Equipment Distributor"
                checked={
                  formData.workStatus === "Medical Equipment Distributor"
                }
                onChange={handleWorkStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor="workStatus_freelancer"
              >
                Medical Equipment Distributor
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="workStatus_other"
                name="workStatus"
                value="Other"
                checked={formData.workStatus === "Other"}
                onChange={handleWorkStatusChange}
              />
              <label className="form-check-label" htmlFor="workStatus_other">
                Other
              </label>
              {formData.workStatus === "Other" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  name="customWorkStatus"
                  placeholder="Please specify"
                  value={formData.customWorkStatus}
                  onChange={handleCustomWorkStatusChange}
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>What Is Your Employment Type?</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_salaried"
                name="processCustomerLoans"
                value="Salaried"
                checked={formData.processCustomerLoans.includes("Salaried")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_salaried"
              >
                Salaried
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_freelancer"
                name="processCustomerLoans"
                value="Freelancer"
                checked={formData.processCustomerLoans.includes("Freelancer")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_freelancer"
              >
                Freelancer
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_student"
                name="processCustomerLoans"
                value="Student"
                checked={formData.processCustomerLoans.includes("Student")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_student"
              >
                Student
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_broker"
                name="processCustomerLoans"
                value="Broker"
                checked={formData.processCustomerLoans.includes("Broker")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_broker"
              >
                Broker
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_businessLoan"
                name="processCustomerLoans"
                value="Business Loan"
                checked={formData.processCustomerLoans.includes(
                  "Business Loan"
                )}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_businessLoan"
              >
                Running My Own Business
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="processCustomerLoans_other"
                name="processCustomerLoans"
                value="Other"
                checked={formData.processCustomerLoans.includes("Other")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="processCustomerLoans_other"
              >
                Other
              </label>
              {formData.processCustomerLoans.includes("Other") && (
                <input
                  type="text"
                  className="form-control mt-2"
                  name="customCustomerLoans"
                  placeholder="Please specify"
                  value={formData.customCustomerLoans || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="teamMembers">
              If You Have A Team, How Many Members Are There?
            </label>
            <input
              type="number"
              className="form-control"
              id="teamMembers"
              name="teamMembers"
              placeholder="Enter No. of Team Members"
              value={formData.teamMembers}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Products You Deal With</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_personal"
                name="products"
                value="Personal Loan"
                checked={formData.products.includes("Personal Loan")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="products_personal">
                Personal Loan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_business"
                name="products"
                value="Business Loan"
                checked={formData.products.includes("Business Loan")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="products_business">
                Business Loan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_home"
                name="products"
                value="Home Loan"
                checked={formData.products.includes("Home Loan")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="products_home">
                Home Loan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_professional_doctors"
                name="products"
                value="Professional Loan For Doctors"
                checked={formData.products.includes(
                  "Professional Loan For Doctors"
                )}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_professional_doctors"
              >
                Professional Loan For Doctors
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_professional_ca"
                name="products"
                value="Professional Loan For CA"
                checked={formData.products.includes("Professional Loan For CA")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_professional_ca"
              >
                Professional Loan For CA
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_lap"
                name="products"
                value="Loan Against Property"
                checked={formData.products.includes("Loan Against Property")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="products_lap">
                Loan Against Property (LAP)
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_medical_equipment"
                name="products"
                value="Medical Equipment Loan"
                checked={formData.products.includes("Medical Equipment Loan")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_medical_equipment"
              >
                Medical Equipment Loan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_machinery"
                name="products"
                value="Machinery Loan"
                checked={formData.products.includes("Machinery Loan")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="products_machinery">
                Machinery Loan
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_project_financing"
                name="products"
                value="Project Financing"
                checked={formData.products.includes("Project Financing")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_project_financing"
              >
                Project Financing
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_general_insurance"
                name="products"
                value="General Insurance"
                checked={formData.products.includes("General Insurance")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_general_insurance"
              >
                General Insurance
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_life_insurance"
                name="products"
                value="Life Insurance"
                checked={formData.products.includes("Life Insurance")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_life_insurance"
              >
                Life Insurance
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="products_auto_insurance"
                name="products"
                value="Auto Insurance"
                checked={formData.products.includes("Auto Insurance")}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="products_auto_insurance"
              >
                Auto Insurance
              </label>
            </div>
          </div>

          {renderDisbursementInputs()}
          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              placeholder="Enter your Contact Number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
                Same As Contact Number
              </label>
            </div>
            <label htmlFor="whatsapp">Whatsapp Number</label>
            <input
              type="text"
              className="form-control"
              id="whatsapp"
              name="whatsapp"
              placeholder="Enter your WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
              disabled={sameAsContact}
            />
          </div>

          <div className="form-group">
            <label>Preferred Mode Of Payment</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="paymentMode_upi"
                name="paymentMode"
                value="UPI"
                checked={formData.paymentMode === "UPI"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="paymentMode_upi">
                UPI
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="paymentMode_cheque"
                name="paymentMode"
                value="Cheque"
                checked={formData.paymentMode === "Cheque"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="paymentMode_cheque">
                Cheque
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="paymentMode_directBankTransfer"
                name="paymentMode"
                value="DirectBankTransfer"
                checked={formData.paymentMode === "DirectBankTransfer"}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="paymentMode_directBankTransfer"
              >
                Direct Bank Transfer
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="paymentMode_cash"
                name="paymentMode"
                value="Cash"
                checked={formData.paymentMode === "Cash"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="paymentMode_cash">
                Cash
              </label>
            </div>
          </div>

          {formData.paymentMode === "UPI" && (
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                className="form-control"
                id="upiId"
                name="upiId"
                placeholder="Enter your UPI ID"
                value={formData.upiId}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.paymentMode === "DirectBankTransfer" && (
            <>
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Enter your Account Number"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountHolderName">Account Holder Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="accountHolderName"
                  name="accountHolderName"
                  placeholder="Enter Account Holder Name"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ifscCode">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="ifscCode"
                  name="ifscCode"
                  placeholder="Enter IFSC Code"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bankName">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bankName"
                  placeholder="Enter Bank Name"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChannelForm;

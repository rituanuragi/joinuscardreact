import React, { useState, useEffect, useRef } from "react";

const DSARegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    state: "",
    city: "",
    workStatus: "",
    officeArea: "",
    processCustomerLoans: [],
    teamMembers: "",
    products: [],
    disbursements: {}, // Updated this to store disbursement amounts for each product

    professionalLoanOptions: {
      doctor: false,
      ca: false,
      cs: false,
      cwa: false,
    },
    whatsappNumber: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
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
          professionalLoanOptions: {
            doctor: false,
            ca: false,
            cs: false,
            cwa: false,
          }, // Reset professional loan options when changing products
        }));
      } else if (name.startsWith("professionalLoanOption")) {
        const option = name.split("_")[1];
        setFormData((prevData) => ({
          ...prevData,
          professionalLoanOptions: {
            ...prevData.professionalLoanOptions,
            [option]: checked,
          },
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

    fetch("http://localhost:5000/submitdsa", {
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
  const renderProfessionalLoanOptions = () => {
    if (formData.products.includes("Professional Loan")) {
      return (
        <div className="form-group">
          <label>Choose Your Profession:</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="professionalLoanOption_doctor"
              name="professionalLoanOption_doctor"
              value="Doctor"
              checked={formData.professionalLoanOptions.doctor}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="professionalLoanOption_doctor"
            >
              Doctor
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="professionalLoanOption_ca"
              name="professionalLoanOption_ca"
              value="CA"
              checked={formData.professionalLoanOptions.ca}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="professionalLoanOption_ca"
            >
              CA
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="professionalLoanOption_cs"
              name="professionalLoanOption_cs"
              value="CS"
              checked={formData.professionalLoanOptions.cs}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="professionalLoanOption_cs"
            >
              CS
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="professionalLoanOption_cwa"
              name="professionalLoanOption_cwa"
              value="CWA"
              checked={formData.professionalLoanOptions.cwa}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="professionalLoanOption_cwa"
            >
              CWA
            </label>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2 className="text-center">DSA Registration</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">In which City you work/reside?</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="Enter your City Name"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Are You</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="workStatus"
                id="alreadyWorking"
                value="Already Working"
                checked={formData.workStatus === "Already Working"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="alreadyWorking">
                Already Working
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="workStatus"
                id="wantToStart"
                value="Want to start work now"
                checked={formData.workStatus === "Want to start work now"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="wantToStart">
                Want to start work now
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="officeArea">
              If you are already working then please share your office area in
              Square Feet?
            </label>
            <input
              type="text"
              className="form-control"
              id="officeArea"
              name="officeArea"
              placeholder="Enter Office Area in Square Feet"
              value={formData.officeArea}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>How do you process your cases Currently?</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="processMyself"
                name="processCustomerLoans"
                value="Process On My Own Code"
                checked={formData.processCustomerLoans.includes(
                  "Process On My Own Code"
                )}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="processMyself">
                Process On My Own Code
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="giveOthers"
                name="processCustomerLoans"
                value="Process On Someone Else Code"
                checked={formData.processCustomerLoans.includes(
                  "Process On Someone Else Code"
                )}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="giveOthers">
                Process On Someone Else Code
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="giveOthers"
                name="processCustomerLoans"
                value="Hybrid - Process Few Cases On Your Own Code And Few Cases On Someone Else Code"
                checked={formData.processCustomerLoans.includes(
                  "Hybrid - Process Few Cases On Your Own Code And Few Cases On Someone Else Code"
                )}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="giveOthers">
                Hybrid - Process Few Cases On Your Own Code And Few Cases On
                Someone Else Code
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="giveOthers"
                name="processCustomerLoans"
                value=" Work As A Freelancer, Associated With Different DSA Partners"
                checked={formData.processCustomerLoans.includes(
                  " Work As A Freelancer, Associated With Different DSA Partners"
                )}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="giveOthers">
                Work As A Freelancer, Associated With Different DSA Partners
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="giveOthers"
                name="processCustomerLoans"
                value="No Processing Cases Currently"
                checked={formData.processCustomerLoans.includes(
                  "No Processing Cases Currently"
                )}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="giveOthers">
                No Processing Cases Currently
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="teamMembers">Number of Team Members</label>
            <input
              type="number"
              className="form-control"
              id="teamMembers"
              name="teamMembers"
              placeholder="Enter number of team members"
              value={formData.teamMembers}
              onChange={handleChange}
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
                      value="Business Loan"
                      checked={formData.products.includes("Business Loan")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product3">
                      Business Loan
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product4"
                      name="products"
                      value="Professional Loan"
                      checked={formData.products.includes("Professional Loan")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product4">
                      Professional Loan
                    </label>
                  </div>
                  {renderProfessionalLoanOptions()}
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="product5"
                      name="products"
                      value="LAP Loan"
                      checked={formData.products.includes("LAP Loan")}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="product5">
                      LAP Loan
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          {renderDisbursementInputs()}
          <div className="form-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              type="text"
              className="form-control"
              id="whatsappNumber"
              name="whatsappNumber"
              placeholder="Enter WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DSARegistrationForm;

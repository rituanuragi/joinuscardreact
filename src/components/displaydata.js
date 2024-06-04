import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/displaydata.css"; // Add styles as needed

const DisplayData = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data based on type
    const endpoint =
      type === "bankers"
        ? "bankers"
        : type === "dsas"
        ? "dsas"
        : "channelpartners";
    axios
      .get(`http://localhost:5000/${endpoint}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${type} data:`, error);
      });
  }, [type]);

  const renderTable = () => {
    if (type === "bankers") {
      return (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Bank</th>
              <th>Post</th>
              <th>State</th>
              <th>City</th>
              <th>Products</th>
              <th>Email</th>
              <th>Contact</th>
              <th>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((banker, index) => (
              <tr key={index}>
                <td>{banker.fullName}</td>
                <td>{banker.bank}</td>
                <td>{banker.post}</td>
                <td>{banker.state}</td>
                <td>{banker.city}</td>
                <td>{banker.products?.join(", ")}</td>
                <td>{banker.email}</td>
                <td>{banker.contact}</td>
                <td>{banker.whatsapp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (type === "dsas") {
      return (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>State</th>
              <th>City</th>
              <th>Work Status</th>

              <th>Process Customer Loans</th>
              <th>Team Members</th>
              <th>Products</th>
              <th>Professional Loan Options</th>
              <th>WhatsApp Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dsa, index) => (
              <tr key={index}>
                <td>{dsa.fullName}</td>
                <td>{dsa.email}</td>
                <td>{dsa.state}</td>
                <td>{dsa.city}</td>
                <td>{dsa.workStatus}</td>
                <td>{dsa.processCustomerLoans?.join(", ") || "N/A"}</td>
                <td>{dsa.teamMembers}</td>
                <td>{dsa.products?.join(", ")}</td>
                {/* <td>
                  {dsa.professionalLoanOptions?.doctor && "Doctor "}
                  {dsa.professionalLoanOptions?.ca && "CA "}
                  {dsa.professionalLoanOptions?.cs && "CS "}
                  {dsa.professionalLoanOptions?.cwa && "CWA "}
                </td> */}
                <td>{dsa.whatsappNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (type === "channelpartners") {
      return (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>State</th>
              <th>Office Area</th>
              <th>Work Status</th>

              <th>Employment Type</th>
              <th>Team Members</th>
              <th>Products</th>
              <th>Disbursements</th>
              <th>Contact</th>
              <th>WhatsApp</th>
              <th>Payment Mode</th>
              <th>UPI ID</th>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              <th>IFSC Code</th>
              <th>Bank Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((partner, index) => (
              <tr key={index}>
                <td>{partner.fullName}</td>
                <td>{partner.email}</td>
                <td>{partner.state}</td>
                <td>{partner.city}</td>
                <td>{partner.workStatus}</td>

                <td>{partner.processCustomerLoans?.join(", ") || "N/A"}</td>
                <td>{partner.teamMembers}</td>
                <td>{partner.products?.join(", ")}</td>
                <td>
                  {Object.entries(partner.disbursements || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        {key}: {value}
                      </div>
                    )
                  )}
                </td>
                <td>{partner.contact}</td>
                <td>{partner.whatsapp}</td>
                <td>{partner.paymentMode}</td>
                <td>{partner.upiId}</td>
                <td>{partner.accountNumber}</td>
                <td>{partner.accountHolderName}</td>
                <td>{partner.ifscCode}</td>
                <td>{partner.bankName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div
      className="display-data"
      style={{
        backgroundImage: `url('https://hougumlaw.com/wp-content/uploads/2016/05/light-website-backgrounds-light-color-background-images-light-color-background-images-for-website-1024x640.jpg')`,
      }}
    >
      <h2>
        {type === "bankers"
          ? "Bankers"
          : type === "dsas"
          ? "DSAs"
          : "Channel Partners"}
      </h2>
      {renderTable()}
    </div>
  );
};

export default DisplayData;

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // or your email service provider
  auth: {
    user: "rituanuragi1@gmail.com",
    pass: "geon ylan rgeq mfld", // your email password or app-specific password
  },
});

// Endpoint to handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: "rituf2fintech@gmail.com",
    subject: "New DSA Registration Form Submission",
    text: `Full Name: ${formData.fullName}\nEmail: ${formData.email}\nState: ${
      formData.state
    }\nCity: ${formData.city}\nWork Status: ${
      formData.workStatus
    }\nOffice Area: ${
      formData.officeArea
    }\nProcess Customer Loans: ${formData.processCustomerLoans.join(
      ", "
    )}\nTeam Members: ${formData.teamMembers}\nDisburse Type: ${
      formData.disburseType
    }\nMonthly Disbursement: ${
      formData.monthlyDisbursement
    }\nHousing Loan Disbursement: ${
      formData.housingLoanDisbursement
    }\nLoan Against Property Disbursement: ${
      formData.loanAgainstPropertyDisbursement
    }\nPersonal Loan Disbursement: ${
      formData.personalLoanDisbursement
    }\nBusiness Loan Disbursement: ${
      formData.businessLoanDisbursement
    }\nWhatsApp Number: ${formData.whatsappNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Failed to send email", error });
    }
    res.status(200).send({ message: "Email sent successfully", info });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

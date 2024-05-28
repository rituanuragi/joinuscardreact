const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rituanuragi1@gmail.com",
    pass: "geon ylan rgeq mfld",
  },
});

// Store generated OTPs and corresponding email addresses
const otpMap = new Map();

// Route to send OTP email
app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const OTP = generateOTP();

  // Store OTP with email for verification
  otpMap.set(email, OTP);

  // Email content
  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: email,
    subject: "OTP Verification",
    html: `<p>Your OTP for verification: ${OTP}</p>`,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP email:", error);
      res.status(500).send("Error sending OTP email");
    } else {
      console.log("OTP email sent:", info.response);
      res.status(200).send("OTP email sent successfully");
    }
  });
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOTP = otpMap.get(email);

  if (otp === storedOTP) {
    // OTP is correct
    otpMap.delete(email); // Remove OTP from storage after successful verification
    res.status(200).send("OTP verified successfully");
  } else {
    // Incorrect OTP
    res.status(400).send("Incorrect OTP");
  }
});

// Route for handling form submission
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  console.log("Form Data:", formData);

  // Determine the bank name (either from the dropdown or the other bank input)
  const bankName =
    formData.bank === "Other" ? formData.otherBankName : formData.bank;

  // Convert product array to comma-separated string
  const products = Array.isArray(formData.products)
    ? formData.products.join(", ")
    : "";

  // Email content
  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: "rituf2fintech@gmail.com",
    subject: "New Form Submission",
    html: `
      <h4><strong>After Registration Banker Information</strong></h4>
      <p>Full Name: ${formData.fullName}</p>
      <p>Bank: ${bankName}</p>
      <p>Post in Bank: ${formData.post}</p>
      <p>State: ${formData.state}</p>
      <p>City: ${formData.city}</p>
      <p>Product: ${products}</p>
      <p>Email Address: ${formData.email}</p>
      <p>Contact Number: ${formData.contact}</p>
      <p>WhatsApp Number: ${formData.whatsapp}</p>
    `,
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Route for handling DSA registration form submission
app.post("/submitdsa", (req, res) => {
  const formData = req.body;

  // Email content
  const mailOptions = {
    from: formData.email,
    to: "rituf2fintech@gmail.com",
    subject: "New DSA Registration Form Submission",
    text: `Full Name: ${formData.fullName}
            Email: ${formData.email}
            State: ${formData.state}
            City: ${formData.city}
            Work Status: ${formData.workStatus}
            Office Area: ${formData.officeArea}
            Process Customer Loans: ${formData.processCustomerLoans.join(", ")}
            Team Members: ${formData.teamMembers}
            Products: ${formData.products.join(", ")}
            Professional Loan Options: ${
              formData.professionalLoanOptions.doctor ? "Doctor" : ""
            }${formData.professionalLoanOptions.ca ? ", CA" : ""}${
      formData.professionalLoanOptions.cs ? ", CS" : ""
    }${formData.professionalLoanOptions.cwa ? ", CWA" : ""}
            WhatsApp Number: ${formData.whatsappNumber}`,
  };
  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Generate a random OTP
function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

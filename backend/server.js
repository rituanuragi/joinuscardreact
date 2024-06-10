const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://rituf2fintech:Rishav1234@cluster0.ctb5mzb.mongodb.net/joinuscard",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define schemas
const bankerSchema = new mongoose.Schema(
  {
    fullName: String,
    bank: String,
    post: String,
    state: String,
    city: String,
    products: [String],
    email: String,
    contact: String,
    whatsapp: String,
  },
  { collection: "registerasbank" }
);

const dsaSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    state: String,
    city: String,
    workStatus: String,
    officeArea: String,
    processCustomerLoans: [String],
    teamMembers: Number,
    products: [String],
    professionalLoanOptions: {
      doctor: Boolean,
      ca: Boolean,
      cs: Boolean,
      cwa: Boolean,
    },
    whatsappNumber: String,
    contactNumber: String, // New field
    sameAsWhatsApp: Boolean, // New field
  },
  { collection: "registerasdsa" }
);

const channelPartnerSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    otp: String,
    state: String,
    city: String,
    workStatus: String,
    customWorkStatus: String,

    processCustomerLoans: [String],
    teamMembers: Number,
    products: [String],
    disbursements: Map, // Using a map to handle key-value pairs dynamically
    contact: String,
    whatsapp: String,
    paymentMode: String,
    upiId: String,
    accountNumber: String,
    accountHolderName: String,
    ifscCode: String,
    bankName: String,
  },
  { collection: "registeraschannelpartner" }
);

// Create models
const Banker = mongoose.model("Banker", bankerSchema);
const DSA = mongoose.model("DSA", dsaSchema);
const ChannelPartner = mongoose.model("ChannelPartner", channelPartnerSchema);

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

// Route to get all bankers
app.get("/bankers", (req, res) => {
  Banker.find()
    .then((bankers) => {
      res.status(200).json(bankers);
    })
    .catch((err) => {
      console.error("Error fetching bankers data:", err);
      res.status(500).send("Error fetching bankers data");
    });
});

// Route to get all DSAs
app.get("/dsas", (req, res) => {
  DSA.find()
    .then((dsas) => {
      res.status(200).json(dsas);
    })
    .catch((err) => {
      console.error("Error fetching DSAs data:", err);
      res.status(500).send("Error fetching DSAs data");
    });
});
app.get("/channelpartners", async (req, res) => {
  try {
    const channelPartners = await ChannelPartner.find();
    res.json(channelPartners);
  } catch (error) {
    console.error("Error fetching channel partners:", error);
    res.status(500).send("Internal Server Error");
  }
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

// Route for handling banker form submission
// Route for handling banker form submission
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  const bankName =
    formData.bank === "Other" ? formData.otherBankName : formData.bank;

  const newBanker = new Banker({
    fullName: formData.fullName,
    bank: bankName,
    post: formData.post,
    state: formData.state,
    city: formData.city,
    products: formData.products,
    email: formData.email,
    contact: formData.contact,
    whatsapp: formData.whatsapp,
  });

  newBanker
    .save()
    .then(() => {
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
          <p>Product: ${formData.products.join(", ")}</p>
          <p>Email Address: ${formData.email}</p>
          <p>Contact Number: ${formData.contact}</p>
          <p>WhatsApp Number: ${formData.whatsapp}</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent:", info.response);

          // Send the congratulatory email
          const congratsMailOptions = {
            from: "rituanuragi1@gmail.com",
            to: formData.email,
            subject: "Congratulations!",
            html: `<p>Dear ${formData.fullName},</p>
                   <p>Congratulations on your successful registration!</p>
                   <p>We are excited to have you on board.</p>
                   <p>Best Regards,</p>
                   <p>Your Company Nam</p>`,
          };

          transporter.sendMail(congratsMailOptions, (error, info) => {
            if (error) {
              console.error("Error sending congratulations email:", error);
              res
                .status(500)
                .send(
                  "Form submitted, but error sending congratulations email"
                );
            } else {
              console.log("Congratulations email sent:", info.response);
              res
                .status(200)
                .send(
                  "Form submitted and congratulations email sent successfully"
                );
            }
          });
        }
      });
    })
    .catch((err) => {
      console.error("Error saving banker data:", err);
      res.status(500).send("Error saving banker data");
    });
});

// Route for handling DSA registration form submission
app.post("/submitdsa", (req, res) => {
  const formData = req.body;

  const newDSA = new DSA({
    fullName: formData.fullName,
    email: formData.email,
    state: formData.state,
    city: formData.city,
    workStatus: formData.workStatus,
    officeArea: formData.officeArea,
    processCustomerLoans: formData.processCustomerLoans,
    teamMembers: formData.teamMembers,
    products: formData.products,
    professionalLoanOptions: formData.professionalLoanOptions,
    whatsappNumber: formData.whatsappNumber,
    contactNumber: formData.contactNumber, // New field
    sameAsWhatsApp: formData.sameAsWhatsApp, // New field
  });

  newDSA
    .save()
    .then(() => {
      // Email content
      const mailOptions = {
        from: "rituanuragi1@gmail.com",
        to: "rituf2fintech@gmail.com",
        subject: "New DSA Registration Form Submission",
        text: `Full Name: ${formData.fullName}
               Email: ${formData.email}
               State: ${formData.state}
               City: ${formData.city}
               Work Status: ${formData.workStatus}
               Office Area: ${formData.officeArea}
               Process Customer Loans: ${formData.processCustomerLoans.join(
                 ", "
               )}
               Team Members: ${formData.teamMembers}
               Products: ${formData.products.join(", ")}
               Professional Loan Options: ${
                 formData.professionalLoanOptions.doctor ? "Doctor" : ""
               }${formData.professionalLoanOptions.ca ? ", CA" : ""}${
          formData.professionalLoanOptions.cs ? ", CS" : ""
        }${formData.professionalLoanOptions.cwa ? ", CWA" : ""}
               WhatsApp Number: ${formData.whatsappNumber}
               Contact Number: ${
                 formData.sameAsWhatsApp
                   ? formData.whatsappNumber
                   : formData.contactNumber
               }`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent:", info.response);

          // Send the congratulatory email
          const congratsMailOptions = {
            from: "rituanuragi1@gmail.com",
            to: formData.email,
            subject: "Congratulations!",
            html: `<p>Dear ${formData.fullName},</p>
                   <p>Congratulations on your successful registration!</p>
                   <p>We are excited to have you on board.</p>
                   <p>Best Regards,</p>
                   <p>F2 Fintech Pvt Ltd.</p>
                   <p>A-25,M-1 Arv Park,Sector 63</p>
                   <p> Noida,Uttar Pradesh - 201301</p>`,
          };

          transporter.sendMail(congratsMailOptions, (error, info) => {
            if (error) {
              console.error("Error sending congratulations email:", error);
              res
                .status(500)
                .send(
                  "Form submitted, but error sending congratulations email"
                );
            } else {
              console.log("Congratulations email sent:", info.response);
              res
                .status(200)
                .send(
                  "Form submitted and congratulations email sent successfully"
                );
            }
          });
        }
      });
    })
    .catch((err) => {
      console.error("Error saving DSA data:", err);
      res.status(500).send("Error saving DSA data");
    });
});
// Create a new channel partner entry using the schema
app.post("/submitchannelpartner", (req, res) => {
  const formData = req.body;

  // Create a new channel partner entry using the schema
  const newChannelPartner = new ChannelPartner({
    fullName: formData.fullName,
    email: formData.email,
    otp: formData.otp,
    state: formData.state,
    city: formData.city,
    workStatus: formData.workStatus,
    // customWorkStatus: formData.customWorkStatus,
    // officeArea: formData.officeArea,
    processCustomerLoans: formData.processCustomerLoans,
    teamMembers: formData.teamMembers,
    products: formData.products,
    disbursements: formData.disbursements,
    contact: formData.contact,
    whatsapp: formData.whatsapp,
    paymentMode: formData.paymentMode,
    upiId: formData.upiId,
    accountNumber: formData.accountNumber,
    accountHolderName: formData.accountHolderName,
    ifscCode: formData.ifscCode,
    bankName: formData.bankName,
  });

  newChannelPartner
    .save()
    .then(() => {
      // Prepare the email content based on the submitted data
      let emailText = `Full Name: ${formData.fullName}\n`;
      emailText += `Email: ${formData.email}\n`;
      emailText += `State: ${formData.state}\n`;
      emailText += `Office Location: ${formData.city}\n`;
      // emailText += `City: ${formData.city}\n`;
      emailText += `Customer Profession: ${formData.workStatus}\n`;
      // emailText += `Customer Profession: ${formData.customWorkStatus}\n`;

      emailText += `Customer Employment: ${formData.processCustomerLoans}\n`;
      emailText += `Team Members: ${formData.teamMembers}\n`;
      emailText += `Products Deal In: ${formData.products.join(", ")}\n`;
      emailText += "Approx Loan Disbursements:\n";
      for (const product in formData.disbursements) {
        emailText += `  ${product}: ${formData.disbursements[product]}\n`;
      }
      emailText += `Contact Number: ${formData.contact}\n`;
      emailText += `WhatsApp Number: ${formData.whatsapp}\n`;
      emailText += `Payment Mode: ${formData.paymentMode}\n`;

      // Conditionally add bank details based on the payment mode
      if (formData.paymentMode.toLowerCase() === "upi") {
        emailText += `UPI ID: ${formData.upiId}\n`;
      } else if (
        formData.paymentMode.toLowerCase() !== "cheque" &&
        formData.paymentMode.toLowerCase() !== "cash"
      ) {
        emailText += `Account Number: ${formData.accountNumber}\n`;
        emailText += `Account Holder Name: ${formData.accountHolderName}\n`;
        emailText += `IFSC Code: ${formData.ifscCode}\n`;
        emailText += `Bank Name: ${formData.bankName}\n`;
      }

      const mailOptions = {
        from: "rituanuragi1@gmail.com",
        to: "rituf2fintech@gmail.com",
        subject: "Channel Partner Registration Form Submission",
        text: emailText,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent:", info.response);
          res.status(200).send("Form submitted and email sent successfully");
        }
      });
    })
    .catch((err) => {
      console.error("Error saving channel partner data:", err);
      res.status(500).send("Error saving channel partner data");
    });
});

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

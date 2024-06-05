import React from "react";
import { IoMdContacts } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "../style/card.css";

const PricingSection = () => {
  const navigate = useNavigate();

  const handleBankerRegistration = () => {
    navigate("/register-banker");
  };

  const handleDSARegistration = () => {
    navigate("/register-dsa");
  };

  const handleChannelPartnerRegistration = () => {
    navigate("/register-channel-partner");
  };
  const handleDisplayData = () => {
    navigate("/display-data");
  };

  const handlefinanceliteracy = () => {
    navigate("/GlobalFinancialLiteracyCampaign ");
  };
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-box text-center">
              {/* <h3 className="title-heading mt-4">Join Us </h3> */}
              <img
                src="images/home-border.png"
                height="15"
                className="mt-3"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-4">
          <div className="col-lg-4">
            <div className="pricing-box mt-4">
              <IoMdContacts className="h1" />
              <h4 className="f-20 text-primary">Register As Banker</h4>
              <div className="mt-4 pt-2 text-left">
                <p className="mb-2">
                  <TiTick className="h6" />
                  Update your current profile and network with more than 10,000
                  Bankers.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Expand your knowledge base about different Competitors &
                  Products.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Keep informed about all big news of Financial Services.
                </p>
              </div>
              <div className="mt-4 pt-3">
                <button
                  onClick={handleBankerRegistration}
                  className="btn btn-primary btn-rounded"
                >
                  Join Us
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pricing-box mt-4">
              <IoMdContacts className="h1" />
              <h4 className="f-20 text-primary">Register As DSA</h4>
              <div className="mt-4 pt-2 text-left">
                <p className="mb-2">
                  <TiTick className="h6" />1 Code for all Banks,NBFC's And
                  Fintech's
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Same day Disbursal,Same day Payout
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Track Live movement of all your Cases
                </p>

                <p className="mb-2">
                  <TiTick className="h6" />
                  Training & Infrastructure to speed up your portfolio journey
                </p>
              </div>
              <div className="mt-4 pt-3">
                <button
                  onClick={handleDSARegistration}
                  className="btn btn-primary btn-rounded"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="pricing-box mt-4">
              <IoMdContacts className="h1" />
              <h4 className="f-20 text-primary">Join As Channel Partner</h4>
              <div className="mt-4 pt-2 text-left">
                <p className="mb-2">
                  <TiTick className="h6" />
                  Start Making Revenue From Day 1.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Get Leads on your existing Product.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Add Your Product Line With Different Lending Products.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Utilize Your Financial Skills And Start Earning Through
                  Reference.
                </p>
              </div>
              <div className="mt-4 pt-3">
                <button
                  onClick={handleChannelPartnerRegistration}
                  className="btn btn-primary btn-rounded"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="pricing-box mt-4">
              <IoMdContacts className="h1" />
              <h4 className="f-20 text-primary">Join As Brand Ambassador</h4>
              <div className="mt-4 pt-2 text-left">
                <p className="mb-2">
                  <TiTick className="h6" />
                  Enhance your resume with a significant Leadership role.
                </p>

                <p className="mb-2">
                  <TiTick className="h6" />
                  Earn 1% Payout on every successful conversion of any Financial
                  Products driven by your videos.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Gain access to exclusive financial workshops and webinars.
                </p>
              </div>
              <div className="mt-4 pt-3">
                <button
                  onClick={() => navigate("../components/financeliteracy.js")}
                  className="btn btn-primary btn-rounded"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

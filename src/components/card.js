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
                  Leverage Your Expertise.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Get Help From an existing business skills.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Utilize Your Finance Skills In Helping Others.
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
                  <TiTick className="h6" />
                  Start Making Revenue From Day 1.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Get Regular Updates On Your Case Movement.
                </p>
                <p className="mb-2">
                  <TiTick className="h6" />
                  Pay Out Release in 24 hours & Access Personalized Support.
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
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

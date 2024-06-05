import React from "react";

const GlobalFinancialLiteracyCampaign = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Global Financial Literacy Program</title>
      <style>
        {`
          body {
           
            background-size: cover;
            margin: 0;
            font-family: "Open Sans", sans-serif;
        
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
           
            margin-top:10px;
          }

          .header {
            color: #2c3ce3;
            padding: 10px;
            width: 100%;
            text-align: center;
            border-radius: 10px 10px 0 0;
            text-decoration: underline;
          }

          .header h1 {
            margin: 0;
            font-size: 2.5em;
          }

          h3 {
            color: blue;
            font-weight: 300;
          }

          .content {
            text-align: center;
            padding: 20px;
          }

          .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-top: 1px;
            color: #212427;
          }

          .video-container {
            margin: 20px 0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
          }

          .video-container iframe {
            width: 70%;
            height: 415px;
            border: none;
          }

          .button-7 {
            background: linear-gradient(135deg, #0095ff, #0064bd);
            border: none;
            border-radius: 50px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            margin: 20px 0;
            outline: none;
            padding: 15px 30px;
            text-align: center;
            text-decoration: none;
            user-select: none;
            -webkit-user-select: none;
      
          }
          .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
            text-align: center;
          }

          @media (max-width: 768px) {
            .video-container iframe {
              height: 200px;
            }

            .header h1 {
              font-size: 2em;
            }

            .content h2 {
              font-size: 20px;
            }

            .content p {
              font-size: 16px;
            }

            .button-7 {
              font-size: 16px;
              padding: 12px 25px;
            }
          }
        `}
      </style>
      <div className="container">
        <div className="header">
          <h1>Global Financial Literacy Campaign</h1>
        </div>
        <div className="content">
          {/* <h2>Welcome to Our Program</h2> */}
          <p>
            Our program offers a variety of resources and training sessions to
            assist you in growing, We convinced that everyone has the capacity
            to achieve their dreams.
          </p>
          <h3>
            JOIN US IN OUR MISSION TO ENHANCE FINANCIAL LITERACY WORLDWIDE.
          </h3>
          <div className="video-container">
            <iframe
              title="YouTube Video"
              src="https://www.youtube.com/embed/v38GXd_a_6k?si=TAbK9BPJaOhiyeD1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeVJZAH6xvD_MJlfFW4cSxHEn8k-vuhu-6Lauxz6sB7iK-fUQ/viewform"
            className="button-7"
            role="button"
          >
            Join Us As A Brand Ambassador
          </a>
        </div>
        <div className="footer">
          © 2024 Global Financial Literacy Program. All rights reserved. |
          Contact us: marketing@f2fintech.com
        </div>
      </div>
    </>
  );
};

export default GlobalFinancialLiteracyCampaign;

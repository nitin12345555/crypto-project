import React from "react";
import '../all css/support.css';
import supportIcon from "../assets/24 support.png";
import communityIcon from "../assets/community.png";
import certificateIcon from "../assets/certificate.png";

const features = [
  {
    title: "24/7 Support",
    description: "Need help? Get your requests solved quickly via support team.",
    icon: supportIcon,
  },
  {
    title: "Community",
    description: "Join the conversations on our worldwide OKEx communities",
    icon: communityIcon,
  },
  {
    title: "Academy",
    description: "Learn blockchain and crypto for free.",
    icon: certificateIcon,
  },
];

const Support = () => {
  return (
    <div className="support-section">
      <div className="support-heading">
        <h3>Always by your side</h3>
        <h1>Be the first to use our Crypgo</h1>
      </div>

      <div className="support-container">
        {features.map((item, index) => (
          <div className="support-card" key={index}>
            <img src={item.icon} alt={item.title} className="support-icon" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;

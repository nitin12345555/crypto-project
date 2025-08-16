import React from "react";
import Bitcoin from '../assets/bitcoin (1).png';
import Ethereum from '../assets/ethereum.png';
import Solana from '../assets/solana.png';
import Bnb from '../assets/bnb.png';
import Usdc from '../assets/usdc.png';
import '../all css/Work.css';

import Fullstack from '../assets/fullstack.png';
import BlockChain from '../assets/blockchain.png';
import Cutomiziton from '../assets/customization.png';

const projectServices = [
  { id: 1, title: "Fullstack Projects", img: Fullstack },
  { id: 2, title: "Project Development", img: BlockChain },
  { id: 3, title: "Blockchain Development", img: Cutomiziton },
];

const coins = [
  { id: "bitcoin", name: "Bitcoin", img: Bitcoin, price: "$67,000" },
  { id: "ethereum", name: "Ethereum", img: Ethereum, price: "$3,500" },
  { id: "solana", name: "Solana", img: Solana, price: "$160" },
  { id: "bnb", name: "BNB", img: Bnb, price: "$550" },
  { id: "usdc", name: "USDC", img: Usdc, price: "$1" },
];

const Work = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-grid">

        <div>
          <div className="Work-heading">
            <h3>
              Work with <span className="green-text">us</span>
            </h3>
            <h3>Successfully launch your</h3>
            <h3>blockchain project.</h3>
          </div>

          <div className="projects-container">
            {projectServices.map(service => (
              <div className="project-card" key={service.id}>
                <img src={service.img} className="project-img" alt={service.title} />
                <h1>{service.title}</h1>
              </div>
            ))}
          </div>
        </div>


        <div className="Work-section">
          {coins.map((coin) => (
            <div className="StyledBox" key={coin.id}>
              <div className="coin-left">
                <img src={coin.img} alt={`${coin.name} logo`} className="Coin-img" />
                <h1 className="Coin-name">{coin.name}</h1>
              </div>
              <p className="Rates">{coin.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Work;

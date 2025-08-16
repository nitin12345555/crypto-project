import React, { useEffect, useState, forwardRef } from "react";
import '../all css/price.css';
import Bitcoin from '../assets/bitcoin (1).png';
import Ethereum from '../assets/ethereum.png';
import Solana from '../assets/solana.png';
import Bnb from '../assets/bnb.png';
import Usdc from '../assets/usdc.png';

const coins = [
  { id: "bitcoin", name: "BITCOIN", img: Bitcoin },
  { id: "ethereum", name: "ETHEREUM", img: Ethereum },
  { id: "solana", name: "SOLANA", img: Solana },
  { id: "binancecoin", name: "BNB", img: Bnb },
  { id: "usd-coin", name: "USDC", img: Usdc },
];


const Pricing = forwardRef((props, ref) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      const coinIds = coins.map(c => c.id).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch prices");
      const data = await response.json();
      setPrices(data);
      console.log("Fetched data:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      fetchPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading prices...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (

    <div className="Coin-price" ref={ref}>
      {coins.map(({ id, name, img }) => {
        const priceData = prices[id];
        if (!priceData || priceData.usd == null || priceData.usd_24h_change == null) return null;

        const price = priceData.usd.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        });
        const change = priceData.usd_24h_change;
        const isUp = change >= 0;
        const changeColor = isUp ? "green" : "red";
        const arrow = isUp ? "▲" : "▼";

        return (
          <div className="Coin-box" key={id}>
            <h1 className="Coin-name">{name}</h1>
            <img src={img} alt={`${name} Logo`} className="Coin-img" />
            <p className="Rates">{price}</p>
            <p style={{ color: changeColor, fontWeight: "bold" }}>
              {arrow} {change.toFixed(2)}%
            </p>
          </div>
        );
      })}
    </div>
  );
});

export default Pricing;

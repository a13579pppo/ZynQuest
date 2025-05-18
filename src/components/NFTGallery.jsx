import React, { useEffect, useState } from 'react';
import nftData from '../data/nfts';
import './NFTGallery.css';

const NFTGallery = ({ userLevel = 3 }) => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ownedNFTs')) || [];
    setOwnedNFTs(saved);
  }, []);

  const handleBuy = (nft) => {
    if (ownedNFTs.includes(nft.id)) {
      alert("You already own this NFT!");
      return;
    }

    // شبیه‌سازی پرداخت واقعی با Tonkeeper در آینده جایگزین خواهد شد
    const confirmBuy = window.confirm(`Buy "${nft.name}" for ${nft.priceTON} TON?`);
    if (confirmBuy) {
      const updated = [...ownedNFTs, nft.id];
      setOwnedNFTs(updated);
      localStorage.setItem('ownedNFTs', JSON.stringify(updated));
      alert("NFT purchased successfully!");
    }
  };

  return (
    <div className="gallery-container">
      <h1>ZynQuest NFT Gallery</h1>
      <div className="nft-grid">
        {nftData.map((nft) => (
          <div
            key={nft.id}
            className={`nft-card ${userLevel >= nft.levelRequired ? '' : 'locked'}`}
          >
            <img src={nft.image} alt={nft.name} />
            <div className="nft-info">
              <h3>{nft.name}</h3>
              <p>{nft.category} — {nft.priceTON} TON</p>
              <p>Level Required: {nft.levelRequired}</p>
              {userLevel >= nft.levelRequired ? (
                <button
                  onClick={() => handleBuy(nft)}
                  disabled={ownedNFTs.includes(nft.id)}
                >
                  {ownedNFTs.includes(nft.id) ? "Owned" : "Buy"}
                </button>
              ) : (
                <button disabled>Locked</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;

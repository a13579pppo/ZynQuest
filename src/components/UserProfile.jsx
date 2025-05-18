// مسیر: src/components/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import nftData from '../data/nfts';
import './UserProfile.css';

const UserProfile = ({ userLevel = 3 }) => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ownedNFTs')) || [];
    setOwnedNFTs(saved);
  }, []);

  const ownedDetails = nftData.filter(n => ownedNFTs.includes(n.id));

  return (
    <div className="profile-container">
      <h1>Your ZynQuest Profile</h1>
      <p>Level: {userLevel}</p>
      <h2>Owned NFTs</h2>
      {ownedDetails.length === 0 ? (
        <p>You haven't purchased any NFTs yet.</p>
      ) : (
        <div className="owned-nfts">
          {ownedDetails.map(nft => (
            <div key={nft.id} className="owned-nft-card">
              <img src={nft.image} alt={nft.name} />
              <h4>{nft.name}</h4>
              <p>{nft.category} — {nft.priceTON} TON</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

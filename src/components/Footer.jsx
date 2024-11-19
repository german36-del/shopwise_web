import React, { useState } from 'react';
import '../styles/global.css';

const Footer = () => {
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);
  const supermarkets = ['mercadona', 'alcampo', 'eroski', 'aldi'];

  const handleIconClick = (supermarket) => {
    setSelectedSupermarket(supermarket);
    console.log("Supermercado seleccionado:", supermarket);
  };

  return (
    <div className="footer">
      {supermarkets.map((market) => (
        <img
          key={market}
          src={`./assets/supermarket-icons/${market}.png`} // Iconos en la carpeta de assets
          alt={market}
          className={`icon ${selectedSupermarket === market ? 'selected' : ''}`}
          onClick={() => handleIconClick(market)}
        />
      ))}
    </div>
  );
};

export default Footer;

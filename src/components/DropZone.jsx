import React, { useState } from 'react';

const DropZone = ({ onDrop, label }) => {
  const [highlight, setHighlight] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => setHighlight(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const file = e.dataTransfer.files[0];
    if (file) onDrop(file);
  };

  return (
    <div
      className={`drop-zone ${highlight ? 'highlight' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{label}</p>
    </div>
  );
};

export default DropZone;

// src/components/HomeScreen.js
import React from 'react';
import DropZone from './DropZone';
import Footer from './Footer';
import '../styles/global.css';

const HomeScreen = () => {
  const handleImageDrop = (file) => {
    console.log("Imagen subida:", file);
  };

  const handleTextDrop = (file) => {
    console.log("Archivo TXT subido:", file);
  };

  return (
    <div className="home-screen">
      <h1>Bienvenido a la aplicación</h1>
      <div className="drop-zones">
        <DropZone onDrop={handleImageDrop} label="Suelta una imagen aquí" />
        <DropZone onDrop={handleTextDrop} label="Suelta un archivo .txt aquí" />
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;

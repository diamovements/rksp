import React from 'react';
import './App.css';
import image from './img.png'

function App() {
  return (
      <div className="container">
        <h1>Hello, world! I'm Karina</h1>
        <p>Это моя первая практика с React и Node.js.</p>
        <p>А это просто картинка</p>
        <img src={image} alt="Картинка" width="300" />
      </div>
  );
}

export default App;

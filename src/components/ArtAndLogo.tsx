import React from 'react';
import './ArtAndLogo.css';

const ArtAndLogo: React.FC = () => {
  return (
    <div className="art-and-logo" data-name="Art and Logo" data-node-id="7251:8020">
      {/* Sun background with baked-in logo */}
      <div 
        className="sun-background" 
        data-name="sun 1" 
        data-node-id="7251:8016"
        style={{ 
          backgroundImage: `url('/liberte.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
      />
    </div>
  );
};

export default ArtAndLogo;

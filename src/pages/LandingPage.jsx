import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [hover, setHover] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-blue-500 text-white">
      <div className="text-center p-4">
        <h1 className="text-6xl font-bold mb-4">Hey. FitAssist is here.</h1>
        <h2 className="text-2xl mb-8">Making your nutrition, <em>YOUR</em> nutrition.</h2>
        <Link 
            to="/auth" 
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className={`bg-white text-blue-700 font-semibold py-2 px-4 border border-white rounded shadow transform transition duration-300 ease-in-out ${hover ? 'scale-105 shadow-lg' : ''}`}
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
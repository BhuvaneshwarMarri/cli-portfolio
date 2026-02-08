import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <h1 className='home-title'>Welcome to My Portfolio</h1>
            <pre className='ascii-art'>
              ,--.
             {  O }
              `--'
            </pre>
            <p className='home-description'>
                Explore my projects, blog, and more.
            </p>
        </div>
    );
};

export default Home;
import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styles 

const Home = () => {
    return (
        <div className="home-container">
            <h1 style={{ textAlign: 'center' }}>Welcome to My Homepage!</h1>
            <div className="ascii-art" style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textAlign: 'center' }}>
                {`   /\_/\
   | o o |
   |  ^  |  
   |_____|`}
            </div>
            <p style={{ margin: '20px 0', fontSize: '1.2em', textAlign: 'center' }}>
                This is an improved homepage layout for better readability and aesthetic.
            </p>
            <div className="call-to-action" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <a href="/projects" className="button">View Projects</a>
                <a href="/contact" className="button">Contact Me</a>
            </div>
        </div>
    );
};

export default Home;
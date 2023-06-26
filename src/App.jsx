import Sidebar from './components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import About from './pages/About';
import Meters from './pages/Meters';
import Maps from './pages/Maps';
import { useState, useEffect } from 'react';


function App(){

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState('fadeIn');

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage('fadeOut');
        if(location.pathname == '/about') document.documentElement.style.backgroundColor = '#D6EDD4';
        else document.documentElement.style.backgroundColor = '#e3f3e2';
    }, [location, displayLocation]);

    return (
        <>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className={`pages ${transitionStage}`}
                onAnimationEnd={() => {
                    if (transitionStage === 'fadeOut') {
                        setTransistionStage('fadeIn');
                        setDisplayLocation(location);
                    }
                }}>
                <Routes location={displayLocation}>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/meters/" element={<Meters />} />
                    <Route exact path="/meters/:deviceName" element={<Device />} />
                    <Route exact path="/maps/" element={<Maps />} />
                    <Route exact path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

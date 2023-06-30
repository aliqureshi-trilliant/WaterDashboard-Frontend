import Sidebar from './components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import About from './pages/About';
import Meters from './pages/Meters';
import Maps from './pages/Maps';
import { useState, useEffect } from 'react';
import IndividualKPI from './pages/IndividualKPI';
import Metrics from './pages/Metrics';


function App(){

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState('fadeIn');

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage('fadeOut');
        if(location.pathname == '/about') document.documentElement.style.background = '#D6EDD4';
        else if (location.pathname.includes('/metrics')) document.documentElement.style.background = 'linear-gradient(180deg, rgba(246, 246, 246, 0.80) 0%, rgba(221, 240, 221, 0.85) 47.84%, #C5EAC5 100%)';
        else document.documentElement.style.background = '#e3f3e2';
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
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/meters/" element={<Meters />} />
                    <Route exact path="/meters/:deviceName" element={<Device />} />
                    <Route exact path="/maps/" element={<Maps />} />
                    <Route exact path="/metrics/" element={<Metrics />} />
                    <Route exact path="/metrics/:kpiName" element={<IndividualKPI />} />
                    <Route exact path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

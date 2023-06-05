import Sidebar from './components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import { useState, useEffect } from 'react';


function App(){

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState('fadeIn');

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage('fadeOut');
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
                    <Route exact path="/meters/:deviceName" element={<Device />} />
                </Routes>
            </div>
        </>
    );
}

export default App;

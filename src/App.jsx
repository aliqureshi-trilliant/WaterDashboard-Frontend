import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';


function App(){
    return (
        <>
            <Router>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='pages'>
                    <Routes>
                        <Route exact path="/home" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;

import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

function App(){
    return (
        <>
            <Router>
                <Sidebar />
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

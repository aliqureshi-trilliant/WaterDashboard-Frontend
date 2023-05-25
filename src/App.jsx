import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App(){
    return (
        <>
        <Router>
            <Sidebar />
            <Routes>
                <Route exact path="/">
                </Route>
            </Routes>
        </Router>
        </>
    );
}

export default App;

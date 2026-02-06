import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Transpose from './Transpose';
import ScalesPractice from './ScalesPractice';
import Home from './Home';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/transpose">Transposition</Link>
                    <Link to="/scales">Scales Practice</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/scales" element={<ScalesPractice />}/>
                    <Route path="/transpose" element={<Transpose />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

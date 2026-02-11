import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Transpose from './Transpose';
import ScalesPractice from './ScalesPractice';
import CircleOfFifths from './CircleOfFifths';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Circle of Fifths</Link>
                    <Link to="/transpose">Transposition</Link>
                    <Link to="/scales">Scales Practice</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<CircleOfFifths/>}/>
                    <Route path="/scales" element={<ScalesPractice />}/>
                    <Route path="/transpose" element={<Transpose />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

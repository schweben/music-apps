import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CircleOfFifths from './CircleOfFifths';
import Intervals from './Intervals';
import ScalesPractice from './ScalesPractice';
import Transpose from './Transpose';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Circle of Fifths</Link>
                    <Link to="/transpose">Transposition</Link>
                    <Link to="/scales">Scales Practice</Link>
                    <Link to="/intervals">Intervals</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<CircleOfFifths/>}/>
                    <Route path="/scales" element={<ScalesPractice />}/>
                    <Route path="/transpose" element={<Transpose />}/>
                    <Route path="/intervals" element={<Intervals />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

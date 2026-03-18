import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Transpose from './Transpose';
import ScalesPractice from './ScalesPractice';
import CircleOfFifths from './CircleOfFifths';
import Staves from './Staves';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Circle of Fifths</Link>
                    <Link to="/transpose">Transposition</Link>
                    <Link to="/scales">Scales Practice</Link>
                    <Link to="/staves">Staves</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<CircleOfFifths/>}/>
                    <Route path="/scales" element={<ScalesPractice />}/>
                    <Route path="/transpose" element={<Transpose />}/>
                    <Route path="/staves" element={<Staves />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

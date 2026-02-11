import CircleOfFifths from './CircleOfFifths';
import './Home.css';

const Home = () => {
    return (
    <div>
        <div className="panel">
            <h1>Music Apps</h1>
            <h2>Scales Practice</h2>
            <p>Get a random scale to play in your practice</p>
            <h2>Transposition</h2>
            <p>Transpose a key signature or individual note from one key to another</p>
        </div>
        <CircleOfFifths/>
    </div>
    );
}
export default Home;

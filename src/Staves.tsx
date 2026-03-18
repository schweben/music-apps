import { useEffect, useRef, useState, type ChangeEvent } from "react";

const Staves = () => {
    const [clef, setClef] = useState("treble");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawStave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Calculate responsive size
        const isMobile = window.innerWidth <= 640;
        const size = isMobile ? Math.min(window.innerWidth * 0.9, 400) : 600;
        const scale = size / 600;

        // Set canvas size
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the centre of the canvas
        const centreX = canvas.width / 2;
        const centreY = canvas.height / 2;

        // Set stroke color and width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            const startX = centreX - (size / 2);
            const endX = centreX + (size / 2);

            const startY = centreY + (i * 20);
            const endY = centreY + (i * 20);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    };

    useEffect(() => {
        drawStave();
    });

    const updateClef = (event: ChangeEvent<HTMLInputElement>) => {
        setClef(event.target.value);
        console.log("Clef = " + event.target.value);
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h1>Staves</h1>
            </div>
            <div>
                <li><label><input type="radio" name="clef" value="treble" onChange={updateClef} defaultChecked={true}/>Treble clef</label></li>
                <li><label><input type="radio" name="clef" value="alto" onChange={updateClef}/>Alto clef</label></li>
                <li><label><input type="radio" name="clef" value="bass" onChange={updateClef}/>Bass clef</label></li>
            </div>
            <canvas ref={canvasRef} id="staves"></canvas>
        </div>
    );
}

export default Staves;

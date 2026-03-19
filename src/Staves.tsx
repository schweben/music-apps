import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import trebleClefImage from "./assets/treble-clef.svg";
import bassClefImage from "./assets/bass-clef.svg";
import altoClefImage from "./assets/alto-clef.svg";

const Staves = () => {
    const [clef, setClef] = useState("treble");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const trebleClefImageRef = useRef<HTMLImageElement | null>(null);
    const altoClefImageRef = useRef<HTMLImageElement | null>(null);
    const bassClefImageRef = useRef<HTMLImageElement | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Load all clef images once.
    useEffect(() => {
        const trebleImg = new Image();
        const altoImg = new Image();
        const bassImg = new Image();
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount += 1;
            if (loadedCount === 3) {
                setImagesLoaded(true);
            }
        };

        trebleImg.onload = handleImageLoad;
        altoImg.onload = handleImageLoad;
        bassImg.onload = handleImageLoad;

        trebleImg.src = trebleClefImage;
        altoImg.src = altoClefImage;
        bassImg.src = bassClefImage;

        trebleClefImageRef.current = trebleImg;
        altoClefImageRef.current = altoImg;
        bassClefImageRef.current = bassImg;
    }, []);

    const drawTrebleClef = (
        ctx: CanvasRenderingContext2D,
        staffLeft: number,
        staffTop: number,
        lineSpacing: number,
        scale: number
    ) => {
        if (!trebleClefImageRef.current) return;
        const img = trebleClefImageRef.current;
        const width = 80 * scale;
        const height = 150 * scale;
        const x = staffLeft + 14 * scale;
        const gLineY = staffTop + (3 * lineSpacing);
        const y = gLineY - (height * 0.43);
        ctx.drawImage(img, x, y, width, height);
    };

    const drawAltoClef = (
        ctx: CanvasRenderingContext2D,
        staffLeft: number,
        staffTop: number,
        lineSpacing: number,
        scale: number
    ) => {
        if (!altoClefImageRef.current) return;
        const img = altoClefImageRef.current;
        const width = 65 * scale;
        const height = 120 * scale;
        const x = staffLeft + 20 * scale;
        const middleLineY = staffTop + (2 * lineSpacing);
        const y = middleLineY - (height * 0.5);
        ctx.drawImage(img, x, y, width, height);
    };

    const drawBassClef = (
        ctx: CanvasRenderingContext2D,
        staffLeft: number,
        staffTop: number,
        lineSpacing: number,
        scale: number
    ) => {
        if (!bassClefImageRef.current) return;
        const img = bassClefImageRef.current;
        const width = 75 * scale;
        const height = 90 * scale;
        const x = staffLeft + 12 * scale;
        const fLineY = staffTop + lineSpacing;
        const y = fLineY - (height * 0.4);
        ctx.drawImage(img, x, y, width, height);
    };

    const drawStave = useCallback(() => {
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

        const staffLeft = centreX - (size / 2);
        const lineSpacing = 20 * scale;

        // Set stroke color and width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            const startX = staffLeft;
            const endX = centreX + (size / 2);

            const startY = centreY + (i * lineSpacing);
            const endY = centreY + (i * lineSpacing);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        // Draw selected clef symbol.
        if (clef === 'treble') {
            drawTrebleClef(ctx, staffLeft, centreY, lineSpacing, scale);
        } else if (clef === 'alto') {
            drawAltoClef(ctx, staffLeft, centreY, lineSpacing, scale);
        } else if (clef === 'bass') {
            drawBassClef(ctx, staffLeft, centreY, lineSpacing, scale);
        }
    }, [clef]);

    useEffect(() => {
        drawStave();
    }, [drawStave, imagesLoaded]);

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

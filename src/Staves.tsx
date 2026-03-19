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
        staveLeft: number,
        staveTop: number,
        lineSpacing: number,
        scale: number
    ) => {
        if (!trebleClefImageRef.current) return;
        const img = trebleClefImageRef.current;
        const height = 130 * scale;
        const width = height * (img.width / img.height);
        const x = staveLeft + 10 * scale;
        const gLineY = staveTop + (3 * lineSpacing);
        // Anchor the treble clef spiral on the G line.
        const y = gLineY - (height * 0.62);
        ctx.drawImage(img, x, y, width, height);
    };

    const drawAltoClef = (
        ctx: CanvasRenderingContext2D,
        staveLeft: number,
        staveTop: number,
        lineSpacing: number,
        scale: number
    ) => {
        if (!altoClefImageRef.current) return;
        const img = altoClefImageRef.current;
        const height = lineSpacing * 4;
        const width = 44 * scale;
        const x = staveLeft + 10 * scale;
        const y = staveTop;
        ctx.drawImage(img, x, y, width, height);
    };

    const drawBassClef = (
        ctx: CanvasRenderingContext2D,
        staveLeft: number,
        staveTop: number,
        scale: number
    ) => {
        if (!bassClefImageRef.current) return;
        const img = bassClefImageRef.current;
        const width = 56 * scale;
        const height = 68 * scale;
        const x = staveLeft + 10 * scale;
        const y = staveTop;
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

        const staveLeft = centreX - (size / 2) + 5;
        const staveRight = centreX + (size /2) - 5;
        const lineSpacing = 20 * scale;

        // Set stroke color and width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            const startX = staveLeft;
            const endX = staveRight;

            const startY = centreY + (i * lineSpacing);
            const endY = centreY + (i * lineSpacing);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        // Draw barlines
        ctx.beginPath();
        ctx.moveTo(staveLeft, centreY);
        ctx.lineTo(staveLeft, centreY + (4 * lineSpacing));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(staveRight - 10, centreY);
        ctx.lineTo(staveRight - 10, centreY + (4 * lineSpacing));
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(staveRight, centreY);
        ctx.lineTo(staveRight, centreY + (4 * lineSpacing));
        ctx.stroke();

        // Draw selected clef symbol.
        if (clef === 'treble') {
            drawTrebleClef(ctx, staveLeft, centreY, lineSpacing, scale);
        } else if (clef === 'alto') {
            drawAltoClef(ctx, staveLeft, centreY, lineSpacing, scale);
        } else if (clef === 'bass') {
            drawBassClef(ctx, staveLeft, centreY, scale);
        }
    }, [clef]);

    useEffect(() => {
        drawStave();
    }, [drawStave, imagesLoaded]);

    const updateClef = (event: ChangeEvent<HTMLInputElement>) => {
        setClef(event.target.value);
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

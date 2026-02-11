
import { useEffect, useRef } from 'react';


const CircleOfFifths = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        canvas.width = 600;
        canvas.height = 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set stroke color and width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const outerRadius = 290;
        const middleRadius = 200;
        const innerRadius = 100;

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw middle circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, middleRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw lines from inner circle to outer circle using degrees
        for (let degrees = 15; degrees < 360; degrees = degrees + 30) {

            // Convert degrees to radians (-90 to make 0 deg point up)
            const angleRad = (degrees - 90) * Math.PI / 180;
            const startX = centerX + innerRadius * Math.cos(angleRad);
            const startY = centerY + innerRadius * Math.sin(angleRad);
            const endX = centerX + outerRadius * Math.cos(angleRad);
            const endY = centerY + outerRadius * Math.sin(angleRad);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

    }); // No dependency array: runs after every render

    return (
        <div className="panel">
            <canvas ref={canvasRef} id="circleOfFifths"></canvas>
        </div>
    );
}

export default CircleOfFifths;

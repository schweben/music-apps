
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
        const segmentCount = 12;
        const segmentAngle = 30;
        const lineAngles = [];
        for (let degrees = 15; degrees < 360; degrees += segmentAngle) {
            lineAngles.push(degrees);
            // Draw lines as before
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
        // Add the first angle + 360 to close the circle for the last segment
        lineAngles.push(lineAngles[0] + 360);

        // Set text style once before drawing all letters
        ctx.font = '32px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < segmentCount; i++) {
            // Midpoint angle between two lines
            const angle1 = lineAngles[i];
            const angle2 = lineAngles[i + 1];
            const midAngle = ((angle1 + angle2) / 2);
            const midAngleRad = (midAngle - 90) * Math.PI / 180;
            const outerTextRadius = (middleRadius + outerRadius) / 2;
            const outerTextX = centerX + outerTextRadius * Math.cos(midAngleRad);
            const outerTextY = centerY + outerTextRadius * Math.sin(midAngleRad);
            ctx.fillText('C', outerTextX, outerTextY);

            const innerTextRadius = (innerRadius + middleRadius) / 2;
            const innerTextX = centerX + innerTextRadius * Math.cos(midAngleRad);
            const innerTextY = centerY + innerTextRadius * Math.sin(midAngleRad);
            ctx.fillText('C', innerTextX, innerTextY);
        }

    }); // No dependency array: runs after every render

    return (
        <div className="panel">
            <canvas ref={canvasRef} id="circleOfFifths"></canvas>
        </div>
    );
}

export default CircleOfFifths;


import React, { useEffect, useRef } from 'react';
import { MAJOR_KEYS, MINOR_KEYS } from './Fifths';
import HelpPanel from './HelpPanel';


const CircleOfFifths = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Calculate responsize size
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

        // Set stroke color and width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const outerRadius = 290 * scale;
        const middleRadius = 200 * scale;
        const innerRadius = 70 * scale;

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
        ctx.stroke();

        // Draw middle circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, middleRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(210, 181, 140)";
        ctx.fill();
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
        const baseFontSize = 32;
        const fontSize = baseFontSize * scale;
        ctx.font = `${fontSize}px Arial`;
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
            ctx.fillText(MAJOR_KEYS[i], outerTextX, outerTextY);

            const innerTextRadius = (innerRadius + middleRadius) / 2;
            const innerTextX = centerX + innerTextRadius * Math.cos(midAngleRad);
            const innerTextY = centerY + innerTextRadius * Math.sin(midAngleRad);
            ctx.fillText(MINOR_KEYS[i], innerTextX, innerTextY);
        }

    }); // No dependency array: runs after every render

    const circleClicked = (event: React.MouseEvent) => {
        console.log(`X:${event.clientX}, Y:${event.clientY}`);
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Calculate responsize size
        const isMobile = window.innerWidth <= 640;
        const size = isMobile ? Math.min(window.innerWidth * 0.9, 400) : 600;
        const scale = size / 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const baseFontSize = 32;
        const fontSize = baseFontSize * scale;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(`X: ${ event.clientX }, Y: ${ event.clientY }`, centerX, centerY);
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h1>Circle of Fifths</h1>
                <HelpPanel message={[`The circle of fifths is a way of visualising all major keys and minor keys. The major keys are in the outer circle and their
                                      relative minor keys are in the inner circle.`,
                                     `The circle shows that one sharp is added to the key signature for each increasing fifth interval, by proceeding clockwise
                                      around the circle. Likewise, proceeding anti-clockwise around the circle shows that one flat is added for each increasing fourth interval.`]}/>
            </div>
            <canvas ref={canvasRef} id="circleOfFifths" onMouseDown={circleClicked}></canvas>
        </div>
    );
}

export default CircleOfFifths;

import React, { useEffect, useRef, useState } from 'react';
import HelpPanel from './HelpPanel';
import { MajorKey } from './Keys';

const CircleOfFifths = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedSegment, setSelectedSegment] = useState<number | null>(null);

    // Draws the circle of fifths on the canvas
    const drawCircle = (highlightedSegment: number | null = null) => {
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

        // Set text style once before drawing all letters
        const baseFontSize = 32;
        const fontSize = baseFontSize * scale;
        ctx.font = `${fontSize}px 'Noto Sans', system-ui, Avenir, Helvetica, 'Arial Unicode MS', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate the circle radii
        const outerRadius = 290 * scale;
        const middleRadius = 200 * scale;
        const innerRadius = 70 * scale;

        // Fill colour for the outer and middle segments
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

        // Draw outer circle (360 degree arc = 2 * PI radians)
        ctx.beginPath();
        ctx.arc(centreX, centreY, outerRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw middle circle
        ctx.beginPath();
        ctx.arc(centreX, centreY, middleRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw inner circle
        ctx.fillStyle = "rgb(210, 181, 140)";
        ctx.beginPath();
        ctx.arc(centreX, centreY, innerRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw lines from inner circle to outer circle using 30 degree spacing
        // First line is at 15 degrees because there isn't a line at 0 degrees
        const segmentCount = 12;
        const segmentAngle = 30;
        const lineAngles = [];
        for (let degrees = 15; degrees < 360; degrees += segmentAngle) {
            lineAngles.push(degrees);
            // Convert degrees to radians (subtract 90 because the canvas starts at 90 degrees, but we need to count from 0 degrees)
            const angleRad = (degrees - 90) * Math.PI / 180;

            // Calculate start and endpoint of line
            const startX = centreX + innerRadius * Math.cos(angleRad);
            const startY = centreY + innerRadius * Math.sin(angleRad);
            const endX = centreX + outerRadius * Math.cos(angleRad);
            const endY = centreY + outerRadius * Math.sin(angleRad);

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        // Add the first angle + 360 to close the circle for the last segment
        lineAngles.push(lineAngles[0] + 360);

        // Draw highlighted segment if one is selected
        if (highlightedSegment !== null) {
            const angle1 = lineAngles[highlightedSegment];
            const angle2 = lineAngles[highlightedSegment + 1];
            const angle1Rad = (angle1 - 90) * Math.PI / 180;
            const angle2Rad = (angle2 - 90) * Math.PI / 180;

            // Draw outer ring segment
            ctx.fillStyle = 'rgba(255, 200, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(centreX, centreY, outerRadius, angle1Rad, angle2Rad);
            ctx.lineTo(centreX + middleRadius * Math.cos(angle2Rad), centreY + middleRadius * Math.sin(angle2Rad));
            ctx.arc(centreX, centreY, middleRadius, angle2Rad, angle1Rad, true);
            ctx.closePath();
            ctx.fill();

            // Draw inner ring segment
            ctx.beginPath();
            ctx.arc(centreX, centreY, middleRadius, angle1Rad, angle2Rad);
            ctx.lineTo(centreX + innerRadius * Math.cos(angle2Rad), centreY + innerRadius * Math.sin(angle2Rad));
            ctx.arc(centreX, centreY, innerRadius, angle2Rad, angle1Rad, true);
            ctx.closePath();
            ctx.fill();

            // Fill the centre circle
            ctx.beginPath();
            ctx.arc(centreX, centreY, innerRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Display key signature in centre
            const key = MajorKey.getMajorKeysForCircleOfFifths()[highlightedSegment];
            const keySignature = MajorKey.getDualKeySignature(key);
            ctx.fillStyle = '#000000';
            ctx.fillText(`${keySignature}`, centreX, centreY);
        }

        // Set text color and draw key names in the middle of each segment
        ctx.fillStyle = '#000000';
        for (let i = 0; i < segmentCount; i++) {
            // Midpoint angle between two lines
            const angle1 = lineAngles[i];
            const angle2 = lineAngles[i + 1];
            const midAngle = ((angle1 + angle2) / 2);
            const midAngleRad = (midAngle - 90) * Math.PI / 180;
            const outerTextRadius = (middleRadius + outerRadius) / 2;
            const outerTextX = centreX + outerTextRadius * Math.cos(midAngleRad);
            const outerTextY = centreY + outerTextRadius * Math.sin(midAngleRad);
            ctx.fillText(MajorKey.getMajorKeysForCircleOfFifths()[i], outerTextX, outerTextY);

            const innerTextRadius = (innerRadius + middleRadius) / 2;
            const innerTextX = centreX + innerTextRadius * Math.cos(midAngleRad);
            const innerTextY = centreY + innerTextRadius * Math.sin(midAngleRad);
            ctx.fillText(MajorKey.getMinorKeys()[i], innerTextX, innerTextY);
        }
    };

    // Effect 1: redraw the canvas when selection state changes.
    // This keeps rendering updates tied only to app state transitions.
    useEffect(() => {
        drawCircle(selectedSegment);
    }, [selectedSegment]); // Redraw when selectedSegment changes

    // Effect 2: manage the browser resize listener lifecycle.
    // Keeping this separate avoids mixing subscription setup/cleanup with redraw-only logic.
    useEffect(() => {
        const handleResize = () => {
            drawCircle(selectedSegment);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [selectedSegment]);

    const circleClicked = (event: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get click position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const centreX = canvas.width / 2;
        const centreY = canvas.height / 2;

        // Calculate distance from centre
        const dx = clickX - centreX;
        const dy = clickY - centreY;

        // Calculate angle from centre (in degrees, with 0 at top, clockwise)
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        // Convert to 0-360 range with 0 at top
        angle = (angle + 90 + 360) % 360;

        // Determine which segment (0-11)
        const segmentAngle = 30;
        const segmentNumber = Math.floor((angle + 345) / segmentAngle) % 12;

        // If the clicked segment is already selected, deselect it and return
        if (selectedSegment !== null && selectedSegment === segmentNumber) {
            setSelectedSegment(null);
            return;
        }

        // Set the selected segment to highlight it
        setSelectedSegment(segmentNumber);
    }

    return (
        <div className="panel">
            <div className="panel-header">
                <h1>Circle of Fifths</h1>
                <HelpPanel message={[`The circle of fifths is a way of visualising all major keys and minor keys. The major keys are in the outer circle and their
                                      relative minor keys are in the inner circle.`,
                                     `The circle shows that one sharp is added to the key signature for each increasing fifth interval, by proceeding clockwise
                                      around the circle. Likewise, proceeding anti-clockwise around the circle shows that one flat is added for each increasing fourth interval.`,
                                      `Clicking on a segment of the circle will display the key signature associated with the key in that segment`]}/>
            </div>
            <canvas ref={canvasRef} id="circleOfFifths" onMouseDown={circleClicked}></canvas>
        </div>
    );
}

export default CircleOfFifths;

import Zdog, { type PathCommand } from 'zdog';
import { logoPath } from './logoPathData';

const size = 200;

function parseSVGPathToZdog(svgPath: string) {
	const commands = svgPath.match(/[MLCZV][^MLCZV]*/gi); // Include 'V' in the regex
	const zdogPath: PathCommand[] = [];
	let firstPoint: PathCommand | null = null; // Store the first point for closing the path later
	let lastPoint = { x: 0, y: 0 }; // Keep track of the last point for vertical moves
	let shouldClose = false; // Flag to determine if the path should be closed

	commands?.forEach(command => {
			const type = command[0].toUpperCase(); // Normalize command to handle lowercase as well
			const args = command.slice(1).trim().split(/[\s,]+/).map(Number);

			switch (type) {
					case 'M': // MoveTo
							lastPoint = { x: args[0], y: -args[1] }; // Update last point
							if (firstPoint === null) firstPoint = lastPoint; // Store the first point to close path later
							zdogPath.push({ move: lastPoint });
							break;
					case 'L': // LineTo
							lastPoint = { x: args[0], y: -args[1] }; // Update last point
							zdogPath.push({ line: lastPoint });
							break;
					case 'C': // Cubic Bezier Curve
							zdogPath.push({
									bezier: [
											{ x: args[0], y: -args[1] },
											{ x: args[2], y: -args[3] },
											{ x: args[4], y: -args[5] }
									]
							});
							lastPoint = { x: args[4], y: -args[5] }; // Update last point to the end of the bezier
							break;
					case 'V': // Vertical LineTo
							lastPoint = { x: lastPoint.x, y: -args[0] }; // Only update the y-coordinate
							zdogPath.push({ line: lastPoint });
							break;
					case 'Z': // ClosePath
							shouldClose = true;
							break;
			}
	});

	return zdogPath;
}

export const addShapes = (zdog: Zdog.Illustration) => {
	new Zdog.Polygon({
		addTo: zdog,
		sides: 6,
		stroke: 1,
		radius: size,
		color: 'url(#gradientA)',
		fill: true
	});

	new Zdog.Polygon({
		addTo: zdog,
		sides: 6,
		stroke: 1,
		radius: size * 0.9,
		color: "url(#gradientB)",
		fill: true,
		backface: "#4D4D4D",
		translate: { z: 10 }
	});

	new Zdog.Rect({
		addTo: zdog,
		width: size * 1,
		height: 2,
		stroke: 1,
		color: '#fff',
		translate: { y: size*.20, z: 40 },
		fill: true
	});


	new Zdog.Rect({
		addTo: zdog,
		width: size * 1,
		height: 2,
		stroke: 1,
		color: '#fff',
		translate: { y: -size*.20, z: 40 },
		fill: true
	})
};


export const addText = (zdog: Zdog.Illustration) => {
	const bold = new Zdog.Font({
		src: '/GlacialIndifference-Bold.ttf'
	});

	const thin = new Zdog.Font({
		src: '/GlacialIndifference-Regular.ttf'
	});

	new Zdog.Text({
		addTo: zdog,
		font: bold,
		value: 'Beginner',
		fill: true,
		fontSize: 32,
		translate: { y: 10, z: 70 },
		color: '#fff',
		textAlign: 'center',
		textBaseline: 'top',
		stroke: 1
	});


	new Zdog.Text({
		addTo: zdog,
		font: thin,
		value: '#000000'.split('').join(' '),
		fill: true,
		fontSize: 24,
		translate: { y: size*.50, z: 40 },
		color: '#fff',
		textAlign: 'center',
		textBaseline: 'top',
		stroke: 1
	});

	new Zdog.Text({
		addTo: zdog,
		font: thin,
		value: 'Certified',
		fill: true,
		fontSize: 24,
		translate: { y: -size*.30, z: 40 },
		color: '#fff',
		textAlign: 'center',
		textBaseline: 'top',
		stroke: 1
	});
};

export const addLogo = (zdog: Zdog.Illustration) => {
	new Zdog.Shape({
		addTo: zdog,
		path: parseSVGPathToZdog(logoPath),
		closed: true,
		stroke: .2,
		fill: true,
		scale: 0.09,
		rotate: {x: Zdog.TAU/2},
		translate: { z: 70, y: -130, x: -70},
		color: 'url(#gold)', // Adjust color based on gradient if needed
	});

	const artifex = new Zdog.Font({
		src: '/ArtifexCF-Regular.ttf'
	});
	const libel = new Zdog.Font({
		src: '/libel.TTF'
	});

	new Zdog.Text({
		addTo: zdog,
		font: artifex,
		value: 'RALTECH',
		fill: true,
		fontSize: 16,
		translate: { y: -115, z: 70, x: 20 },
		color: 'url(#gold-up)',
		textAlign: 'center',
		textBaseline: 'top',
		stroke: .5
	});

	new Zdog.Text({
		addTo: zdog,
		font: libel,
		value: 'SCHOOL'.split('').join('  '),
		fill: true,
		fontSize: 16,
		translate: { y: -95, z: 70, x: 10 },
		color: 'url(#gold-down)',
		textAlign: 'center',
		textBaseline: 'top',
		stroke: .05
	});
};
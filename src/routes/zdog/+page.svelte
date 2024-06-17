<script lang="ts">
	import { onMount } from 'svelte';
	import Zdog from 'zdog';

	import { cubicInOut, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { scale } from 'svelte/transition';
	import { addLogo, addShapes, addText } from './zdogCreator';

	const angle = tweened(0, {
		duration: 2000,
		easing: cubicInOut
	});

	let visible = false;

	let direction = 1;

	onMount(async () => {
		visible = true;
		const Zfont = (await import('zfont')).default;
		Zfont.init(Zdog);

		let illo = new Zdog.Illustration({
			// set canvas with selector
			element: '.zdog-canvas'
		});

		addShapes(illo);
		addText(illo);
		addLogo(illo);

		// update & render
		illo.updateRenderGraph();
		function animate() {
			// rotate illo each frame
			illo.rotate.y = $angle;
			illo.updateRenderGraph();
			// animate next frame
			requestAnimationFrame(animate);
		}
		// start animation
		animate();

		setInterval(() => {
      if (crazyRotating) return;
			if (direction === 1) angle.set(Math.PI / 4);
			else angle.set(-Math.PI / 4);
			direction *= -1;
		}, 2000);

		console.debug('Zdog animation started');

	});

  let crazyRotating = false;
  const crazyRotate = () => {
    const value = direction * (Math.PI / 4) * 48
    crazyRotating = true;
    angle.set(value).then(() => {
      crazyRotating = false;
    })
    console.log('crazyRotate', value);
    direction *= -1;
  }
</script>

<h1>Zdog animation</h1>
{#key visible}
	<svg
		in:scale={{ duration: 2000, easing: cubicOut, start: 0 }}
    on:mouseenter={() => crazyRotate()}
		class="zdog-canvas"
		width="500"
		height="500"
	></svg>
{/key}

<svg class="gradient-container">
	<defs>
		<linearGradient id="gradientA" x1="0%" y1="100%" x2="0%" y2="0%">
			<stop offset="0%" stop-color="#373737" />
			<stop offset="100%" stop-color="#9D9D9D" />
		</linearGradient>
		<linearGradient id="gradientB">
			<stop offset="0%" stop-color="#1e1e1e" />
			<stop offset="100%" stop-color="#4D4D4D" />
		</linearGradient>
		<linearGradient id="gold" x1="50%" y1="0%" x2="50%" y2="100%" r>
			<stop offset="0%" stop-color="#FDED97" stop-opacity="1" />
			<stop offset="50%" stop-color="#DDA323" />
			<stop offset="90%" stop-color="#EBB844" />
			<stop offset="100%" stop-color="#FDED97" stop-opacity="0.82" />
		</linearGradient>
		<linearGradient id="gold-up" x1="50%" y1="0%" x2="50%" y2="100%" r>
			<stop offset="0%" stop-color="#FDED97" stop-opacity="1" />
			<stop offset="90%" stop-color="#DDA323" />
		</linearGradient>
		<linearGradient id="gold-down" x1="50%" y1="0%" x2="50%" y2="100%" r>
			<stop offset="30%" stop-color="#EBB844" />
			<stop offset="90%" stop-color="#FDED97" stop-opacity="0.82" />
		</linearGradient>
		<defs> </defs></defs
	></svg
>

<style>
	.gradient-container {
		height: 0;
		width: 0;
	}
	.zdog-canvas {
		width: 500px;
		height: 500px;
	}
</style>

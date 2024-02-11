import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';
import chroma from 'chroma-js';

import { validateColor } from './utils';
import { toHct } from './colorFunctions';

export type paletteTailwind = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

export function generateTonalPalette(
	color: string | chroma.Color,
	mode: 'mcu' | 'chroma' | 'chromaBlended' = 'mcu',
	cssHsl: boolean
): paletteTailwind {
	validateColor(color);

	let tonalPaletteHex: paletteTailwind;
	if (mode === 'mcu') {
		tonalPaletteHex = generateTonalPaletteMCU(color);
	} else if (mode === 'chroma') {
		tonalPaletteHex = generateTonalPaletteChroma(color);
	} else if (mode === 'chromaBlended') {
		tonalPaletteHex = generateTonalPaletteChromaBlended(color);
	}

	if (cssHsl) {
		Object.entries(tonalPaletteHex).forEach(([key, value]) => {
			tonalPaletteHex[key] = chroma(value).css('hsl');
		});
	}
	return tonalPaletteHex;
}

export function generateTonalPaletteMCU(color: string | chroma.Color): paletteTailwind {
	// const stepsMCU = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
	validateColor(color);
	const tonalPalette = TonalPalette.fromHct(toHct(color));
	return {
		50: hexFromArgb(tonalPalette.tone(95)),
		100: hexFromArgb(tonalPalette.tone(90)),
		200: hexFromArgb(tonalPalette.tone(80)),
		300: hexFromArgb(tonalPalette.tone(70)),
		400: hexFromArgb(tonalPalette.tone(60)),
		500: hexFromArgb(tonalPalette.tone(50)),
		600: hexFromArgb(tonalPalette.tone(40)),
		700: hexFromArgb(tonalPalette.tone(30)),
		800: hexFromArgb(tonalPalette.tone(20)),
		900: hexFromArgb(tonalPalette.tone(10)),
		950: hexFromArgb(tonalPalette.tone(5)),
	};
}

export function generateTonalPaletteChroma(
	color: string | chroma.Color,
	mode: 'hsl' | 'rgb' | 'oklab' | 'oklch' = 'oklch'
): paletteTailwind {
	// Chroma's Colorscale works backwards than the tailwinds/material format
	const stepsTailwind = [11, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	validateColor(color);
	let darkest = chroma(color).luminance(stepsTailwind[0] / 1000, mode);
	let brightest = chroma(color).luminance(stepsTailwind[stepsTailwind.length - 1] / 1000, mode);
	let colorScale = chroma.scale([brightest, color, darkest]).mode(mode);

	let palette = {};
	for (let i = 0; i <= stepsTailwind.length; i++) {
		palette[i] = colorScale(stepsTailwind[i] / 1000).hex();
	}
	return {
		50: palette[0],
		100: palette[1],
		200: palette[2],
		300: palette[3],
		400: palette[4],
		500: palette[5],
		600: palette[6],
		700: palette[7],
		800: palette[8],
		900: palette[9],
		950: palette[10],
	};
}

function generateTonalPaletteChromaBlended(colorInput: string | chroma.Color): paletteTailwind {
	type ColorMode = 'oklab' | 'oklch' | 'hsl';
	const modes: ColorMode[] = ['oklab', 'oklch', 'hsl'];
	let initialPalettes = modes.map((mode) => generateTonalPaletteChroma(colorInput, mode));
	let paletteOutput = generateTonalPaletteChroma(colorInput);

	Object.keys(paletteOutput).forEach((key) => {
		let colors: chroma.Color[] = [];
		for (let palette of initialPalettes) {
			colors.push(palette[key]);
		}
		paletteOutput[key] = chroma.average(colors, 'oklch', [1, 1, 1.33]);
	});
	return paletteOutput;
}

import chroma from 'chroma-js';
import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

import { toHct, validateColor, toOklch } from './colorFunctions';

export type CustomTonalPalette = {
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
	mode: 'mcu' | 'chroma' | 'chromaBlended' = 'mcu'
): CustomTonalPalette {
	validateColor(color);

	let tonalPaletteHex: CustomTonalPalette;
	if (mode === 'chroma') {
		tonalPaletteHex = generateTonalPaletteChroma(color);
	} else if (mode === 'chromaBlended') {
		tonalPaletteHex = generateTonalPaletteChromaBlended(color);
	} else {
		tonalPaletteHex = generateTonalPaletteMCU(color);
	}
	return tonalPaletteHex;
}
export function generateTwTonalPaletteVars(paletteName: string): CustomTonalPalette {
	return {
		50: `oklch(var(--colors-${paletteName}-50) / <alpha-value>)`,
		100: `oklch(var(--colors-${paletteName}-100) / <alpha-value>)`,
		200: `oklch(var(--colors-${paletteName}-200) / <alpha-value>)`,
		300: `oklch(var(--colors-${paletteName}-300) / <alpha-value>)`,
		400: `oklch(var(--colors-${paletteName}-400) / <alpha-value>)`,
		500: `oklch(var(--colors-${paletteName}-500) / <alpha-value>)`,
		600: `oklch(var(--colors-${paletteName}-600) / <alpha-value>)`,
		700: `oklch(var(--colors-${paletteName}-700) / <alpha-value>)`,
		800: `oklch(var(--colors-${paletteName}-800) / <alpha-value>)`,
		900: `oklch(var(--colors-${paletteName}-900) / <alpha-value>)`,
		950: `oklch(var(--colors-${paletteName}-950) / <alpha-value>)`,
	};
}

function generateTonalPaletteMCU(color: string | chroma.Color): CustomTonalPalette {
	// const stepsMCU = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
	validateColor(color);
	const tonalPalette = TonalPalette.fromHct(toHct(color));
	return {
		50: toOklch(hexFromArgb(tonalPalette.tone(95))),
		100: toOklch(hexFromArgb(tonalPalette.tone(90))),
		200: toOklch(hexFromArgb(tonalPalette.tone(80))),
		300: toOklch(hexFromArgb(tonalPalette.tone(70))),
		400: toOklch(hexFromArgb(tonalPalette.tone(60))),
		500: toOklch(hexFromArgb(tonalPalette.tone(50))),
		600: toOklch(hexFromArgb(tonalPalette.tone(40))),
		700: toOklch(hexFromArgb(tonalPalette.tone(30))),
		800: toOklch(hexFromArgb(tonalPalette.tone(20))),
		900: toOklch(hexFromArgb(tonalPalette.tone(10))),
		950: toOklch(hexFromArgb(tonalPalette.tone(5))),
	};
}

function generateTonalPaletteChroma(
	color: string | chroma.Color,
	mode: 'hsl' | 'rgb' | 'oklab' | 'oklch' = 'oklch'
): CustomTonalPalette {
	// Chroma's Colorscale works backwards than the tailwinds/material format
	const stepsTailwind = [11, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	validateColor(color);
	let darkest = chroma(color).luminance(stepsTailwind[0] / 1000, mode);
	let brightest = chroma(color).luminance(stepsTailwind[stepsTailwind.length - 1] / 1000, mode);
	let colorScale = chroma.scale([brightest, color, darkest]).mode(mode);

	let palette = {};
	for (let i = 0; i <= stepsTailwind.length; i++) {
		palette[i] = colorScale(stepsTailwind[i] / 1000).css();
	}
	return {
		50: toOklch(palette[0]),
		100: toOklch(palette[1]),
		200: toOklch(palette[2]),
		300: toOklch(palette[3]),
		400: toOklch(palette[4]),
		500: toOklch(palette[5]),
		600: toOklch(palette[6]),
		700: toOklch(palette[7]),
		800: toOklch(palette[8]),
		900: toOklch(palette[9]),
		950: toOklch(palette[10]),
	};
}

function generateTonalPaletteChromaBlended(colorInput: string | chroma.Color): CustomTonalPalette {
	type ColorMode = 'oklab' | 'oklch' | 'hsl';
	const modes: ColorMode[] = ['oklab', 'oklch', 'hsl'];
	let initialPalettes = modes.map((mode) => generateTonalPaletteChroma(colorInput, mode));
	let paletteOutput = generateTonalPaletteChroma(colorInput);

	Object.keys(paletteOutput).forEach((key) => {
		let colors: chroma.Color[] = [];
		for (let palette of initialPalettes) {
			colors.push(palette[key]);
		}
		paletteOutput[key] = toOklch(chroma.average(colors, 'oklch', [1, 1, 1.33]));
	});
	return paletteOutput;
}

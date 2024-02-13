import chroma from 'chroma-js';
import { hexFromArgb, TonalPalette } from '@material/material-color-utilities';

import { toHct, validateColor, toOklchCss } from './colorFunctions';

export type paletteTw = {
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
): paletteTw {
	validateColor(color);

	let tonalPaletteHex: paletteTw;
	if (mode === 'mcu') {
		tonalPaletteHex = generateTonalPaletteMCU(color);
	} else if (mode === 'chroma') {
		tonalPaletteHex = generateTonalPaletteChroma(color);
	} else if (mode === 'chromaBlended') {
		tonalPaletteHex = generateTonalPaletteChromaBlended(color);
	}
	return tonalPaletteHex;
}

export function generateTonalPaletteMCU(color: string | chroma.Color): paletteTw {
	// const stepsMCU = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
	validateColor(color);
	const tonalPalette = TonalPalette.fromHct(toHct(color));
	return {
		50: toOklchCss(hexFromArgb(tonalPalette.tone(95))),
		100: toOklchCss(hexFromArgb(tonalPalette.tone(90))),
		200: toOklchCss(hexFromArgb(tonalPalette.tone(80))),
		300: toOklchCss(hexFromArgb(tonalPalette.tone(70))),
		400: toOklchCss(hexFromArgb(tonalPalette.tone(60))),
		500: toOklchCss(hexFromArgb(tonalPalette.tone(50))),
		600: toOklchCss(hexFromArgb(tonalPalette.tone(40))),
		700: toOklchCss(hexFromArgb(tonalPalette.tone(30))),
		800: toOklchCss(hexFromArgb(tonalPalette.tone(20))),
		900: toOklchCss(hexFromArgb(tonalPalette.tone(10))),
		950: toOklchCss(hexFromArgb(tonalPalette.tone(5))),
	};
}

export function generateTonalPaletteChroma(
	color: string | chroma.Color,
	mode: 'hsl' | 'rgb' | 'oklab' | 'oklch' = 'oklch'
): paletteTw {
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
		50: toOklchCss(palette[0]),
		100: toOklchCss(palette[1]),
		200: toOklchCss(palette[2]),
		300: toOklchCss(palette[3]),
		400: toOklchCss(palette[4]),
		500: toOklchCss(palette[5]),
		600: toOklchCss(palette[6]),
		700: toOklchCss(palette[7]),
		800: toOklchCss(palette[8]),
		900: toOklchCss(palette[9]),
		950: toOklchCss(palette[10]),
	};
}

export function generateTonalPaletteChromaBlended(colorInput: string | chroma.Color): paletteTw {
	type ColorMode = 'oklab' | 'oklch' | 'hsl';
	const modes: ColorMode[] = ['oklab', 'oklch', 'hsl'];
	let initialPalettes = modes.map((mode) => generateTonalPaletteChroma(colorInput, mode));
	let paletteOutput = generateTonalPaletteChroma(colorInput);

	Object.keys(paletteOutput).forEach((key) => {
		let colors: chroma.Color[] = [];
		for (let palette of initialPalettes) {
			colors.push(palette[key]);
		}
		paletteOutput[key] = toOklchCss(chroma.average(colors, 'oklch', [1, 1, 1.33]));
	});
	return paletteOutput;
}

export function generateTonalPaletteVars(paletteName: string): paletteTw {
	return {
		50: `var(--colors-${paletteName}-50)`,
		100: `var(--colors-${paletteName}-100)`,
		200: `var(--colors-${paletteName}-200)`,
		300: `var(--colors-${paletteName}-300)`,
		400: `var(--colors-${paletteName}-400)`,
		500: `var(--colors-${paletteName}-500)`,
		600: `var(--colors-${paletteName}-600)`,
		700: `var(--colors-${paletteName}-700)`,
		800: `var(--colors-${paletteName}-800)`,
		900: `var(--colors-${paletteName}-900)`,
		950: `var(--colors-${paletteName}-950)`,
	};
}

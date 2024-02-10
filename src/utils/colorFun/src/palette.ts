import { hexFromArgb, argbFromHex, TonalPalette } from '@material/material-color-utilities';
import chroma from 'chroma-js';

import { validateColor } from './utils';

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

// const stepsMCU = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
// const stepsTailwind = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function generateTonalPalette(color: string | chroma.Color): paletteTailwind {
	validateColor(color);
	const colorHex = chroma(color).hex();
	const colorARGB = argbFromHex(colorHex);

	const tonalPalette = TonalPalette.fromInt(colorARGB);
	return {
		50: chroma(hexFromArgb(tonalPalette.tone(95))).css(),
		100: chroma(hexFromArgb(tonalPalette.tone(90))).css(),
		200: chroma(hexFromArgb(tonalPalette.tone(80))).css(),
		300: chroma(hexFromArgb(tonalPalette.tone(70))).css(),
		400: chroma(hexFromArgb(tonalPalette.tone(60))).css(),
		500: chroma(hexFromArgb(tonalPalette.tone(50))).css(),
		600: chroma(hexFromArgb(tonalPalette.tone(40))).css(),
		700: chroma(hexFromArgb(tonalPalette.tone(30))).css(),
		800: chroma(hexFromArgb(tonalPalette.tone(20))).css(),
		900: chroma(hexFromArgb(tonalPalette.tone(10))).css(),
		950: chroma(hexFromArgb(tonalPalette.tone(5))).css(),
	};
}

// export function paletteChroma(color: string | chroma.Color, mode: 'hsl' | 'rgb' | 'oklab' | 'oklch'  = 'oklch'): Record<number, string> {
//     validateColor(color);
//     let darkest = chroma(color).luminance(stepsTailwind[0] / 1000, mode);
//     let brightest = chroma(color).luminance(stepsTailwind[stepsTailwind.length - 1] / 1000, mode);
//     let colorScale = chroma.scale([brightest, color, darkest]).mode(mode);

//     const palette  = {};
//     for (let i = 0; i <= stepsTailwind.length; i++) {
//       palette[stepsTailwind[i]] = colorScale(stepsTailwind[i] / 1000).hex();
//     }
//     return palette;
// }

// function generateBlendedPalette(
//     colorInput: string | chroma.Color,
//     ): paletteMaterialDesign {
//     type ColorMode = 'oklab' | 'oklch' | 'hsl';
//     const modes: ColorMode[] = ['oklab', 'oklch', 'hsl']
//     colorFunctions.validateColor(colorInput);
//     let initialPalettes: paletteMaterialDesign[] = modes.map(mode => generatePalette(colorInput, mode));
//     let paletteOutput: paletteMaterialDesign = generatePalette(colorInput);
//     Object.keys(paletteOutput).forEach((key) => {
//       let colors: chroma.Color[] = [];
//       for (let palette of initialPalettes) {
//         colors.push(palette[key]);
//       }
//       paletteOutput[key] = chroma.average(colors, 'oklch', [1, 1, 1.33]);
//     });
//     return paletteOutput;
//   }

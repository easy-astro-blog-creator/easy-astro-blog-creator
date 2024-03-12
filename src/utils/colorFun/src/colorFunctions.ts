import chroma from 'chroma-js';
import { Hct, argbFromHex } from '@material/material-color-utilities';

export function toHct(color: string | chroma.Color): Hct {
	validateColor(color);
	return Hct.fromInt(argbFromHex(chroma(color).hex()));
}

export function toOklch(color: string | chroma.Color): string {
	validateColor(color);
	const oklchColor = chroma(color).oklch();
	return `${oklchColor[0] * 100}% ${oklchColor[1]} ${oklchColor[2]}`;
}
export function toOklchHue(color: string | chroma.Color): string {
	validateColor(color);
	const oklchColor = chroma(color).oklch();
	return oklchColor[2].toString();
}
export function OklchToRGB(color: string | chroma.Color): string {
	validateColor(color);
	const rgbColor = chroma(color).rgb();
	return `${rgbColor[0]} ${rgbColor[1]} ${rgbColor[2]}`;
}

export function complemetaryColor(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color {
	validateColor(inputColor);
	if (mode === 'hsl') {
		return chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360);
	} else {
		return chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360);
	}
}

export function complemetarySplitColors(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color[] {
	validateColor(inputColor);
	if (mode === 'hsl') {
		const splitComplement1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 150) % 360);
		const splitComplement2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 210) % 360);
		return [splitComplement1, splitComplement2];
	} else {
		const splitComplement1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 150) % 360);
		const splitComplement2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 210) % 360);
		return [splitComplement1, splitComplement2];
	}
}

export function analogousColors(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color[] {
	validateColor(inputColor);
	if (mode === 'hsl') {
		const analogous1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 24) % 360);
		const analogous2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 45) % 360);
		const analogous3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') - 24) % 360);
		const analogous4 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') - 45) % 360);
		return [analogous1, analogous2, analogous3, analogous4];
	} else {
		const analogous1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 24) % 360);
		const analogous2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 45) % 360);
		const analogous3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') - 24) % 360);
		const analogous4 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') - 45) % 360);
		return [analogous1, analogous2, analogous3, analogous4];
	}
}

export function triadicColors(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color[] {
	validateColor(inputColor);
	if (mode === 'hsl') {
		const triadic1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 120) % 360);
		const triadic2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 240) % 360);
		return [triadic1, triadic2];
	} else {
		const triadic1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 120) % 360);
		const triadic2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 240) % 360);
		return [triadic1, triadic2];
	}
}

export function tetradicColors(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color[] {
	validateColor(inputColor);
	if (mode === 'hsl') {
		const tetradic1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 60) % 360);
		const tetradic2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360);
		const tetradic3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 240) % 360);
		return [tetradic1, tetradic2, tetradic3];
	} else {
		const tetradic1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 60) % 360);
		const tetradic2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360);
		const tetradic3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 240) % 360);
		return [tetradic1, tetradic2, tetradic3];
	}
}
export function squareColors(inputColor: string | chroma.Color, mode: 'hsl' | 'oklch' = 'oklch'): chroma.Color[] {
	validateColor(inputColor);
	if (mode === 'hsl') {
		const square1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 90) % 360);
		const square2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360);
		const square3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 270) % 360);
		return [square1, square2, square3];
	} else {
		const square1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 90) % 360);
		const square2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360);
		const square3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 270) % 360);
		return [square1, square2, square3];
	}
}

export function sortColorsByP(testColors: chroma.Color[], param: 'l' | 'c' | 'h') {
	for (let i = 0; i < testColors.length - 1; i++) {
		for (let j = 0; j < testColors.length - i - 1; j++) {
			const color1 = testColors[j];
			const color2 = testColors[j + 1];
			const value1 = chroma(color1).get(`oklch.${param}`);
			const value2 = chroma(color2).get(`oklch.${param}`);
			if (value1 > value2) {
				[testColors[j], testColors[j + 1]] = [testColors[j + 1], testColors[j]];
			}
		}
	}
	return testColors;
}

export function findClosestSchemeHue(matchColor: chroma.Color | string, testColors: { [key: string]: [chroma.Color] }): string {
	validateColor(matchColor);
	let closestScheme = '';
	let closestMatch = Infinity;
	Object.entries(testColors).forEach(([schemeName, schemeColors]) => {
		const normalizedSchemeColors = Array.isArray(schemeColors) ? schemeColors : [schemeColors];
		normalizedSchemeColors.forEach((schemeColor) => {
			const difference = getDifferenceHue(matchColor, schemeColor);
			if (closestMatch === 0 || difference < closestMatch) {
				closestMatch = difference;
				closestScheme = schemeName;
			}
		});
	});
	return closestScheme;
}

export function sortColorsByDifferenceHue(matchColor: chroma.Color | string, testColors: chroma.Color[]) {
	const huesWithDifferences = testColors.map((hue) => {
		let difference = getDifferenceHue(matchColor, hue);
		return { hue, difference };
	});
	huesWithDifferences.sort((a, b) => a.difference - b.difference);
	return huesWithDifferences.map((item) => item.hue);
}

export function getDifferenceHue(color1: chroma.Color | string, color2: chroma.Color | string) {
	let difference = Math.abs(chroma(color1).get('oklch.h') - chroma(color2).get('oklch.h'));
	difference = difference > 180 ? 360 - difference : difference;
	return difference;
}

export function validateColor(color: string | chroma.Color) {
	if (!chroma.valid(color)) {
		throw new Error(`Invalid color: ${color}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
	}
}
export function validateColorFromForm(color: string | chroma.Color): string | undefined {
	if (!chroma.valid(color, 'hex')) {
		return;
	}
	return chroma(color).hex();
}
export function validateColorFromRange(l: string, c: string, h: string): string | undefined {
	const color = chroma.oklch(Number(l), Number(c), Number(h)).hex();
	if (!chroma.valid(color, 'hex')) {
		console.log('invalid color: ', color);
		return;
	}
	return chroma(color).hex();
}

import { DynamicScheme, MaterialDynamicColors, hexFromArgb } from '@material/material-color-utilities';
import chroma from 'chroma-js';
import { findContrastLevel, adjustContrastViaLuminance } from './checkContrast';
import { SchemeVariant, MaterialColorUtilitiesScheme, generateDynamicScheme, createSchemeObject } from './scheme';
import { validateColor } from './utils';
import { generateTonalPalette, paletteTailwind } from './palette';

export type CustomThemeConfig = {
	/**
	 * The primary color for the theme. This color is used most frequently across the UI and imparts a distinct identity to the product.
	 * This color is required.
	 * Can be any valid CSS color format, including hex, rgb, rgba, hsl, hsla, and named colors.
	 * @see validateColor
	 */
	primary: string;
	/**
	 * A type for the color scheme, expected to be one of the values in the `SchemeVariant` enum.
	 * If not provided, the default value is `SchemeVariant.TONAL_SPOT`
	 * @default SchemeVariant.TONAL_SPOT
	 * @see SchemeVariant
	 */
	schemeVariant: SchemeVariant | undefined;
	/**
	 * Optional Colors.
	 * If all supplied @see SchemeTypeMCU is not used.
	 * Otherwise, if any supplied the supplied will be used to generate that color of the scheme.
	 */
	secondary: string | undefined;
	tertiary: string | undefined;
	neutral: string | undefined;
	neutralVarient: string | undefined;
};

export function genenerateTailwindTheme(themeConfig: CustomThemeConfig): TailwindTheme {
	const lightScheme = generateDynamicScheme(themeConfig, false);
	const darkScheme = generateDynamicScheme(themeConfig, true);

	const semanticScheme = createSchemeObject(lightScheme, darkScheme);
	const primaryPalette = hexFromArgb(MaterialDynamicColors.primaryPaletteKeyColor.getArgb(lightScheme));
	const secondaryPalette = hexFromArgb(MaterialDynamicColors.secondaryPaletteKeyColor.getArgb(lightScheme));
	const tertiaryPalette = hexFromArgb(MaterialDynamicColors.tertiaryPaletteKeyColor.getArgb(lightScheme));
	const neutralPalette = hexFromArgb(MaterialDynamicColors.neutralPaletteKeyColor.getArgb(lightScheme));
	const neutralVariantPalette = hexFromArgb(MaterialDynamicColors.neutralVariantPaletteKeyColor.getArgb(lightScheme));
	return {
		colors: {
			semantic: semanticScheme,
			'primary-palette': generateTonalPalette(primaryPalette, 'mcu', true),
			'secondary-palette': generateTonalPalette(secondaryPalette, 'mcu', true),
			'tertiary-palette': generateTonalPalette(tertiaryPalette, 'mcu', true),
			'neutral-palette': generateTonalPalette(neutralPalette, 'mcu', true),
			'neutral-variant-palette': generateTonalPalette(neutralVariantPalette, 'mcu', true),
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000000',
			white: '#ffffff',
		},
		fontFamily: {
			sans: ['REM', 'sans-serif'],
		},
	};
}

type TailwindTheme = {
	colors: {
		semantic: MaterialColorUtilitiesScheme;
		'primary-palette': paletteTailwind;
		'secondary-palette': paletteTailwind;
		'tertiary-palette': paletteTailwind;
		'neutral-palette': paletteTailwind;
		'neutral-variant-palette': paletteTailwind;
		transparent: 'transparent';
		current: 'currentColor';
		black: '#000000';
		white: '#ffffff';
	};
	fontFamily: {
		[key: string]: string[];
	};
};

type DaisyuiTheme = {
	primary: string;
	'primary-content': string;
	secondary: string;
	'secondary-content': string;
	accent: string;
	'accent-content': string;
	neutral: string;
	'neutral-content': string;
	'base-100': string;
	'base-200': string;
	'base-300': string;
	'base-content': string;
	info: string;
	success: string;
	warning: string;
	'warning-content': string;
	error: string;
	'error-content': string;
};

// type linkPalette = {
// initial: string;
// visited: string;
// active: string;
// }

// type textPalette = {
// lighter: string;
// default: string;
// darker: string;
// }

// Primary color palette
// text - light and dark
// background - light and dark
// links - initial, visited, active - light and dark

// backgroundImage: {
//   // 'gradient-light': 'linear-gradient(to bottom, #f2f9fd, #ebf7fa, #e4f4f6, #ddf2f1, #d8efea)',
//   'gradient-light': `linear-gradient(to bottom, ${backgroundColor['50']}, ${backgroundColor['200']})`,
//   'gradient-light-short': `linear-gradient(to bottom, ${secondary['200']}, ${secondary['100']})`,
//   'gradient-dark': `linear-gradient(to bottom, ${backgroundColor['800']}, ${backgroundColor['900']}, ${backgroundColor['950']})`,
// },

// // Wikipedia's text color converted to OKLCH
// const defaultText = '#202122';
// const defaultTextH = .2471;
// const defaultTextS = .002;
// const defaultTextL = .24792;

// function generateTextColor(colorInput: string | chroma.Color, bgColorInput: string | chroma.Color, mode: 'light' | 'dark'): textPalette {
// colorFunctions.validateColor(colorInput);
// colorFunctions.validateColor(bgColorInput);

// const initialColor = chroma(defaultText).set('oklch.h', chroma(colorInput).get('oklch.h'));

// const sortedByL = colorFunctions.sortColorsByP([
//   findContrastLevel(initialColor, bgColorInput, 'highest', 9, 7),
//   findContrastLevel(initialColor, bgColorInput, 'lowest', 9, 4.5),
//   findContrastLevel(initialColor, bgColorInput, 'middle', 9, 7)],
//   'l');

// let mostContrast = sortedByL[0];
// let mediumContrast = sortedByL[1];
// let leastContrast = sortedByL[2];

// return {
//   lighter: leastContrast.css('hsl'),
//   default: mediumContrast.css('hsl'),
//   darker: mostContrast.css('hsl'),
// }
// }

// // Hue 220%
// const defaultInitialLink = '#3366CC';
// const defaultIitialLinkL = .5325;
// const defaultIitialLinkC = .168;
// const defaultIitialLinkH = .26229;

// // Hue 260%
// const defaultVisitedLink = '#795CB2';
// const defaultVisitedLinkL = .5431;
// const defaultVisitedLinkC = .132;
// const defaultVisitedLinkH = .29737;

// // Hue 40%
// const defaultActiveLink = '#faa700';
// const defaultActiveLinkL = .7904;
// const defaultActiveLinkC = .16793516725277677;
// const defaultActiveLinkH = .7348992356913826;

// function generateLinkPalette(textColor: string | chroma.Color, primaryColorInput: string | chroma.Color , bgColorInput: string | chroma.Color): linkPalette {
//   colorFunctions.validateColor(textColor);
//   colorFunctions.validateColor(primaryColorInput);
//   colorFunctions.validateColor(bgColorInput);

//   const closestColors = colorFunctions.complemetarySplitColors(primaryColorInput);

//   let closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultInitialLink, closestColors);
//   const newInitialLinkH = closestColorsSorted.shift().get('oklch.h');
//   closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultVisitedLink, closestColorsSorted);
//   const newVisitedLinkH = closestColorsSorted.shift().get('oklch.h');
//   closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultActiveLink, closestColorsSorted);
//   const newActiveLinkH = closestColorsSorted.shift().get('oklch.h');

//   const newInitialLink = chroma(defaultInitialLink).set('oklch.h', newInitialLinkH);
//   const newVisitedLink = chroma(defaultVisitedLink).set('oklch.h', newVisitedLinkH);
//   const newActiveLink = chroma(defaultActiveLink).set('oklch.h', newActiveLinkH);
//   const finalInitialLink = findContrastLevel(newInitialLink, textColor, 'first', 9, 9);
//   const finalVisitedLink = findContrastLevel(newVisitedLink, textColor, 'first', 9, 7);
//   const finalActiveLink = findContrastLevel(newActiveLink, textColor, 'first', 9, 4.5);
//   return {
//     initial: finalInitialLink.css('hsl'),
//     visited: finalVisitedLink.css('hsl'),
//     active: finalActiveLink.css('hsl'),
//   }

// }

// function generateAccents(colorInput: string | chroma.Color, bgColorInput: string | chroma.Color): accentPalette {
//   colorFunctions.validateColor(colorInput);
//   colorFunctions.validateColor(bgColorInput);
//   const complementary = colorFunctions.complemetaryColor(colorInput);
//   const complementarySplits = colorFunctions.complemetarySplitColors(colorInput);

//   return {
//     primary: findContrastLevel(colorInput, bgColorInput, 'first', 9, 3).css('hsl'),
//     complementary: findContrastLevel(complementary, bgColorInput, 'first', 9, 3).css('hsl'),
//     complementarySplit1: findContrastLevel(complementarySplits[1], bgColorInput, 'first', 9, 3).css('hsl'),
//     complementarySplit2: findContrastLevel(complementarySplits[2], bgColorInput, 'first', 9, 3).css('hsl'),
//   }
// }

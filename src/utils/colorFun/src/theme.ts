import { DynamicScheme, MaterialDynamicColors, hexFromArgb } from '@material/material-color-utilities';
import { SchemeVariant, McuScheme, MCU_SCHEME_VARS, generateDynamicScheme, createSchemeObject } from './scheme';
import { generateTonalPalette, paletteTw, generateTonalPaletteVars } from './palette';

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

type TailwindTheme = {
	colors: {
		semantic: McuScheme;
		primary: paletteTw;
		secondary: paletteTw;
		tertiary: paletteTw;
		neutral: paletteTw;
		'neutral-variant': paletteTw;
		transparent: 'transparent';
		current: 'currentColor';
		black: '#000000';
		white: '#ffffff';
	};
	variables: {
		DEFAULT: {
			colors: {
				semantic: typeof MCU_SCHEME_VARS;
				primary: paletteTw;
				secondary: paletteTw;
				tertiary: paletteTw;
				neutral: paletteTw;
				'neutral-variant': paletteTw;
				transparent: 'transparent';
				current: 'currentColor';
				black: '#000000';
				white: '#ffffff';
			};
		};
	};
	darkVariables: {
		DEFAULT: {
			colors: {
				semantic: typeof MCU_SCHEME_VARS;
				primary: paletteTw;
				secondary: paletteTw;
				tertiary: paletteTw;
				neutral: paletteTw;
				'neutral-variant': paletteTw;
				transparent: 'transparent';
				current: 'currentColor';
				black: '#000000';
				white: '#ffffff';
			};
		};
	};
};

export function genenerateTailwindTheme(themeConfig: CustomThemeConfig): TailwindTheme {
	const lightScheme = generateDynamicScheme(themeConfig, false);
	const darkScheme = generateDynamicScheme(themeConfig, true);

	const primaryPalette = generateTonalPalette(
		hexFromArgb(MaterialDynamicColors.primaryPaletteKeyColor.getArgb(lightScheme)),
		'mcu'
	);
	const secondaryPalette = generateTonalPalette(
		hexFromArgb(MaterialDynamicColors.secondaryPaletteKeyColor.getArgb(lightScheme)),
		'mcu'
	);
	const tertiaryPalette = generateTonalPalette(
		hexFromArgb(MaterialDynamicColors.tertiaryPaletteKeyColor.getArgb(lightScheme)),
		'mcu'
	);
	const neutralPalette = generateTonalPalette(
		hexFromArgb(MaterialDynamicColors.neutralPaletteKeyColor.getArgb(lightScheme)),
		'mcu'
	);
	const neutralVariantPalette = generateTonalPalette(
		hexFromArgb(MaterialDynamicColors.neutralVariantPaletteKeyColor.getArgb(lightScheme)),
		'mcu'
	);

	return {
		colors: {
			semantic: MCU_SCHEME_VARS,
			primary: generateTonalPaletteVars('primary'),
			secondary: generateTonalPaletteVars('secondary'),
			tertiary: generateTonalPaletteVars('tertiary'),
			neutral: generateTonalPaletteVars('neutral'),
			'neutral-variant': generateTonalPaletteVars('neutral-variant'),
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000000',
			white: '#ffffff',
		},
		variables: {
			DEFAULT: {
				colors: {
					semantic: createSchemeObject(lightScheme),
					primary: primaryPalette,
					secondary: secondaryPalette,
					tertiary: tertiaryPalette,
					neutral: neutralPalette,
					'neutral-variant': neutralVariantPalette,
					transparent: 'transparent',
					current: 'currentColor',
					black: '#000000',
					white: '#ffffff',
				},
			},
		},
		darkVariables: {
			DEFAULT: {
				colors: {
					semantic: createSchemeObject(darkScheme),
					primary: primaryPalette,
					secondary: secondaryPalette,
					tertiary: tertiaryPalette,
					neutral: neutralPalette,
					'neutral-variant': neutralVariantPalette,
					transparent: 'transparent',
					current: 'currentColor',
					black: '#000000',
					white: '#ffffff',
				},
			},
		},
	};
}

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

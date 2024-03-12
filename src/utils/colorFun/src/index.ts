// src/index.ts

import { CustomThemeConfig, genenerateTailwindTheme } from './theme';
import { generateDynamicScheme, SchemeVariant } from './scheme';
import { CustomTonalPalette } from './palette';
import { updateTailwindTheme } from './interactive';
import { validateColor, validateColorFromForm, validateColorFromRange, toOklch, toOklchHue, OklchToRGB } from './colorFunctions';

export {
	genenerateTailwindTheme,
	updateTailwindTheme,
	SchemeVariant,
	generateDynamicScheme,
	validateColor,
	validateColorFromForm,
	validateColorFromRange,
	toOklch,
	toOklchHue,
	OklchToRGB,
};

export type { CustomTonalPalette, CustomThemeConfig };

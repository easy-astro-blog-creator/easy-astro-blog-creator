// src/index.ts

import { CustomThemeConfig, genenerateTailwindTheme } from './theme';
import { generateDynamicScheme, SchemeVariant } from './scheme';
import { findContrastLevel } from './checkContrast';
import { paletteTw } from './palette';
import { updateTailwindTheme } from './interactive';
import { validateColor, validateColorFromForm } from './colorFunctions';

export {
	genenerateTailwindTheme,
	updateTailwindTheme,
	SchemeVariant,
	generateDynamicScheme,
	findContrastLevel,
	validateColor,
	validateColorFromForm,
};
export type { paletteTw, CustomThemeConfig };

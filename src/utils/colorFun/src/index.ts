// src/index.ts

import { CustomThemeConfig, genenerateTailwindTheme } from './theme';
import { generateScheme, SchemeVariant } from './scheme';
import { validateColor } from './utils';
import { findContrastLevel } from './checkContrast';
import { paletteTailwind } from './palette';

export {
	genenerateTailwindTheme,
	CustomThemeConfig,
	SchemeVariant,
	generateScheme,
	findContrastLevel,
	paletteTailwind,
};

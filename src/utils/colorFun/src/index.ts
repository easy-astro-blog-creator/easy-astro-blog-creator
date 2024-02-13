// src/index.ts

import { CustomThemeConfig, genenerateTailwindTheme, updateTailwindTheme } from './theme';
import { generateDynamicScheme, SchemeVariant } from './scheme';
import { findContrastLevel } from './checkContrast';
import { paletteTw } from './palette';

export { genenerateTailwindTheme, updateTailwindTheme, SchemeVariant, generateDynamicScheme, findContrastLevel };
export type { paletteTw, CustomThemeConfig };

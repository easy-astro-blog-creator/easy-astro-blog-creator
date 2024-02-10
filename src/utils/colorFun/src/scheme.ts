import {
	hexFromArgb,
	Hct,
	MaterialDynamicColors,
	argbFromHex,
	TonalPalette,
	DynamicScheme,
	SchemeMonochrome,
	SchemeNeutral,
	SchemeTonalSpot,
	SchemeVibrant,
	SchemeExpressive,
	SchemeFidelity,
	SchemeContent,
} from '@material/material-color-utilities';
import chroma from 'chroma-js';

import { CustomThemeConfig } from './theme';
import { validateColor } from './utils';

export enum SchemeVariant {
	MONOCHROME = 0,
	NEUTRAL = 1,
	TONAL_SPOT = 2,
	VIBRANT = 3,
	EXPRESSIVE = 4,
	FIDELITY = 5,
	CONTENT = 6,
}

export function generateScheme(themeConfig: CustomThemeConfig): MaterialColorUtilitiesScheme {
	const lightScheme = generateDynamicScheme(themeConfig, false);
	const darkScheme = generateDynamicScheme(themeConfig, true);

	return createSchemeObject(lightScheme, darkScheme);
}

function generateDynamicScheme(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const primary = chroma(themeConfig.primary).hex();
	const source = Hct.fromInt(argbFromHex(primary));
	// These are the preset dynamic schemes that are available in the Material Color Utilities library
	switch (themeConfig.schemeTypeMCU) {
		case SchemeVariant.MONOCHROME:
			return new SchemeMonochrome(source, mode, 0);
		case SchemeVariant.NEUTRAL:
			return new SchemeNeutral(source, mode, 0);
		case SchemeVariant.TONAL_SPOT:
			return new SchemeTonalSpot(source, mode, 0);
		case SchemeVariant.VIBRANT:
			return new SchemeVibrant(source, mode, 0);
		case SchemeVariant.EXPRESSIVE:
			return new SchemeExpressive(source, mode, 0);
		case SchemeVariant.FIDELITY:
			return new SchemeFidelity(source, mode, 0);
		case SchemeVariant.CONTENT:
			return new SchemeContent(source, mode, 0);
		default:
			return new SchemeTonalSpot(source, mode, 0);
	}
}

function generateTonalPalette(color: string | chroma.Color) {
	validateColor(color);
	const colorHex = chroma(color).hex();
	const colorARGB = argbFromHex(colorHex);
	return TonalPalette.fromInt(colorARGB);
}

function generateCustomDynamicScheme(themeConfig: CustomThemeConfig): DynamicScheme {
	return new DynamicScheme({
		sourceColorArgb: argbFromHex(source),
		variant: themeConfig.schemeType,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromInt(argbFromHex(chroma(primary).hex())),
		secondaryPalette: TonalPalette.fromInt(argbFromHex(chroma(secondary).hex())),
		tertiaryPalette: TonalPalette.fromInt(source),
		neutralPalette: TonalPalette.fromInt(source),
		neutralVariantPalette: TonalPalette.fromInt(source),
	});
}

export type MaterialColorUtilitiesScheme = {
	// Color Keys
	'primary-palette-key-color': string;
	'secondary-palette-key-color': string;
	'tertiary-palette-key-color': string;
	'neutral-palette-key-color': string;
	'neutral-variant-palette-key-color': string;
	// Light
	'primary-light': string;
	'on-primary-light': string;
	'primary-container-light': string;
	'on-primary-container-light': string;
	'secondary-light': string;
	'on-secondary-light': string;
	'secondary-container-light': string;
	'on-secondary-container-light': string;
	'tertiary-light': string;
	'on-tertiary-light': string;
	'tertiary-container-light': string;
	'on-tertiary-container-light': string;
	'background-light': string;
	'on-background-light': string;
	'surface-light': string;
	'on-surface-light': string;
	'surface-variant-light': string;
	'on-surface-variant-light': string;
	'outline-light': string;
	'outline-variant-light': string;
	'inverse-surface-light': string;
	'inverse-on-surface-light': string;
	'error-light': string;
	'on-error-light': string;
	'error-container-light': string;
	'on-error-container-light': string;
	// Dark
	'primary-dark': string;
	'on-primary-dark': string;
	'primary-container-dark': string;
	'on-primary-container-dark': string;
	'secondary-dark': string;
	'on-secondary-dark': string;
	'secondary-container-dark': string;
	'on-secondary-container-dark': string;
	'tertiary-dark': string;
	'on-tertiary-dark': string;
	'tertiary-container-dark': string;
	'on-tertiary-container-dark': string;
	'background-dark': string;
	'on-background-dark': string;
	'surface-dark': string;
	'on-surface-dark': string;
	'surface-variant-dark': string;
	'on-surface-variant-dark': string;
	'outline-dark': string;
	'outline-variant-dark': string;
	'inverse-surface-dark': string;
	'inverse-on-surface-dark': string;
	'error-dark': string;
	'on-error-dark': string;
	'error-container-dark': string;
	'on-error-container-dark': string;
};

function createSchemeObject(lightScheme: DynamicScheme, darkScheme: DynamicScheme): MaterialColorUtilitiesScheme {
	return {
		// Color Keys
		'primary-palette-key-color': hexFromArgb(MaterialDynamicColors.primaryPaletteKeyColor.getArgb(lightScheme)),
		'secondary-palette-key-color': hexFromArgb(MaterialDynamicColors.secondaryPaletteKeyColor.getArgb(lightScheme)),
		'tertiary-palette-key-color': hexFromArgb(MaterialDynamicColors.tertiaryPaletteKeyColor.getArgb(lightScheme)),
		'neutral-palette-key-color': hexFromArgb(MaterialDynamicColors.neutralPaletteKeyColor.getArgb(lightScheme)),
		'neutral-variant-palette-key-color': hexFromArgb(
			MaterialDynamicColors.neutralVariantPaletteKeyColor.getArgb(lightScheme)
		),
		// Light
		'primary-light': hexFromArgb(MaterialDynamicColors.primary.getArgb(lightScheme)),
		'on-primary-light': hexFromArgb(MaterialDynamicColors.onPrimary.getArgb(lightScheme)),
		'primary-container-light': hexFromArgb(MaterialDynamicColors.primaryContainer.getArgb(lightScheme)),
		'on-primary-container-light': hexFromArgb(MaterialDynamicColors.onPrimaryContainer.getArgb(lightScheme)),
		'secondary-light': hexFromArgb(MaterialDynamicColors.secondary.getArgb(lightScheme)),
		'on-secondary-light': hexFromArgb(MaterialDynamicColors.onSecondary.getArgb(lightScheme)),
		'secondary-container-light': hexFromArgb(MaterialDynamicColors.secondaryContainer.getArgb(lightScheme)),
		'on-secondary-container-light': hexFromArgb(MaterialDynamicColors.onSecondaryContainer.getArgb(lightScheme)),
		'tertiary-light': hexFromArgb(MaterialDynamicColors.tertiary.getArgb(lightScheme)),
		'on-tertiary-light': hexFromArgb(MaterialDynamicColors.onTertiary.getArgb(lightScheme)),
		'tertiary-container-light': hexFromArgb(MaterialDynamicColors.tertiaryContainer.getArgb(lightScheme)),
		'on-tertiary-container-light': hexFromArgb(MaterialDynamicColors.onTertiaryContainer.getArgb(lightScheme)),
		'background-light': hexFromArgb(MaterialDynamicColors.background.getArgb(lightScheme)),
		'on-background-light': hexFromArgb(MaterialDynamicColors.onBackground.getArgb(lightScheme)),
		'surface-light': hexFromArgb(MaterialDynamicColors.surface.getArgb(lightScheme)),
		'on-surface-light': hexFromArgb(MaterialDynamicColors.onSurface.getArgb(lightScheme)),
		'surface-variant-light': hexFromArgb(MaterialDynamicColors.surfaceVariant.getArgb(lightScheme)),
		'on-surface-variant-light': hexFromArgb(MaterialDynamicColors.onSurfaceVariant.getArgb(lightScheme)),
		'outline-light': hexFromArgb(MaterialDynamicColors.outline.getArgb(lightScheme)),
		'outline-variant-light': hexFromArgb(MaterialDynamicColors.outlineVariant.getArgb(lightScheme)),
		'inverse-surface-light': hexFromArgb(MaterialDynamicColors.inverseSurface.getArgb(lightScheme)),
		'inverse-on-surface-light': hexFromArgb(MaterialDynamicColors.inverseOnSurface.getArgb(lightScheme)),
		'error-light': hexFromArgb(MaterialDynamicColors.error.getArgb(lightScheme)),
		'on-error-light': hexFromArgb(MaterialDynamicColors.onError.getArgb(lightScheme)),
		'error-container-light': hexFromArgb(MaterialDynamicColors.errorContainer.getArgb(lightScheme)),
		'on-error-container-light': hexFromArgb(MaterialDynamicColors.onErrorContainer.getArgb(lightScheme)),
		// Dark
		'primary-dark': hexFromArgb(MaterialDynamicColors.primary.getArgb(darkScheme)),
		'on-primary-dark': hexFromArgb(MaterialDynamicColors.onPrimary.getArgb(darkScheme)),
		'primary-container-dark': hexFromArgb(MaterialDynamicColors.primaryContainer.getArgb(darkScheme)),
		'on-primary-container-dark': hexFromArgb(MaterialDynamicColors.onPrimaryContainer.getArgb(darkScheme)),
		'secondary-dark': hexFromArgb(MaterialDynamicColors.secondary.getArgb(darkScheme)),
		'on-secondary-dark': hexFromArgb(MaterialDynamicColors.onSecondary.getArgb(darkScheme)),
		'secondary-container-dark': hexFromArgb(MaterialDynamicColors.secondaryContainer.getArgb(darkScheme)),
		'on-secondary-container-dark': hexFromArgb(MaterialDynamicColors.onSecondaryContainer.getArgb(darkScheme)),
		'tertiary-dark': hexFromArgb(MaterialDynamicColors.tertiary.getArgb(darkScheme)),
		'on-tertiary-dark': hexFromArgb(MaterialDynamicColors.onTertiary.getArgb(darkScheme)),
		'tertiary-container-dark': hexFromArgb(MaterialDynamicColors.tertiaryContainer.getArgb(darkScheme)),
		'on-tertiary-container-dark': hexFromArgb(MaterialDynamicColors.onTertiaryContainer.getArgb(darkScheme)),
		'background-dark': hexFromArgb(MaterialDynamicColors.background.getArgb(darkScheme)),
		'on-background-dark': hexFromArgb(MaterialDynamicColors.onBackground.getArgb(darkScheme)),
		'surface-dark': hexFromArgb(MaterialDynamicColors.surface.getArgb(darkScheme)),
		'on-surface-dark': hexFromArgb(MaterialDynamicColors.onSurface.getArgb(darkScheme)),
		'surface-variant-dark': hexFromArgb(MaterialDynamicColors.surfaceVariant.getArgb(darkScheme)),
		'on-surface-variant-dark': hexFromArgb(MaterialDynamicColors.onSurfaceVariant.getArgb(darkScheme)),
		'outline-dark': hexFromArgb(MaterialDynamicColors.outline.getArgb(darkScheme)),
		'outline-variant-dark': hexFromArgb(MaterialDynamicColors.outlineVariant.getArgb(darkScheme)),
		'inverse-surface-dark': hexFromArgb(MaterialDynamicColors.inverseSurface.getArgb(darkScheme)),
		'inverse-on-surface-dark': hexFromArgb(MaterialDynamicColors.inverseOnSurface.getArgb(darkScheme)),
		'error-dark': hexFromArgb(MaterialDynamicColors.error.getArgb(darkScheme)),
		'on-error-dark': hexFromArgb(MaterialDynamicColors.onError.getArgb(darkScheme)),
		'error-container-dark': hexFromArgb(MaterialDynamicColors.errorContainer.getArgb(darkScheme)),
		'on-error-container-dark': hexFromArgb(MaterialDynamicColors.onErrorContainer.getArgb(darkScheme)),
	};
}

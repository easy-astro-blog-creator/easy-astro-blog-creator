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

import { CustomThemeConfig } from './theme';
import { validateColor } from './utils';
import {
	toHct,
	complemetaryColor,
	complemetarySplitColors,
	triadicColors,
	analogousColors,
	tetradicColors,
} from './colorFunctions';

export enum SchemeVariant {
	MONOCHROME,
	NEUTRAL,
	TONAL_SPOT,
	VIBRANT,
	EXPRESSIVE,
	FIDELITY,
	CONTENT,
	COMPLEMENTARY,
	SPLIT_COMPLEMENTARY,
	TRIADIC,
	ANALOGOUS,
	TETRADIC,
	CUSTOM,
}

// Copies from @material/material-color-utilities instead of importing
// `import Variant from '@material/material-color-utilities/scheme/variant';
// Because it's not exported from the package
export enum Variant {
	MONOCHROME,
	NEUTRAL,
	TONAL_SPOT,
	VIBRANT,
	EXPRESSIVE,
	FIDELITY,
	CONTENT,
}

export function generateDynamicScheme(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	if (!themeConfig.primary) {
		throw new Error('Primary color is required');
	}
	validateColor(themeConfig.primary);

	// These are the preset dynamic schemes that are available in the Material Color Utilities library
	switch (themeConfig.schemeVariant) {
		case SchemeVariant.MONOCHROME:
			return new SchemeMonochrome(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.NEUTRAL:
			return new SchemeNeutral(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.TONAL_SPOT:
			return new SchemeTonalSpot(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.VIBRANT:
			return new SchemeVibrant(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.EXPRESSIVE:
			return new SchemeExpressive(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.FIDELITY:
			return new SchemeFidelity(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.CONTENT:
			return new SchemeContent(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.COMPLEMENTARY:
			return generateSchemeComplementary(themeConfig, mode);
		case SchemeVariant.SPLIT_COMPLEMENTARY:
			return generateSchemeComplementarySplit(themeConfig, mode);
		case SchemeVariant.TRIADIC:
			return generateSchemeTriadic(themeConfig, mode);
		case SchemeVariant.ANALOGOUS:
			return generateSchemeAnalogous(themeConfig, mode);
		case SchemeVariant.TETRADIC:
			return generateSchemeTetradic(themeConfig, mode);
		case SchemeVariant.CUSTOM:
			return generateSchemeCustom(themeConfig, mode);
		default:
			return new SchemeTonalSpot(toHct(themeConfig.primary), mode, 0);
	}
}

function generateSchemeComplementary(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const complementary = complemetaryColor(themeConfig.primary);

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 16),
		tertiaryPalette: TonalPalette.fromHct(toHct(complementary)),
		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(complementary).hue, 8),
	});
}
function generateSchemeComplementarySplit(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const [color1, color2] = complemetarySplitColors(themeConfig.primary);

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: TonalPalette.fromHct(toHct(color1)),
		tertiaryPalette: TonalPalette.fromHct(toHct(color2)),
		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 8),
	});
}

function generateSchemeTriadic(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const [color1, color2] = triadicColors(themeConfig.primary);

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: TonalPalette.fromHct(toHct(color1)),
		tertiaryPalette: TonalPalette.fromHct(toHct(color2)),
		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 8),
	});
}

function generateSchemeAnalogous(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const [color1, color2, color3, color4] = analogousColors(themeConfig.primary);

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: TonalPalette.fromHct(toHct(color2)),
		tertiaryPalette: TonalPalette.fromHct(toHct(color4)),
		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 8),
	});
}
function generateSchemeTetradic(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	const [color1, color2, color3] = tetradicColors(themeConfig.primary);

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: TonalPalette.fromHct(toHct(color1)),
		tertiaryPalette: TonalPalette.fromHct(toHct(color2)),
		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(color3).hue, 8),
	});
}

export function generateSchemeCustom(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	let secondaryPalette;
	let tertiaryPalette;
	let neutralPalette;
	let neutralVariantPalette;

	if (themeConfig.secondary) {
		validateColor(themeConfig.secondary);
		secondaryPalette = TonalPalette.fromHct(toHct(themeConfig.secondary));
	} else {
		secondaryPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 16.0);
	}
	if (themeConfig.tertiary) {
		validateColor(themeConfig.tertiary);
		tertiaryPalette = TonalPalette.fromHct(toHct(themeConfig.tertiary));
	} else {
		tertiaryPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue + 60, 24.0);
	}
	if (themeConfig.neutral) {
		validateColor(themeConfig.neutral);
		neutralPalette = TonalPalette.fromHct(toHct(themeConfig.neutral));
	} else {
		neutralPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4.0);
	}
	if (themeConfig.neutralVarient) {
		validateColor(themeConfig.neutralVarient);
		neutralVariantPalette = TonalPalette.fromHct(toHct(themeConfig.neutralVarient));
	} else {
		neutralVariantPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 8.0);
	}

	return new DynamicScheme({
		sourceColorArgb: argbFromHex(themeConfig.primary),
		variant: Variant.TONAL_SPOT,
		isDark: mode,
		contrastLevel: 0.0,
		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
		secondaryPalette: secondaryPalette,
		tertiaryPalette: tertiaryPalette,
		neutralPalette: neutralPalette,
		neutralVariantPalette: neutralVariantPalette,
	});
}

export type MaterialColorUtilitiesScheme = {
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

export function createSchemeObject(
	lightScheme: DynamicScheme,
	darkScheme: DynamicScheme
): MaterialColorUtilitiesScheme {
	return {
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

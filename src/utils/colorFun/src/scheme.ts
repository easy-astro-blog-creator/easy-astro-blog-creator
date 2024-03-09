import {
	hexFromArgb,
	MaterialDynamicColors,
	argbFromHex,
	TonalPalette,
	DynamicScheme,
	SchemeNeutral,
	SchemeTonalSpot,
	SchemeVibrant,
	// SchemeExpressive,
	// SchemeFidelity,
	// SchemeContent,
} from '@material/material-color-utilities';

import { CustomThemeConfig } from './theme';
import {
	toHct,
	toOklch,
	// complemetaryColor,
	complemetarySplitColors,
	triadicColors,
	analogousColors,
	// tetradicColors,
	validateColor,
} from './colorFunctions';

export enum SchemeVariant {
	// MONOCHROME = 'monochrome',
	NEUTRAL = 'neutral',
	// TONAL_SPOT = 'tonal_spot',
	VIBRANT = 'vibrant',
	// EXPRESSIVE = 'expressive',
	// FIDELITY = 'fidelity',
	// CONTENT = 'content',
	COMPLEMENTARY = 'complementary',
	// SPLIT_COMPLEMENTARY = 'split_complement',
	TRIADIC = 'triadic',
	ANALOGOUS = 'analogous',
	// TETRADIC = 'tetradic',
	// CUSTOM = 'custom',
}

// Copies from @material/material-color-utilities instead of importing
// `import Variant from '@material/material-color-utilities/scheme/variant';
// Because it's not exported from the package
enum Variant {
	MONOCHROME,
	NEUTRAL,
	TONAL_SPOT,
	VIBRANT,
	EXPRESSIVE,
	FIDELITY,
	CONTENT,
}

export type McuScheme = {
	primary: string;
	'on-primary': string;
	'primary-container': string;
	'on-primary-container': string;
	secondary: string;
	'on-secondary': string;
	'secondary-container': string;
	'on-secondary-container': string;
	tertiary: string;
	'on-tertiary': string;
	'tertiary-container': string;
	'on-tertiary-container': string;
	background: string;
	'on-background': string;
	surface: string;
	'on-surface': string;
	'surface-variant': string;
	'on-surface-variant': string;
	outline: string;
	'outline-variant': string;
	'inverse-surface': string;
	'inverse-on-surface': string;
	error: string;
	'on-error': string;
	'error-container': string;
	'on-error-container': string;
};
export const MCU_SCHEME_VARS = {
	primary: 'oklch(var(--colors-semantic-primary) / <alpha-value>)',
	'on-primary': 'oklch(var(--colors-semantic-on-primary) / <alpha-value>)',
	'primary-container': 'oklch(var(--colors-semantic-primary-container) / <alpha-value>)',
	'on-primary-container': 'oklch(var(--colors-semantic-on-primary-container) / <alpha-value>)',
	secondary: 'oklch(var(--colors-semantic-secondary) / <alpha-value>)',
	'on-secondary': 'oklch(var(--colors-semantic-on-secondary) / <alpha-value>)',
	'secondary-container': 'oklch(var(--colors-semantic-secondary-container) / <alpha-value>)',
	'on-secondary-container': 'oklch(var(--colors-semantic-on-secondary-container) / <alpha-value>)',
	tertiary: 'oklch(var(--colors-semantic-tertiary) / <alpha-value>)',
	'on-tertiary': 'oklch(var(--colors-semantic-on-tertiary) / <alpha-value>)',
	'tertiary-container': 'oklch(var(--colors-semantic-tertiary-container) / <alpha-value>)',
	'on-tertiary-container': 'oklch(var(--colors-semantic-on-tertiary-container) / <alpha-value>)',
	background: 'oklch(var(--colors-semantic-background) / <alpha-value>)',
	'on-background': 'oklch(var(--colors-semantic-on-background) / <alpha-value>)',
	surface: 'oklch(var(--colors-semantic-surface) / <alpha-value>)',
	'on-surface': 'oklch(var(--colors-semantic-on-surface) / <alpha-value>)',
	'surface-variant': 'oklch(var(--colors-semantic-surface-variant) / <alpha-value>)',
	'on-surface-variant': 'oklch(var(--colors-semantic-on-surface-variant) / <alpha-value>)',
	outline: 'oklch(var(--colors-semantic-outline) / <alpha-value>)',
	'outline-variant': 'oklch(var(--colors-semantic-outline-variant) / <alpha-value>)',
	'inverse-surface': 'oklch(var(--colors-semantic-inverse-surface) / <alpha-value>)',
	'inverse-on-surface': 'oklch(var(--colors-semantic-inverse-on-surface) / <alpha-value>)',
	error: 'oklch(var(--colors-semantic-error) / <alpha-value>)',
	'on-error': 'oklch(var(--colors-semantic-on-error) / <alpha-value>)',
	'error-container': 'oklch(var(--colors-semantic-error-container) / <alpha-value>)',
	'on-error-container': 'oklch(var(--colors-semantic-on-error-container) / <alpha-value>)',
};
export function generateDynamicScheme(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
	if (!themeConfig.primary) {
		throw new Error('Primary color is required');
	}
	validateColor(themeConfig.primary);

	// These are the preset dynamic schemes that are available in the Material Color Utilities library
	switch (themeConfig.schemeVariant) {
		// case SchemeVariant.MONOCHROME:
		// 	return new SchemeMonochrome(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.NEUTRAL:
			return new SchemeNeutral(toHct(themeConfig.primary), mode, 0);
		// case SchemeVariant.TONAL_SPOT:
		// 	return new SchemeTonalSpot(toHct(themeConfig.primary), mode, 0);
		case SchemeVariant.VIBRANT:
			return new SchemeVibrant(toHct(themeConfig.primary), mode, 0);
		// case SchemeVariant.EXPRESSIVE:
		// 	return new SchemeExpressive(toHct(themeConfig.primary), mode, 0);
		// case SchemeVariant.FIDELITY:
		// 	return new SchemeFidelity(toHct(themeConfig.primary), mode, 0);
		// case SchemeVariant.CONTENT:
		// 	return new SchemeContent(toHct(themeConfig.primary), mode, 0);
		// case SchemeVariant.COMPLEMENTARY:
		// 	return generateSchemeComplementary(themeConfig, mode);
		case SchemeVariant.COMPLEMENTARY:
			return generateSchemeComplementarySplit(themeConfig, mode);
		case SchemeVariant.TRIADIC:
			return generateSchemeTriadic(themeConfig, mode);
		case SchemeVariant.ANALOGOUS:
			return generateSchemeAnalogous(themeConfig, mode);
		// case SchemeVariant.TETRADIC:
		// 	return generateSchemeTetradic(themeConfig, mode);
		// case SchemeVariant.CUSTOM:
		// 	return generateSchemeCustom(themeConfig, mode);
		default:
			return new SchemeTonalSpot(toHct(themeConfig.primary), mode, 0);
	}
}
export function createSchemeObject(scheme: DynamicScheme): McuScheme {
	return {
		primary: toOklch(hexFromArgb(MaterialDynamicColors.primary.getArgb(scheme))),
		'on-primary': toOklch(hexFromArgb(MaterialDynamicColors.onPrimary.getArgb(scheme))),
		'primary-container': toOklch(hexFromArgb(MaterialDynamicColors.primaryContainer.getArgb(scheme))),
		'on-primary-container': toOklch(hexFromArgb(MaterialDynamicColors.onPrimaryContainer.getArgb(scheme))),
		secondary: toOklch(hexFromArgb(MaterialDynamicColors.secondary.getArgb(scheme))),
		'on-secondary': toOklch(hexFromArgb(MaterialDynamicColors.onSecondary.getArgb(scheme))),
		'secondary-container': toOklch(hexFromArgb(MaterialDynamicColors.secondaryContainer.getArgb(scheme))),
		'on-secondary-container': toOklch(hexFromArgb(MaterialDynamicColors.onSecondaryContainer.getArgb(scheme))),
		tertiary: toOklch(hexFromArgb(MaterialDynamicColors.tertiary.getArgb(scheme))),
		'on-tertiary': toOklch(hexFromArgb(MaterialDynamicColors.onTertiary.getArgb(scheme))),
		'tertiary-container': toOklch(hexFromArgb(MaterialDynamicColors.tertiaryContainer.getArgb(scheme))),
		'on-tertiary-container': toOklch(hexFromArgb(MaterialDynamicColors.onTertiaryContainer.getArgb(scheme))),
		background: toOklch(hexFromArgb(MaterialDynamicColors.background.getArgb(scheme))),
		'on-background': toOklch(hexFromArgb(MaterialDynamicColors.onBackground.getArgb(scheme))),
		surface: toOklch(hexFromArgb(MaterialDynamicColors.surface.getArgb(scheme))),
		'on-surface': toOklch(hexFromArgb(MaterialDynamicColors.onSurface.getArgb(scheme))),
		'surface-variant': toOklch(hexFromArgb(MaterialDynamicColors.surfaceVariant.getArgb(scheme))),
		'on-surface-variant': toOklch(hexFromArgb(MaterialDynamicColors.onSurfaceVariant.getArgb(scheme))),
		outline: toOklch(hexFromArgb(MaterialDynamicColors.outline.getArgb(scheme))),
		'outline-variant': toOklch(hexFromArgb(MaterialDynamicColors.outlineVariant.getArgb(scheme))),
		'inverse-surface': toOklch(hexFromArgb(MaterialDynamicColors.inverseSurface.getArgb(scheme))),
		'inverse-on-surface': toOklch(hexFromArgb(MaterialDynamicColors.inverseOnSurface.getArgb(scheme))),
		error: toOklch(hexFromArgb(MaterialDynamicColors.error.getArgb(scheme))),
		'on-error': toOklch(hexFromArgb(MaterialDynamicColors.onError.getArgb(scheme))),
		'error-container': toOklch(hexFromArgb(MaterialDynamicColors.errorContainer.getArgb(scheme))),
		'on-error-container': toOklch(hexFromArgb(MaterialDynamicColors.onErrorContainer.getArgb(scheme))),
	};
}
// function generateSchemeComplementary(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
// 	const complementary = complemetaryColor(themeConfig.primary);

// 	return new DynamicScheme({
// 		sourceColorArgb: argbFromHex(themeConfig.primary),
// 		variant: Variant.TONAL_SPOT,
// 		isDark: mode,
// 		contrastLevel: 0.0,
// 		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
// 		secondaryPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 16),
// 		tertiaryPalette: TonalPalette.fromHct(toHct(complementary)),
// 		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
// 		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(complementary).hue, 8),
// 	});
// }
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
	const [, color2, , color4] = analogousColors(themeConfig.primary);

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
// function generateSchemeTetradic(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
// 	const [color1, color2, color3] = tetradicColors(themeConfig.primary);

// 	return new DynamicScheme({
// 		sourceColorArgb: argbFromHex(themeConfig.primary),
// 		variant: Variant.TONAL_SPOT,
// 		isDark: mode,
// 		contrastLevel: 0.0,
// 		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
// 		secondaryPalette: TonalPalette.fromHct(toHct(color1)),
// 		tertiaryPalette: TonalPalette.fromHct(toHct(color2)),
// 		neutralPalette: TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4),
// 		neutralVariantPalette: TonalPalette.fromHueAndChroma(toHct(color3).hue, 8),
// 	});
// }
// function generateSchemeCustom(themeConfig: CustomThemeConfig, mode: boolean): DynamicScheme {
// 	let secondaryPalette;
// 	let tertiaryPalette;
// 	let neutralPalette;
// 	let neutralVariantPalette;

// 	if (themeConfig.secondary) {
// 		validateColor(themeConfig.secondary);
// 		secondaryPalette = TonalPalette.fromHct(toHct(themeConfig.secondary));
// 	} else {
// 		secondaryPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 16.0);
// 	}
// 	if (themeConfig.tertiary) {
// 		validateColor(themeConfig.tertiary);
// 		tertiaryPalette = TonalPalette.fromHct(toHct(themeConfig.tertiary));
// 	} else {
// 		tertiaryPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue + 60, 24.0);
// 	}
// 	if (themeConfig.neutral) {
// 		validateColor(themeConfig.neutral);
// 		neutralPalette = TonalPalette.fromHct(toHct(themeConfig.neutral));
// 	} else {
// 		neutralPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 4.0);
// 	}
// 	if (themeConfig.neutralVarient) {
// 		validateColor(themeConfig.neutralVarient);
// 		neutralVariantPalette = TonalPalette.fromHct(toHct(themeConfig.neutralVarient));
// 	} else {
// 		neutralVariantPalette = TonalPalette.fromHueAndChroma(toHct(themeConfig.primary).hue, 8.0);
// 	}

// 	return new DynamicScheme({
// 		sourceColorArgb: argbFromHex(themeConfig.primary),
// 		variant: Variant.TONAL_SPOT,
// 		isDark: mode,
// 		contrastLevel: 0.0,
// 		primaryPalette: TonalPalette.fromHct(toHct(themeConfig.primary)),
// 		secondaryPalette: secondaryPalette,
// 		tertiaryPalette: tertiaryPalette,
// 		neutralPalette: neutralPalette,
// 		neutralVariantPalette: neutralVariantPalette,
// 	});
// }

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
import {
	toHct,
	toOklchCss,
	complemetaryColor,
	complemetarySplitColors,
	triadicColors,
	analogousColors,
	tetradicColors,
	validateColor,
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
enum Variant {
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
	primary: 'var(--colors-semantic-primary)',
	'on-primary': 'var(--colors-semantic-on-primary)',
	'primary-container': 'var(--colors-semantic-primary-container)',
	'on-primary-container': 'var(--colors-semantic-on-primary-container)',
	secondary: 'var(--colors-semantic-secondary)',
	'on-secondary': 'var(--colors-semantic-on-secondary)',
	'secondary-container': 'var(--colors-semantic-secondary-container)',
	'on-secondary-container': 'var(--colors-semantic-on-secondary-container)',
	tertiary: 'var(--colors-semantic-tertiary)',
	'on-tertiary': 'var(--colors-semantic-on-tertiary)',
	'tertiary-container': 'var(--colors-semantic-tertiary-container)',
	'on-tertiary-container': 'var(--colors-semantic-on-tertiary-container)',
	background: 'var(--colors-semantic-background)',
	'on-background': 'var(--colors-semantic-on-background)',
	surface: 'var(--colors-semantic-surface)',
	'on-surface': 'var(--colors-semantic-on-surface)',
	'surface-variant': 'var(--colors-semantic-surface-variant)',
	'on-surface-variant': 'var(--colors-semantic-on-surface-variant)',
	outline: 'var(--colors-semantic-outline)',
	'outline-variant': 'var(--colors-semantic-outline-variant)',
	'inverse-surface': 'var(--colors-semantic-inverse-surface)',
	'inverse-on-surface': 'var(--colors-semantic-inverse-on-surface)',
	error: 'var(--colors-semantic-error)',
	'on-error': 'var(--colors-semantic-on-error)',
	'error-container': 'var(--colors-semantic-error-container)',
	'on-error-container': 'var(--colors-semantic-on-error-container)',
};

export function createSchemeObject(scheme: DynamicScheme): McuScheme {
	return {
		primary: toOklchCss(hexFromArgb(MaterialDynamicColors.primary.getArgb(scheme))),
		'on-primary': toOklchCss(hexFromArgb(MaterialDynamicColors.onPrimary.getArgb(scheme))),
		'primary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.primaryContainer.getArgb(scheme))),
		'on-primary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.onPrimaryContainer.getArgb(scheme))),
		secondary: toOklchCss(hexFromArgb(MaterialDynamicColors.secondary.getArgb(scheme))),
		'on-secondary': toOklchCss(hexFromArgb(MaterialDynamicColors.onSecondary.getArgb(scheme))),
		'secondary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.secondaryContainer.getArgb(scheme))),
		'on-secondary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.onSecondaryContainer.getArgb(scheme))),
		tertiary: toOklchCss(hexFromArgb(MaterialDynamicColors.tertiary.getArgb(scheme))),
		'on-tertiary': toOklchCss(hexFromArgb(MaterialDynamicColors.onTertiary.getArgb(scheme))),
		'tertiary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.tertiaryContainer.getArgb(scheme))),
		'on-tertiary-container': toOklchCss(hexFromArgb(MaterialDynamicColors.onTertiaryContainer.getArgb(scheme))),
		background: toOklchCss(hexFromArgb(MaterialDynamicColors.background.getArgb(scheme))),
		'on-background': toOklchCss(hexFromArgb(MaterialDynamicColors.onBackground.getArgb(scheme))),
		surface: toOklchCss(hexFromArgb(MaterialDynamicColors.surface.getArgb(scheme))),
		'on-surface': toOklchCss(hexFromArgb(MaterialDynamicColors.onSurface.getArgb(scheme))),
		'surface-variant': toOklchCss(hexFromArgb(MaterialDynamicColors.surfaceVariant.getArgb(scheme))),
		'on-surface-variant': toOklchCss(hexFromArgb(MaterialDynamicColors.onSurfaceVariant.getArgb(scheme))),
		outline: toOklchCss(hexFromArgb(MaterialDynamicColors.outline.getArgb(scheme))),
		'outline-variant': toOklchCss(hexFromArgb(MaterialDynamicColors.outlineVariant.getArgb(scheme))),
		'inverse-surface': toOklchCss(hexFromArgb(MaterialDynamicColors.inverseSurface.getArgb(scheme))),
		'inverse-on-surface': toOklchCss(hexFromArgb(MaterialDynamicColors.inverseOnSurface.getArgb(scheme))),
		error: toOklchCss(hexFromArgb(MaterialDynamicColors.error.getArgb(scheme))),
		'on-error': toOklchCss(hexFromArgb(MaterialDynamicColors.onError.getArgb(scheme))),
		'error-container': toOklchCss(hexFromArgb(MaterialDynamicColors.errorContainer.getArgb(scheme))),
		'on-error-container': toOklchCss(hexFromArgb(MaterialDynamicColors.onErrorContainer.getArgb(scheme))),
	};
}

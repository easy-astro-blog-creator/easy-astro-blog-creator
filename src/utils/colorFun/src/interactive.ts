import { McuScheme, MCU_SCHEME_VARS } from './scheme';
import { CustomTonalPalette } from './palette';
import { genenerateTailwindTheme, CustomThemeConfig } from './theme';

export function updateTailwindTheme(sheets: StyleSheetList, newConfig: CustomThemeConfig) {
	const newTheme = genenerateTailwindTheme(newConfig);
	Object.entries(newTheme.colors).forEach(([category, palette]) => {
		updatePalette(sheets, ':root', palette, newTheme.variables.DEFAULT.colors[category]);
		updatePalette(sheets, ':root.dark', palette, newTheme.darkVariables.DEFAULT.colors[category]);
	});
}

function updatePalette(
	sheets: StyleSheetList,
	selector: string,
	colorVars: CustomTonalPalette | typeof MCU_SCHEME_VARS,
	colorValues: CustomTonalPalette | McuScheme
) {
	const unwrapVarName = (input: string): string => {
		// Converts "oklch(var(--colors-semantic-primary) / <alpha-value>)" to "--colors-semantic-primary"
		return input.split('(')[2].split(')')[0];
	};

	Object.entries(colorVars).forEach(([key, varExpression]) => {
		const property = unwrapVarName(varExpression);
		let colorVal: string;
		if (property.includes('--colors')) {
			colorVal = `${colorValues[key]}`;
		} else {
			colorVal = colorValues[key];
		}
		updateProperty(sheets, selector, property, colorVal);
	});
}

function updateProperty(sheets: StyleSheetList, selector: string, property: string, value: string) {
	for (let i = 0; i < sheets.length; i++) {
		try {
			const sheet = sheets[i];
			const rules = sheet.cssRules;
			for (let j = 0; j < rules.length; j++) {
				const rule = rules[j];
				if (!(rule instanceof CSSStyleRule)) {
					continue;
				}
				if (rule.selectorText && rule.selectorText.includes(selector)) {
					rule.style.setProperty(property, value);
					return;
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
	console.log(`${selector} rule not found or ${property} not found.`);
}

import { McuScheme, MCU_SCHEME_VARS } from './scheme';
import { paletteTw } from './palette';
import { genenerateTailwindTheme, CustomThemeConfig } from './theme';

export function updateTailwindTheme(sheets: StyleSheetList, newConfig: CustomThemeConfig) {
	const newTheme = genenerateTailwindTheme(newConfig);
	Object.entries(newTheme.colors).forEach(([category, palette]) => {
		if (!(typeof palette === 'string')) {
			updatePalette(sheets, ':root', palette, newTheme.variables.DEFAULT.colors[category]);
			updatePalette(sheets, ':root.dark', palette, newTheme.darkVariables.DEFAULT.colors[category]);
		}
	});
}

function updatePalette(
	sheets: StyleSheetList,
	selector: string,
	colorVars: paletteTw | typeof MCU_SCHEME_VARS,
	colorValues: paletteTw | McuScheme
) {
	const unwrapVarName = (input: string): string => input.replace(/var\((--[a-zA-Z0-9_-]*)\)/g, '$1');

	Object.entries(colorVars).forEach(([key, varExpression]) => {
		updateProperty(sheets, selector, unwrapVarName(varExpression), colorValues[key]);
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

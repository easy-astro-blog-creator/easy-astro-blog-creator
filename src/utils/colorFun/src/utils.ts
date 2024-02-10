import chroma from 'chroma-js';

export function sortColorsByP(testColors: chroma.Color[], param: 'l' | 'c' | 'h') {
    for (let i = 0; i < testColors.length - 1; i++) {
        for (let j = 0; j < testColors.length - i - 1; j++) {
            const color1 = testColors[j];
            const color2 = testColors[j + 1];
            const value1 = chroma(color1).get(`oklch.${param}`);
            const value2 = chroma(color2).get(`oklch.${param}`);
            if (value1 > value2) {
                [testColors[j], testColors[j + 1]] = [testColors[j + 1], testColors[j]];
            }
        }
    }
    return testColors;
}

export function findClosestSchemeHue(matchColor: chroma.Color | string, testColors: {[key: string]: [chroma.Color] }): string {
    validateColor(matchColor);
    let closestScheme = '';
    let closestMatch = Infinity; 
    Object.entries(testColors).forEach(([schemeName, schemeColors]) => {
      const normalizedSchemeColors = Array.isArray(schemeColors) ? schemeColors : [schemeColors];
      normalizedSchemeColors.forEach(schemeColor => {
        const difference = getDifferenceHue(matchColor, schemeColor);
        if (closestMatch === 0 || difference < closestMatch) {
          closestMatch = difference;
          closestScheme = schemeName;
        }
      });
    })
    return closestScheme;
  }



export function sortColorsByDifferenceHue(matchColor: chroma.Color | string, testColors: chroma.Color[]) {
    const huesWithDifferences = testColors.map(hue => {
      let difference = getDifferenceHue(matchColor, hue);
      return { hue, difference };
    });
    huesWithDifferences.sort((a, b) => a.difference - b.difference);
    return huesWithDifferences.map(item => item.hue);
  }
  

export  function getDifferenceHue(color1: chroma.Color | string, color2: chroma.Color | string) {
    let difference = Math.abs(chroma(color1).get('oklch.h') - chroma(color2).get('oklch.h'));
    difference = difference > 180 ? 360 - difference : difference;
    return difference;
  }
  
    
export function validateColor(color: string | chroma.Color) {
    if (!chroma.valid(color)) {
        throw new Error(`Invalid color: ${color}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
    }
}

export function kebabizeAndCss(
  colorName: string,
  color: string | chroma.Color,
  mode: 'hsl' | 'rgb' = 'hsl'
): { colorNameKebabed: string, css: string } {
  validateColor(color);
  
  const colorNameKebabed = colorName.split("")
    .map((letter, idx) => letter.toUpperCase() === letter
      ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
      : letter
    )
    .join("");

  mode = mode === 'hsl' ? 'hsl' : undefined;
  const cssColor = chroma(color).css(mode);

  return { colorNameKebabed, css: cssColor };
}
import chroma, { Color } from 'chroma-js';

function complemetaryColor(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color {
    validateColor(inputColor);
    if (mode === 'hsl') {
        return chroma(inputColor).set('hsl.h', ((chroma(inputColor).get('hsl.h') + 180) % 360));
    } else if (mode === 'oklch') {
        return chroma(inputColor).set('oklch.h', ((chroma(inputColor).get('oklch.h') + 180) % 360));
    }
}

function complemetarySplitColors(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        const splitComplement1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 150) % 360);
        const splitComplement2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 210) % 360);
        return [chroma(inputColor), splitComplement1, splitComplement2];
    } else if (mode === 'oklch') {
        const splitComplement1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 150) % 360);
        const splitComplement2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 210) % 360);
        return [chroma(inputColor), splitComplement1, splitComplement2];
    }
}

function analogousColors(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        const analogous1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 24) % 360);
        const analogous2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 45) % 360);
        const analogous3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') - 24) % 360);
        const analogous4 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') - 45) % 360);
        return [chroma(inputColor), analogous1, analogous2, analogous3, analogous4];
    } else if (mode === 'oklch') {
        const analogous1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 24) % 360);
        const analogous2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 45) % 360);
        const analogous3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') - 24) % 360);
        const analogous4 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') - 45) % 360);
        return [chroma(inputColor), analogous1, analogous2, analogous3, analogous4];
    }
}

function triadicColors(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        const triadic1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 120) % 360);
        const triadic2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 240) % 360);
        return [chroma(inputColor), triadic1, triadic2];
    } else if (mode === 'oklch') {
        const triadic1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 120) % 360);
        const triadic2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 240) % 360);
        return [chroma(inputColor), triadic1, triadic2];
    }
}

function tetradicColors(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        const tetradic1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 60) % 360);
        const tetradic2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360);
        const tetradic3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 240) % 360);
        return [chroma(inputColor), tetradic1, tetradic2, tetradic3];
    }
    else if (mode === 'oklch') {
        const tetradic1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 60) % 360);
        const tetradic2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360);
        const tetradic3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 240) % 360);
        return [chroma(inputColor), tetradic1, tetradic2, tetradic3];
    }
}
function squareColors(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        const square1 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 90) % 360);
        const square2 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360);
        const square3 = chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 270) % 360);
        return [chroma(inputColor), square1, square2, square3];
    }
    if (mode === 'oklch') {
        const square1 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 90) % 360);
        const square2 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360);
        const square3 = chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 270) % 360);
        return [chroma(inputColor), square1, square2, square3];
    }
}

function sortColorsByP(testColors: Color[], param: 'l' | 'c' | 'h') {
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

function findClosestSchemeHue(matchColor: Color | string, testColors: {[key: string]: [Color] }): string {
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



function sortColorsByDifferenceHue(matchColor: Color | string, testColors: Color[]) {
    const huesWithDifferences = testColors.map(hue => {
      let difference = getDifferenceHue(matchColor, hue);
      return { hue, difference };
    });
    huesWithDifferences.sort((a, b) => a.difference - b.difference);
    return huesWithDifferences.map(item => item.hue);
  }
  

  function getDifferenceHue(color1: Color | string, color2: Color | string) {
    let difference = Math.abs(chroma(color1).get('oklch.h') - chroma(color2).get('oklch.h'));
    difference = difference > 180 ? 360 - difference : difference;
    return difference;
  }
  
    
function validateColor(color: string | Color) {
    if (!chroma.valid(color)) {
        throw new Error(`Invalid color: ${color}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
    }
}

export default { complemetaryColor, complemetarySplitColors, analogousColors, triadicColors, tetradicColors, squareColors, sortColorsByP, findClosestSchemeHue, sortColorsByDifferenceHue, getDifferenceHue, validateColor }
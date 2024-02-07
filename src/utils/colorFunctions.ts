import chroma, { Color } from 'chroma-js';

function complemetaryColor(inputColor: string | Color, mode: 'hsl' | 'oklch' = 'oklch'): Color[] {
    validateColor(inputColor);
    if (mode === 'hsl') {
        return [chroma(inputColor), chroma(inputColor).set('hsl.h', (chroma(inputColor).get('hsl.h') + 180) % 360)];
    } else if (mode === 'oklch') {
        return [chroma(inputColor), chroma(inputColor).set('oklch.h', (chroma(inputColor).get('oklch.h') + 180) % 360)];
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

function validateColor(color: string | Color) {
    if (!chroma.valid(color)) {
        throw new Error(`Invalid color: ${color}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
    }
}

export default { complemetaryColor, complemetarySplitColors, analogousColors, triadicColors, tetradicColors, squareColors, validateColor }
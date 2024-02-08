import chroma, { Color } from 'chroma-js';


export function findContrastLevel(
    inputColor: string | Color,
    backgroundColor: string | Color,
    returnMode: 'first' | 'highest' | 'lowest' | 'middle' = 'highest',
    targetContrast: number = 9,
    acceptableContrast: number = 4
  ): Color {
    let darkerColor = chroma(inputColor);
    let lighterColor = chroma(inputColor);
    let maxIterations = 100;
    let scoredColors = {}
    for (let i = 0; i < maxIterations; i++) {
        let currentLuminanceDarker = darkerColor.luminance();
        let currentLuminanceLighter = lighterColor.luminance();
        if (currentLuminanceDarker >= 0.01) {
            darkerColor = adjustContrastViaLuminance(darkerColor, 0.01, 'darken')
            let darkerContrast = chroma.contrast(backgroundColor, darkerColor);
            if (darkerContrast >= acceptableContrast) {
                if (darkerContrast >= targetContrast && returnMode === 'first') return darkerColor;
                if (darkerContrast >= acceptableContrast && returnMode === 'first') return darkerColor;
                scoredColors[darkerContrast] = darkerColor;
            }
        }
        if (currentLuminanceLighter <= .99) {
            lighterColor = adjustContrastViaLuminance(lighterColor, 0.01, 'lighten')
            let lighterContrast = chroma.contrast(backgroundColor, lighterColor);
            if (lighterContrast >= acceptableContrast) {
                if (lighterContrast >= targetContrast && returnMode === 'first') return lighterColor;
                if (lighterContrast >= acceptableContrast && returnMode === 'first') return lighterColor;
                scoredColors[lighterContrast] = lighterColor;
            }
        }
        if (currentLuminanceDarker <= 0 && currentLuminanceLighter >= 1) break;
    }
    let sortedScoredColors = [];
    sortedScoredColors = Object.keys(scoredColors).map(Number).sort((a, b) => a - b);
    if (sortedScoredColors.length === 0 || sortedScoredColors[0] < acceptableContrast){
        throw new Error(`No suitable contrast found for 
            inputColor: ${chroma(inputColor).css('hsl')} 
            on backgroundColor: ${backgroundColor} 
            final darkerColor: ${darkerColor.css('hsl')} 
            final lighterColor: ${lighterColor.css('hsl')}
            highest contrast score: ${sortedScoredColors[0]}
            highest contrast color: ${scoredColors[sortedScoredColors[0]]}`
        );
    }
    if (returnMode === 'highest') {
        return scoredColors[sortedScoredColors[sortedScoredColors.length - 1]];
    } else if (returnMode === 'lowest') {
        return scoredColors[sortedScoredColors[0]];
    } else if (returnMode === 'middle') {
        return scoredColors[sortedScoredColors[Math.floor(sortedScoredColors.length / 2)]];
    }

    
}

export function adjustContrastViaLuminance(color: Color, value: number, mode: 'darken' | 'lighten'): Color {
    if (mode === 'darken') {
        const colorL = chroma(color).luminance() - value;
        return chroma(color).luminance(colorL, 'oklch');
    } else if (mode === 'lighten') {
        const colorL = chroma(color).luminance() + value;
        return chroma(color).luminance(colorL, 'oklch');
    }
}
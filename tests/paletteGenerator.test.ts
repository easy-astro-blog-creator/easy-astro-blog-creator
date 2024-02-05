import generateTailwindPalette from '../src/utils/paletteGenerator';

test('Tests generateTailwindPalette', () => {
    const tailwindPaletteTest: number[] = [
        50,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        950,
    ];

    const noLighting = generateTailwindPalette("#E8F5F2");
    // expect(noLighting[50][0]).toBe(0.98479241755101);
    // expect(noLighting[950][0]).toBe(0.21521549312588986);
    tailwindPaletteTest.forEach((value) => {
            expect(noLighting[value]).toBeDefined();
        });
    const oneSpecialLighting = generateTailwindPalette("#d4e9f8");
    // expect(oneSpecialLighting[50][0]).toBe(0.9859195842072777);
    // expect(oneSpecialLighting[950][0]).toBe(0.21500800373694093);
    tailwindPaletteTest.forEach((value) => {
        expect(oneSpecialLighting[value]).toBeDefined();
    });
    const oneNormalLighting = generateTailwindPalette("#bbcfe0");
    // expect(oneNormalLighting[50][0]).toBe(0.9777070282591492);
    // expect(oneNormalLighting[950][0]).toBe(0.2988313874136293);
    tailwindPaletteTest.forEach((value) => {
        expect(oneNormalLighting[value]).toBeDefined();
    });
    const noDarking = generateTailwindPalette("#000001");
    // expect(noDarking[50][0]).toBe(0.9970251851547624);
    // expect(noDarking[950][0]).toBe(0.31316712735405455);
    tailwindPaletteTest.forEach((value) => {
        expect(noDarking[value]).toBeDefined();
    });
    const oneSpecialDarking = generateTailwindPalette("#00020b");
    // expect(oneSpecialDarking[50][0]).toBe(0.9970251851547624);
    // expect(oneSpecialDarking[950][0]).toBe(0.36803027985758724);
    tailwindPaletteTest.forEach((value) => {
        expect(oneSpecialDarking[value]).toBeDefined();
    });
    const oneNormalDarking = generateTailwindPalette("#030815");
    // expect(oneNormalDarking[50][0]).toBe(0.9851036453012394);
    // expect(oneNormalDarking[950][0]).toBe(0.3563449623638112);
    tailwindPaletteTest.forEach((value) => {
        expect(oneNormalDarking[value]).toBeDefined();
    });
    const midpoint = generateTailwindPalette("#30599c");
    // expect(midpoint[50][0]).toBe(0.9727610347544721);
    // expect(midpoint[950][0]).toBe(0.24799593650111168);
    tailwindPaletteTest.forEach((value) => {
        expect(midpoint[value]).toBeDefined();
    });
});
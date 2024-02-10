import {
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  argbFromHex,
  DynamicScheme,
  TonalPalette,
  SchemeTonalSpot,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeVibrant,
} from "@material/material-color-utilities";
import chroma from 'chroma-js';

import { paletteChroma, paletteMCU, paletteTailwind } from './palette';

export const schemeFromMultiple = (source, primary, secondary, schemeString) => {
  const scheme = (() => {
    switch (schemeString) {
      case "content":
        return SchemeContent;
        case "expressive":
          return SchemeExpressive
          case "fidelity":
            return SchemeFidelity
            case "monochrome":
              return SchemeMonochrome
              case "neutral":
                return SchemeNeutral
                case "vibrant":
                  return SchemeVibrant;
                  case 'tonalSpot':
                    return SchemeTonalSpot;
                    default: 
                    return SchemeTonalSpot;
                  }
                })();
                
  const lightScheme = new DynamicScheme({
      sourceColorArgb: argbFromHex(source),
      variant: scheme,
      isDark: false,
      contrastLevel: 0.0,
      primaryPalette: TonalPalette.fromInt(argbFromHex(chroma(primary).hex())),
      secondaryPalette: TonalPalette.fromInt(argbFromHex(chroma(secondary).hex())),
      tertiaryPalette: TonalPalette.fromInt(source),
      neutralPalette: TonalPalette.fromInt(source),
      neutralVariantPalette: TonalPalette.fromInt(source)
  });
  const darkScheme = new DynamicScheme({
      sourceColorArgb: argbFromHex(source),
      variant: scheme,
      isDark: true,
      contrastLevel: 0.0,
      primaryPalette: TonalPalette.fromInt(argbFromHex(chroma(primary).hex())),
      secondaryPalette: TonalPalette.fromInt(argbFromHex(chroma(secondary).hex())),
      tertiaryPalette: TonalPalette.fromInt(source),
      neutralPalette: TonalPalette.fromInt(source),
      neutralVariantPalette: TonalPalette.fromInt(source)
  });
  // const lightScheme = new scheme(Hct.fromInt(source), false, 0.0);
  // const darkScheme = new scheme(Hct.fromInt(source), true, 0.0);

  const primaryPalette = TonalPalette.fromInt(argbFromHex(chroma(source).hex()));
  const steps = [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ];

  const colors = {
  };
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    colors[step ] = (hexFromArgb(primaryPalette.tone(step)));
  }

  // const colors = {
  //   transparent: "transparent",
  //   current: "currentColor",
  //   black: "#000000",
  //   white: "#ffffff",
  // };

    
  Object.keys(MaterialDynamicColors).forEach((key) => {
    const property = MaterialDynamicColors[key];
    if (property && typeof property.getArgb === 'function') {
      if (hexFromArgb(chroma.valid(property.getArgb(lightScheme)))) {
        if (!["shadow", "scrim"].includes(key)) {
          const kebabName = kebabize(key);
          try {
              colors[`${kebabName}-light`] = hexFromArgb(property.getArgb(lightScheme)); 
              colors[`${kebabName}-dark`] = hexFromArgb(property.getArgb(darkScheme)); 
            
          } catch (error) {
            console.error(`Error processing ${kebabName}:`, error);
          };
        }
      };
    };
  });
  
  return colors;
};




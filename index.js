import md5 from "md5";
import GitHubLanguageColors from "./colors.json";
export function getColorForLanguage(language) {
    if (!language) {
        return "#000000";
    }
    if (GitHubLanguageColors.hasOwnProperty(language)) {
        const color = GitHubLanguageColors[language];
        return darkenHSL(hexToHSL(color), 10);
    }
    return stringToHSLColor(language);
}
export function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    }
    else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return "hsl(" + h + "," + s + "%," + l + "%)";
}
export function stringToHSLColor(str) {
    const hex = "#" + md5(str).slice(3, 9);
    return hexToHSL(hex);
}
export function lightenHSL(hsl, percent = 40) {
    const [h, s, l] = hsl
        .replace("hsl(", "")
        .replace(")", "")
        .split(",")
        .map((x) => parseInt(x));
    const newL = Math.min(100, l + percent);
    return `hsl(${h}, ${s}%, ${newL}%)`;
}
export function darkenHSL(hsl, percent = 60) {
    return lightenHSL(hsl, -percent);
}

export const capitalize = (string) => `${string[0].toUpperCase()}${string.substring(1)}`;

export const round = (num) => Math.round(num * 1000) / 1000;

export const removeUnderscores = (string) => string.split('_').join(' ');

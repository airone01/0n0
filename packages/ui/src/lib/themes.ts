type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;
type Writeable<T> = {-readonly [P in keyof T]: T[P]};

export const themesColors = [
	'gray', 'orange', 'yellow', 'rose', 'green', 'blue',
] as const;
export const themesLuminiosity = ['dark', 'light'] as const;

// If you get an error at `compilerMightFailHere`, complete the following array:
export const themes = [
	'orange-dark',
	'gray-dark',
	'gray-light',
	'orange-light',
	'rose-dark',
	'rose-light',
	'green-dark',
	'green-light',
	'blue-dark',
	'blue-light',
	'yellow-dark',
	'yellow-light',
] as const;
type ThemesArray = Writeable<typeof themes>;
type ThemeFromArray = ThemesArray[number];
type ThemeFromString = `${ThemeColors}-${ThemeLuminiosity}`;

// This is to check that no themes were missed. Check before commiting.
type CompilerErrorMessage = 'You missed some themes in the themes array above :-). Complete it with each theme in the format `colors-luminiosity`.';
type TestedThemes = IfEquals<ThemeFromArray, ThemeFromString, 'equals', CompilerErrorMessage>;
const compilerMightFailHere: TestedThemes = 'equals';

export type ThemeColors = typeof themesColors[number];
export type ThemeLuminiosity = typeof themesLuminiosity[number];
export type Theme = ThemeFromArray;

export function getPrimaryFromColor(color: ThemeColors) {
	switch (color) {
		case 'gray': {
			return 'bg-[#18181b] dark:bg-[#fafafa]';
		}

		case 'orange': {
			return 'bg-[#ea580c]';
		}

		case 'yellow': {
			return 'bg-[#facc15]';
		}

		case 'rose': {
			return 'bg-[#e11d48]';
		}

		case 'green': {
			return 'bg-[#16a34a] dark:bg-[#22c55e]';
		}

		case 'blue': {
			return 'bg-[#2563eb] dark:bg-[#3b82f6]';
		}
	}
}

export interface IGlobalState {
  isMobile?: boolean;
  theme?: string;
  init?: boolean;
  initialise?: (theme?: string) => void;
  toggleTheme?: () => void;
}

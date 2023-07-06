export interface IGlobalState {
  isMobile?: boolean;
  theme?: string;
  init?: boolean;
  initialise?: () => void;
  toggleTheme?: () => void;
}

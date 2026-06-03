interface GlobalSearchDropdownState {
  isOpen: boolean;
  selectedIndex: number;
}

type GlobalSearchDropdownAction =
  | { selectedIndex: number; type: 'select' }
  | { type: 'clear' }
  | { type: 'close' }
  | { type: 'open' };

export type { GlobalSearchDropdownAction, GlobalSearchDropdownState };

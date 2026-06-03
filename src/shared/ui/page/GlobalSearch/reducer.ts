import type { GlobalSearchDropdownAction, GlobalSearchDropdownState } from './types.ts';

export const initialGlobalSearchDropdownState: GlobalSearchDropdownState = {
  isOpen: false,
  selectedIndex: -1
};

export const globalSearchDropdownReducer = (
  state: GlobalSearchDropdownState,
  action: GlobalSearchDropdownAction
): GlobalSearchDropdownState => {
  switch (action.type) {
    case 'clear':
      return initialGlobalSearchDropdownState;
    case 'close':
      return {
        ...state,
        isOpen: false,
        selectedIndex: -1
      };
    case 'open':
      return {
        ...state,
        isOpen: true
      };
    case 'select':
      return {
        ...state,
        selectedIndex: action.selectedIndex
      };
  }
};

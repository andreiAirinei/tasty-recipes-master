import { createSelector } from 'reselect';

const selectUI = state => state.ui;

export const selectInfinityListSettings = createSelector(
  [selectUI],
  ui => ui.infinityListSettings
);
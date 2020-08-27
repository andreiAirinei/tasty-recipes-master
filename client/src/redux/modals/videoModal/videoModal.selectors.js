import { createSelector } from 'reselect';

const selectVideoModal = state => state.videoModal;

export const selectVideoActive = createSelector(
  [selectVideoModal],
  videoModal => videoModal.isActive
);

export const selectVideoURL = createSelector(
  [selectVideoModal],
  videoModal => videoModal.videoURL
);
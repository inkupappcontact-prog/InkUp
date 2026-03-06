// Constants for InkUp Application

// UI Dimensions
export const UI_DIMENSIONS = {
  READER_ZOOM_LEVEL: 1100,
  MODAL_WIDTH: 800,
  SIDEBAR_WIDTH: 250,
  HEADER_HEIGHT: 60,
} as const;

// Delays and Timeouts
export const TIMING = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 3000,
  AUTO_SAVE_DELAY: 2000,
} as const;

// Pagination
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_VISIBLE_PAGES: 5,
} as const;

// Pricing
export const PRICING = {
  MIN_COMIC_PRICE: 5,
  MAX_COMIC_PRICE: 50,
  AUTHOR_ROYALTY: 0.7, // 70%
} as const;

// File sizes
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_PDF_SIZE: 20 * 1024 * 1024, // 20MB
} as const;

// Text limits
export const TEXT_LIMITS = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_AUTHOR_NAME_LENGTH: 50,
} as const;

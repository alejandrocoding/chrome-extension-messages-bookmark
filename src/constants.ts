export const BOOKMARK_FOLDER: chrome.bookmarks.BookmarkCreateArg = {
  parentId: '1',
  title: 'BookMark!',
} as const;

export const BOOKMARK_LINK: chrome.bookmarks.BookmarkCreateArg = {
  title: 'My first BookMark from Extension!',
  url: 'https://google.es/',
} as const;

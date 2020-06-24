import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { BOOKMARK_FOLDER, BOOKMARK_LINK } from './constants';


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.myBookMark) {
    chrome.bookmarks.getTree((bookmarks) => {
      const bookmarkBar = bookmarks[0].children.find(
        (bookmark) => bookmark.id === '1'
      );
      const existAlready = bookmarkBar.children.find(
        (bookmark) => bookmark.title === BOOKMARK_FOLDER.title
      );
      if (!existAlready) {
        addBookMarkFolder()
          .pipe(concatMap((folder) => addBookMarkLink(folder)))
          .subscribe((result) => sendResponse(result));
      }
    });
  }
});

function addBookMarkFolder(): Observable<chrome.bookmarks.BookmarkTreeNode> {
  return new Observable((observer) =>
    chrome.bookmarks.create(BOOKMARK_FOLDER, (bookMarkFolder) =>
      observer.next(bookMarkFolder)
    )
  );
}

function addBookMarkLink(bookMarkFolder: chrome.bookmarks.BookmarkTreeNode): Observable<string> {
  return new Observable((observer) =>
    chrome.bookmarks.create(
      { ...BOOKMARK_LINK, parentId: bookMarkFolder.id },
      (bookMark) => observer.next(`Added folder ${bookMarkFolder.title} & link ${bookMark.title}`)
    )
  );
}

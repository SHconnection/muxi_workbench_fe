export function getScrollTop() {
  const appContainer = document.querySelector(".app-container");
  if (appContainer) return appContainer.scrollTop;
  return 0;
}

export function getScrollHeight() {
  const appContainer = document.querySelector(".app-container");
  if (appContainer) return appContainer.scrollHeight;
  return 0;
}
export function getContainerHeight() {
  const appContainer = document.querySelector(".app-container");
  if (appContainer) return appContainer.offsetHeight;
  return 0;
}

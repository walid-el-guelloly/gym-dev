export default function navigateTo(path) {
  if (
    window &&
    window.history &&
    typeof window.history.pushState === "function"
  ) {
    window.history.pushState({}, "", path);
    // notify listeners
    window.dispatchEvent(new PopStateEvent("popstate"));
  } else {
    window.location.href = path;
  }
}

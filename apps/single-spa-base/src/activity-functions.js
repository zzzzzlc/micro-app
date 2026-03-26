export function pathPrefix(prefix) {
  return function (location) {
    return location.pathname.startsWith(prefix);
  };
}
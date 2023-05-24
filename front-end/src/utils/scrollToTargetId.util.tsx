/**
 * This function scrolls to a specified element on the page with various options for scrolling
 * behavior.
 * @param {string} id - a string representing the id of the element to be scrolled to.
 */
export const scrollToTarget = (id: string) => {
  // some of the element should be added  asynchronously ex navigation.
  // so we need to wait for the element to be added to the dom and then scroll to that location
  setTimeout(() => {
    const element = document.getElementById(id);
    element?.scrollIntoView();
    element?.scrollIntoView(false);
    element?.scrollIntoView({ block: "end" });
    element?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, 10);
};

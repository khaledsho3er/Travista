/**
 * Enhances scrollbar visibility during scrolling
 * Adds a class to make scrollbars visible while scrolling
 */
export const initScrollbarVisibility = () => {
  let scrollTimer;
  const scrollableElements = document.querySelectorAll("*");

  // Function to handle scroll events
  const handleScroll = (event) => {
    const element = event.target;

    // Add the scrolling-active class
    element.classList.add("scrolling-active");

    // Clear any existing timer
    clearTimeout(scrollTimer);

    // Set a timer to remove the class after scrolling stops
    scrollTimer = setTimeout(() => {
      element.classList.remove("scrolling-active");
    }, 1500); // Keep visible for 1.5 seconds after scrolling stops
  };

  // Add scroll event listeners to all scrollable elements
  scrollableElements.forEach((element) => {
    if (isScrollable(element)) {
      element.addEventListener("scroll", handleScroll);
    }
  });
};

/**
 * Checks if an element is scrollable
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is scrollable
 */
const isScrollable = (element) => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};

// Auto-scroll functionality with hover pause
const scrollBox = document.getElementById("scrollBox");
let scrollSpeed = 1;
let isHovering = false;

function autoScroll() {
  if (!isHovering) {
    scrollBox.scrollLeft += scrollSpeed;
    if (scrollBox.scrollLeft >= scrollBox.scrollWidth - scrollBox.clientWidth) {
      scrollBox.scrollLeft = 0; // loop back to start
    }
  }
  requestAnimationFrame(autoScroll);
}

scrollBox.addEventListener("mouseenter", () => (isHovering = true));
scrollBox.addEventListener("mouseleave", () => (isHovering = false));

autoScroll();

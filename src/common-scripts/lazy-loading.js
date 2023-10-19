function lazyLoad() {
  const lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  const changeSource = (lazyImage) => {
    if (lazyImage.src) {
      lazyImage.src = lazyImage.dataset.src;
    } else {
      lazyImage.srcset = lazyImage.dataset.src;
    }
    lazyImage.classList.remove("lazy");
  };

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;

          changeSource(lazyImage);
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    lazyImages.forEach((lazyImage) => {
      changeSource(lazyImage);
    });
  }
}

document.addEventListener("DOMContentLoaded", lazyLoad);

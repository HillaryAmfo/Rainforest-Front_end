document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  let index = 0;
  const slides = track.children;
  const total = slides.length;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function slideNext() {
    index = (index + 1) % total;
    updateSlide();
  }

  function slidePrev() {
    index = (index - 1 + total) % total;
    updateSlide();
  }

  // Auto-slide
  setInterval(slideNext, 8000);

  // Expose buttons globally (if needed)
  window.slideNext = slideNext;
  window.slidePrev = slidePrev;
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-target]');

  const animateCounter = (el, target) => {
    let count = 0;
    const step = Math.ceil(target / 200);
    const update = () => {
      count += step;
      if (count < target) {
        el.innerText = count;
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.6
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

fetch('/Rainforest-Front_end/assets/components/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Load the footer
fetch('/Rainforest-Front_end/assets/components//footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });
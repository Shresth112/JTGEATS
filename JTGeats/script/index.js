document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', function () {
      const cardDetails = this.closest('.card-details');
      const counterContainer = cardDetails.querySelector('.counter-container');
      this.style.visibility = 'hidden'; // Hide "Add" button
      this.style.opacity = '0'; // Smoothly fade out
      counterContainer.classList.add('show'); // Show counter
  });
});

document.querySelectorAll('.increment-btn').forEach(button => {
  button.addEventListener('click', function () {
      const counter = this.closest('.counter-container').querySelector('.counter');
      counter.textContent = parseInt(counter.textContent) + 1;
  });
});

document.querySelectorAll('.decrement-btn').forEach(button => {
  button.addEventListener('click', function () {
      const counter = this.closest('.counter-container').querySelector('.counter');
      let count = parseInt(counter.textContent);
      if (count > 1) {
          counter.textContent = count - 1;
      } else {
          // Reset to initial state
          const cardDetails = this.closest('.card-details');
          const addButton = cardDetails.querySelector('.add-btn');
          cardDetails.querySelector('.counter-container').classList.remove('show');
          addButton.style.visibility = 'visible'; // Show "Add" button
          addButton.style.opacity = '1'; // Smoothly fade in
      }
  });
});

const slider = document.getElementById("slider");
const prevBtn1 = document.getElementById("prevBtn");
const nextBtn1 = document.getElementById("nextBtn");

// Clone the first and last cards for the circular effecta
const sliderCards = slider.children;
const firstCard = sliderCards[0].cloneNode(true);
const lastCard = sliderCards[sliderCards.length - 1].cloneNode(true);

// Add clones to the slider
slider.appendChild(firstCard);
slider.insertBefore(lastCard, sliderCards[0]);

// Variables to control the slider
let currentIndex1 = 1;
const cardWidth = sliderCards[0].offsetWidth + 20;

// Initial positioning
slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

// Event listeners for buttons
nextBtn1.addEventListener("click", () => {
  if (currentIndex1 >= sliderCards.length - 1) {
    slider.style.transition = "none";
    currentIndex1 = 1;
    slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease";
      currentIndex1++;
      slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
    }, 0);
  } else {
    currentIndex1++;
    slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
  }
});

prevBtn1.addEventListener("click", () => {
  if (currentIndex1 <= 0) {
    slider.style.transition = "none";
    currentIndex1 = sliderCards.length - 2;
    slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease";
      currentIndex1--;
      slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
    }, 0);
  } else {
    currentIndex1--;
    slider.style.transform = `translateX(-${cardWidth * currentIndex1}px)`;
  }
});

// Slider


document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".slider-btn");
  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;
  let isDragging = false,
      startX,
      startScrollLeft;

  const dragStart = (e) => {
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
      if (!isDragging) return;
      const x = e.pageX || e.touches[0].pageX;
      carousel.scrollLeft = startScrollLeft - (x - startX);
  };

  const dragStop = () => {
      isDragging = false;
  };

  const autoPlay = () => {
      if (window.innerWidth < 800) return;
      setInterval(() => {
          carousel.scrollLeft += firstCardWidth;
      }, 3000);
  };

  arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
  });

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchstart", dragStart);
  carousel.addEventListener("touchmove", dragging);
  carousel.addEventListener("touchend", dragStop);

  autoPlay();
});

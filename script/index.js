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

// Slider

document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.querySelector(".carousel-track");
  const sliderCards = document.querySelectorAll(".slider-card");
  const leftButton = document.querySelector(".carousel-btn.left");
  const rightButton = document.querySelector(".carousel-btn.right");
  const totalCards = sliderCards.length;
  const visibleCards = 3; // Number of cards visible at a time
  const cardWidth = 300 + 20; // Card width (300px) + margin (10px each side)

  let currentSlideIndex = 0;
  let autoSlideInterval;
  const autoSlideDelay = 3000;

  // Clone first and last few cards for infinite scrolling effect
  const cloneFirst = [];
  const cloneLast = [];
  for (let i = 0; i < visibleCards; i++) {
    cloneFirst.push(sliderCards[i].cloneNode(true));
    cloneLast.push(sliderCards[totalCards - 1 - i].cloneNode(true));
  }
  cloneFirst.forEach(card => carouselTrack.appendChild(card));
  cloneLast.reverse().forEach(card => carouselTrack.insertBefore(card, carouselTrack.firstChild));

  // Update the track position
  function updateTrackPosition() {
    const newPosition = -(currentSlideIndex * cardWidth);
    carouselTrack.style.transform = `translateX(${newPosition}px)`;
    carouselTrack.style.transition = "transform 0.5s ease-in-out";
    updateHoverState();
  }

  // Update hover state for the middle card
  function updateHoverState() {
    const allCards = document.querySelectorAll(".carousel-track .slider-card");
    allCards.forEach((card, index) => {
      card.classList.toggle(
        "middle",
        index === currentSlideIndex + Math.floor(visibleCards / 2)
      );
    });
  }

  // Slide left
  function slideLeft() {
    if (currentSlideIndex === 0) {
      currentSlideIndex = totalCards;
      carouselTrack.style.transition = "none";
      updateTrackPosition();
      setTimeout(() => {
        currentSlideIndex--;
        carouselTrack.style.transition = "transform 0.5s ease-in-out";
        updateTrackPosition();
      }, 20);
    } else {
      currentSlideIndex--;
      updateTrackPosition();
    }
    resetAutoSlide();
  }

  // Slide right
  function slideRight() {
    if (currentSlideIndex === totalCards) {
      currentSlideIndex = 0;
      carouselTrack.style.transition = "none";
      updateTrackPosition();
      setTimeout(() => {
        currentSlideIndex++;
        carouselTrack.style.transition = "transform 0.5s ease-in-out";
        updateTrackPosition();
      }, 20);
    } else {
      currentSlideIndex++;
      updateTrackPosition();
    }
    resetAutoSlide();
  }

  // Reset auto-slide
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      slideRight();
    }, autoSlideDelay);
  }

  // Start auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      slideRight();
    }, autoSlideDelay);
  }

  // Attach event listeners
  leftButton.addEventListener("click", slideLeft);
  rightButton.addEventListener("click", slideRight);

  // Initialize carousel
  updateTrackPosition();
  startAutoSlide();
});

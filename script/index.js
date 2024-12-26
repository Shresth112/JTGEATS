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
  const carouselTrack = document.querySelector('.carousel-track');
  const sliderCards = document.querySelectorAll('.slider-card');
  const slideCardWidth = 320; // Width of a single card including margin
  const totalCards = sliderCards.length;

  if (!carouselTrack) {
    console.error("Carousel track element not found!");
    return;
  }

  let currentSlideIndex = 0;
  let autoSlideInterval;
  const autoSlideDelay = 3000; // Time interval for auto-slide
  const manualSlidePauseDuration = 5000; // Pause auto-slide for 5 seconds after a manual interaction

  // Update track position
  function updateTrackPosition() {
    const newPosition = -(currentSlideIndex * slideCardWidth);
    carouselTrack.style.transform = `translateX(${newPosition}px)`;
    carouselTrack.style.transition = "transform 0.5s ease-in-out";
  }

  // Slide left
  function slideLeft() {
    currentSlideIndex = (currentSlideIndex - 1 + totalCards) % totalCards; // Wrap to the last card
    updateTrackPosition();
    resetAutoSlide();
  }

  // Slide right
  function slideRight() {
    currentSlideIndex = (currentSlideIndex + 1) % totalCards; // Wrap to the first card
    updateTrackPosition();
    resetAutoSlide();
  }

  // Reset auto-slide with a delay
  function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Stop auto-slide
    autoSlideInterval = setInterval(() => {
      slideRight();
    }, autoSlideDelay); // Restart auto-slide after a pause
  }

  // Initialize auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      slideRight();
    }, autoSlideDelay);
  }

  // Attach click handlers to the left and right buttons
  const leftButton = document.querySelector(".carousel-btn.left");
  const rightButton = document.querySelector(".carousel-btn.right");

  if (leftButton && rightButton) {
    leftButton.addEventListener("click", slideLeft);
    rightButton.addEventListener("click", slideRight);
  } else {
    console.error("Carousel buttons not found!");
  }

  // Start the auto-slide
  startAutoSlide();
});

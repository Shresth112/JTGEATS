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

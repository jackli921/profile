document.addEventListener('DOMContentLoaded', () => {
  const koans = [...document.querySelectorAll('.koan')];
  const subTaglineLink = document.getElementById('open-modal');
  const subTaglineExplanation = document.getElementById('sub-tagline-explanation');
  const socialReveal = document.querySelector('.social-reveal');

  // Initialize subTaglineExplanation as hidden
  subTaglineExplanation.classList.remove('show');

  // Set hint on first unclicked koan
  const updateHint = () => {
    koans.forEach(koan => koan.classList.remove('hint'));
    const firstUnclicked = koans.find(koan => koan.dataset.clicked !== 'true');
    if (firstUnclicked) {
      firstUnclicked.classList.add('hint');
    }
  };

  // Initialize hint on first koan
  updateHint();

  const checkAllKoansClicked = () => {
    return koans.every(koan => koan.dataset.clicked === 'true');
  };

  const updateSocialReveal = () => {
    if (checkAllKoansClicked()) {
      socialReveal.classList.add('show');
    } else {
      socialReveal.classList.remove('show');
    }
  };

  // Close all explanations
  const closeAllExplanations = () => {
    koans.forEach(koan => {
      koan.querySelector('.explanation').classList.remove('show');
      koan.classList.remove('open');
    });
    subTaglineExplanation.classList.remove('show');
    subTaglineLink.classList.remove('open');
  };

  koans.forEach((koan, index) => {
    koan.addEventListener('click', (e) => {
      const isAlreadyClicked = koan.dataset.clicked === 'true';
      const explanation = koan.querySelector('.explanation');
      const isExplanationOpen = explanation.classList.contains('show');

      // Close all other explanations first
      koans.forEach(otherKoan => {
        if (otherKoan !== koan) {
          otherKoan.querySelector('.explanation').classList.remove('show');
          otherKoan.classList.remove('open');
        }
      });
      subTaglineExplanation.classList.remove('show');
      subTaglineLink.classList.remove('open');

      if (isAlreadyClicked) {
        // If clicking an already-clicked koan
        if (isExplanationOpen) {
          // Just close the explanation
          explanation.classList.remove('show');
          koan.classList.remove('open');
        } else {
          // Retreat: unclick this and all koans below it
          for (let i = index; i < koans.length; i++) {
            koans[i].dataset.clicked = 'false';
            koans[i].classList.remove('clicked');
          }
          updateHint();
          updateSocialReveal();
        }
      } else {
        // Clicking an unclicked koan - mark as clicked
        koan.dataset.clicked = 'true';
        koan.classList.add('clicked');

        // Show explanation
        explanation.classList.add('show');
        koan.classList.add('open');

        updateHint();
        updateSocialReveal();
      }
    });
  });

  subTaglineLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Close all koan explanations
    koans.forEach(koan => {
      koan.querySelector('.explanation').classList.remove('show');
      koan.classList.remove('open');
    });

    // Toggle the sub-tagline explanation
    subTaglineExplanation.classList.toggle('show');
    subTaglineLink.classList.toggle('open');
  });

  // Close explanations when clicking outside
  document.addEventListener('click', (e) => {
    const clickedOnKoan = e.target.closest('.koan');
    const clickedOnSubTagline = e.target.closest('#open-modal');
    const clickedOnExplanation = e.target.closest('.explanation');

    // If clicked outside all interactive elements and explanations
    if (!clickedOnKoan && !clickedOnSubTagline && !clickedOnExplanation) {
      closeAllExplanations();
    }
  });
});

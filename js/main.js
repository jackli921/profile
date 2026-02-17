document.addEventListener('DOMContentLoaded', () => {
  const koans = document.querySelectorAll('.koan');
  const subTaglineLink = document.getElementById('open-modal');
  const subTaglineExplanation = document.getElementById('sub-tagline-explanation');
  const socialIcons = document.querySelector('.social-icons');

  // Initialize subTaglineExplanation as hidden
  subTaglineExplanation.classList.remove('show');

  // Set hint on first unclicked koan
  const updateHint = () => {
    koans.forEach(koan => koan.classList.remove('hint'));
    const firstUnclicked = [...koans].find(koan => koan.dataset.clicked !== 'true');
    if (firstUnclicked) {
      firstUnclicked.classList.add('hint');
    }
  };

  // Initialize hint on first koan
  updateHint();

  const checkAllKoansClicked = () => {
    return [...koans].every(koan => koan.dataset.clicked === 'true');
  };

  const revealSocialIcons = () => {
    if (checkAllKoansClicked()) {
      socialIcons.classList.add('show');
    }
  };

  koans.forEach(koan => {
    koan.addEventListener('click', () => {
      // Mark as clicked and add clicked class for styling
      koan.dataset.clicked = 'true';
      koan.classList.add('clicked');

      // Update hint to next unclicked koan
      updateHint();

      // Check if all clicked to reveal social icons
      revealSocialIcons();

      // Close all other explanations (including sub-tagline explanation)
      koans.forEach(otherKoan => {
        if (otherKoan !== koan) {
          otherKoan.querySelector('.explanation').classList.remove('show');
          otherKoan.classList.remove('open');
        }
      });
      subTaglineExplanation.classList.remove('show');
      subTaglineLink.classList.remove('open');

      // Toggle the current explanation
      const explanation = koan.querySelector('.explanation');
      explanation.classList.toggle('show');
      koan.classList.toggle('open');
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
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.koan') && !e.target.closest('#open-modal')) {
      koans.forEach(koan => {
        koan.querySelector('.explanation').classList.remove('show');
        koan.classList.remove('open');
      });
      subTaglineExplanation.classList.remove('show');
      subTaglineLink.classList.remove('open');
    }
  });
});

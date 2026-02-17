document.addEventListener('DOMContentLoaded', () => {
  const koans = document.querySelectorAll('.koan');
  const subTaglineLink = document.getElementById('open-modal');
  const subTaglineExplanation = document.getElementById('sub-tagline-explanation');
  const socialIcons = document.querySelector('.social-icons');

  // Initialize subTaglineExplanation as hidden
  subTaglineExplanation.classList.remove('show');

  const elementsToClick = [...koans, subTaglineLink];

  const checkAllClicked = () => {
    const allClicked = elementsToClick.every(el => {
      console.log(`Element: ${el.id || el.className}, clicked: ${el.dataset.clicked}`);
      return el.dataset.clicked === 'true';
    });
    console.log(`All elements clicked: ${allClicked}`);
    return allClicked;
  };

  const revealSocialIcons = () => {
    if (checkAllClicked()) {
      socialIcons.classList.add('show');
      console.log('Social icons revealed!');
    } else {
      console.log('Not all elements clicked yet.');
    }
  };

  koans.forEach(koan => {
    koan.addEventListener('click', () => {
      koan.dataset.clicked = 'true';
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
    subTaglineLink.dataset.clicked = 'true';
    revealSocialIcons();

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

// Simple client-side password gate (session-based)
(function () {
  const PASSWORD = 'pleaseenter';
  const STORAGE_KEY = 'site_unlocked_v1';

  function unlock() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    const overlay = document.getElementById('authOverlay');
    if (overlay) overlay.remove();
    document.body.style.overflow = '';
    document.documentElement.classList.remove('auth-active');
    document.body.classList.remove('auth-active');
  }

  function showOverlay() {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // also add a class so CSS can target html/body to fully block scrolling
    document.documentElement.classList.add('auth-active');
    document.body.classList.add('auth-active');

    const form = document.getElementById('authForm');
    const input = document.getElementById('authPassword');
    const error = document.getElementById('authError');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      error.textContent = '';
      const val = input.value || '';
      if (val.trim() === PASSWORD) {
        unlock();
      } else {
        error.textContent = 'Incorrect password — please try again.';
        input.value = '';
        input.focus();
      }
    });

    // allow Enter key handling is covered by the form submit
    // focus on the password field
    input.focus();
  }

  // Run early on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        // already unlocked this session
        return;
      }

      // If not unlocked, show overlay and block interaction
      showOverlay();
    } catch (err) {
      console.warn('Auth overlay failed:', err);
    }
  }
})();

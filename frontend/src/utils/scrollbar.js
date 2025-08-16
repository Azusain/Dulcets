// Dynamic scrollbar color change script
let scrollTimeout;

function initScrollbarEffects() {
  const handleScroll = () => {
    // Add scrolling class when scrolling
    document.body.classList.add('scrolling');
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Remove scrolling class after scrolling stops
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 150);
  };

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Clean up function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
  };
}

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollbarEffects);
  } else {
    initScrollbarEffects();
  }
}

export { initScrollbarEffects };

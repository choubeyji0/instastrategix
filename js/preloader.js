document.addEventListener('DOMContentLoaded', function () {
  // Set dasharray/offset for smooth drawing
  const paths = document.querySelectorAll('.draw-path');
  paths.forEach(path => {
    const length = Math.ceil(path.getTotalLength());
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  // Hide preloader after animation completes (4s total buffer)
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 1000);
    }
  }, 4000);
});

//home

var sphereAnimation = (function() { 
  var spherePathEls = document.querySelectorAll('.sphere-animation .sphere path');
  var animations = [];

  // Breath Animation Setup
  var breathAnimation = anime({
    begin: function() {
      spherePathEls.forEach(function(pathEl, i) {
        animations.push(anime({
          targets: pathEl,
          stroke: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'],
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          duration: 500,
          autoplay: false
        }));
      });
    },
    update: function(ins) {
      animations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * 0.35) + (0.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  // Intro Animation Setup
  var introAnimation = anime.timeline({ autoplay: false })
    .add({
      targets: spherePathEls,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutCirc',
      duration: 3900,
      delay: anime.stagger(190, { direction: 'reverse' })
    });

  // Shadow Animation Setup
  var shadowAnimation = anime({
    targets: '#sphereGradient',
    x1: '25%',
    x2: '25%',
    y1: '0%',
    y2: '75%',
    duration: 30000,
    easing: 'easeOutQuint',
    autoplay: false
  });

  // Initialize and play animations
  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }
  
  init();
})();

//skills

let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

// State to track active scrolling
let isScrollActive = false;

// Function to apply card rotation for screens >720px
function rotateCards() {
  let angle = 0;
  cards.forEach((card) => {
    if (card.classList.contains("active")) {
      card.style.transform = `translate(8%, -190px)`;
    } else {
      card.style.transform = `translate(-80%, -190px) rotate(${angle}deg)`;
      angle = 0;
    }
  });
}

// Function to handle scroll-based card updates
function handleScroll() {
  if (!isScrollActive) return;

  let proportion =
    stackArea.getBoundingClientRect().top / window.innerHeight;
  if (proportion <= 0) {
    let n = cards.length;
    let index = Math.ceil((proportion * n) / 2);
    index = Math.abs(index) - 1;
    for (let i = 0; i < n; i++) {
      if (i <= index) {
        cards[i].classList.add("active");
      } else {
        cards[i].classList.remove("active");
      }
    }
    rotateCards();
  }
}

// Function to check screen size and toggle scroll logic
function checkScreenSize() {
  if (window.innerWidth > 1510) {
    if (!isScrollActive) {
      isScrollActive = true; // Enable scroll logic
      window.addEventListener("scroll", handleScroll);
      rotateCards(); // Initial transformation
    }
  } else {
    if (isScrollActive) {
      isScrollActive = false; // Disable scroll logic
      window.removeEventListener("scroll", handleScroll);

      // Reset card styles for smaller screens
      cards.forEach((card) => {
        card.style.transform = ""; // Clear transform
        card.classList.remove("active"); // Clear active class
      });

      // Ensure stack-area doesn't contribute to height issues
      stackArea.style.height = "auto";
    }
  }
}

// Initialize and listen for resize events
checkScreenSize();
window.addEventListener("resize", checkScreenSize);






document.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const checkboxes = document.querySelectorAll('.container1 input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  }
});





const toggle5 = document.getElementById('toggle5');
const sidebar5 = document.getElementById('sidebar5');

document.onclick = function(e){
  if(e.target.id !== 'sidebar5' && e.target.id !== 'toggle5'){
      toggle5.classList.remove('active');
      sidebar5.classList.remove('active')
  }
}

toggle5.onclick = function(){
  toggle5.classList.toggle('active');
  sidebar5.classList.toggle('active');
}












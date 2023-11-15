 const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))
  var slides2 = document.querySelectorAll('.slide');
  var btns = document.querySelectorAll('.btn'); 
  let currentSlide = 1;
  var manualNav = function(manual){ 
slides2.forEach((slide) => {
slide.classList.remove('active');
 btns.forEach((btn) => {
    btn.classList.remove('active');
    }); 
   }); 
   slides2[manual].classList.add('active'); 
   btns[manual].classList.add('active'); }

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

// add our event listeners
if(window.innerWidth < 850){
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('.subscription-page')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())

   // touch events
   slide.addEventListener('touchstart', pointerDown(index))
  slide.addEventListener('touchend', pointerUp)
  slide.addEventListener('touchmove', pointerMove)

   // mouse events
   slide.addEventListener('mousedown', pointerDown(index))
  slide.addEventListener('mouseup', pointerUp)
  slide.addEventListener('mouseleave', pointerUp)
  slide.addEventListener('mousemove', pointerMove)
})
}

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

// use a HOF so we have index in a closure
function pointerDown(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function pointerMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function getPositionX(event){
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX
}

function pointerUp() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    manualNav(currentIndex); 
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate;
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

var w=0;
window.onload = function(){
    w = window.innerWidth;
}
window.onresize = function(){
    if(window.innerWidth != w-10){
        location.reload();
    }
}

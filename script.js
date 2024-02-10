document.addEventListener("DOMContentLoaded", function() {
  setInterval(changeText, 4000); // Change text every 3 seconds
  setTimeout(deleteElement, 20000);
  hideElement();
});

const sentences = [
  "Hi Nhi,", 
  "Today is Valentine's Day,", 
  "And I made this website for you.", 
  "I wanted to create a digital website for our memories.", 
  "So here it is,"
];

let index = 1;

function changeText() {
  const changingText = document.getElementById("intro");
  changingText.innerText = sentences[index];
  changingText.classList.remove("text-focus-in"); // Remove animation class
  void changingText.offsetWidth; // Trigger reflow to restart animation
  changingText.classList.add("text-focus-in"); // Add animation class back
  index = (index + 1) % sentences.length; // Move to the next sentence
}

function deleteElement() {
  var element = document.getElementById("intro");
  if (element) {
    element.remove(); // Removes the element from the DOM
    // Alternatively, you can hide the element using:
    // element.style.display = "none";
  }
}

function hideElement() {
  var element = document.getElementById("image-track");
  if (element) {
    setTimeout(unhideElement, 20000);
  }
}

function unhideElement() {
  var element = document.getElementById("image-track");
  if (element) {
    element.style.opacity = "1";
  }
}

const track = document.getElementById("image-track")

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {

    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  

    track.dataset.percentage = nextPercentage;
    
    track.animate ({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")){
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards"});
      }
}
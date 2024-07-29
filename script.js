function locomotiveSetUp() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loaderAnimation(){
  var progress = document.querySelector(".progress");
var loader = document.querySelector("#loader");
var logo = document.querySelector("#startech-logo");

var grow ="0"
gsap.to("#loader img",{
    rotate:180,
    duration:18
})
var clr = setInterval(() => {
    grow++
progress.style.width = grow + "%";
console.log(grow);
},10);

setTimeout(() => {
    clearInterval(clr)
    gsap.to("#loader",{
height:"0",
duration:0.2,
ease:"power4"
    })
// loader.style.display = "none";
logo.style.display = "initial";
}, 1700);
}
loaderAnimation()
function form() {
  var form = document.querySelector("#form");
  var main = document.querySelector("#main");
  var input = document.querySelector(".input-div input");
  var inputDiv = document.querySelector(".input-div");
  var btn = document.querySelector(".button-div button");
  var skip = document.querySelector(".button-div h4");
  var h1 = document.querySelector("#welcome");
  // localStorage.clear();

  
//   gsap.from("#welcome",{
// x:100,
// duration:0.6,
// stagger:1,
// delay:2
//   })
  btn.addEventListener("click", () => {
    var inputValue = input.value;
    localStorage.setItem("username", inputValue);
    if (localStorage.length > 2) {
      console.log(localStorage.length);
    } else {
      inputDiv.style.display = "none";
      btn.style.display = "none";
      skip.style.display = "none";
      gsap.to(".form-background img", {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
      });
      setTimeout(() => {
        form.style.display = "none";
        main.style.display = "initial";
      page1Animation();

      },408);
    }
  });
}

form();

function page1Animation() {
  var tl = gsap.timeline();

tl.from(".page1 #first", {
  x: -100,
  opacity: 0,
  duration: 0.4,
  delay: 0.5,
});
tl.from(
  ".page1 #second",
  {
    x: 100,
    opacity: 0,
    duration: 0.4,
  },
  "-=0.4"
);
tl.from(
  ".page1 h4,.text-content img",
  {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
  },
  "-=0.5"
);

}
// #0f6679
  gsap.to("#page2,.page1", {
    background: " linear-gradient(to right,#a8d5de79,#298197)",
    scrollTrigger: {
      trigger: "#main",
      scroller: "body",
      markers:true,
      start: "top 30%",
      end: "top -20%",
      scrub: 2,
    },
  });

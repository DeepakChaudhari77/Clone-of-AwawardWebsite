let timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function circleMoveTrigger(xscale, yscale){
    window.addEventListener("mousemove", function(details){
        document.querySelector("#arrowcircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`
    })
}
circleMoveTrigger()

function circleskew(){
    let xscale = 1;
    let yscale = 1;
       
    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout)

        xscale = gsap.utils.clamp(0.8,1.2,dets.clientX-xprev)
        yscale = gsap.utils.clamp(0.8,1.2,dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        circleMoveTrigger(xscale, yscale)
        
        timeout = setTimeout(function() {
            document.querySelector("#arrowcircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        }, 100);
    });
}
circleskew()

function firstPageAnimation(){
    let tl = gsap.timeline();

    tl.from(".nav", {
        y : '10',
        duration: 1.5,
        opacity: 0,
        ease: Expo.easeInOut,
    })
    .to(".bundlingelem", {
        y: 0,
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: 0.2,
    })
    .from(".herofooter", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    })
}
firstPageAnimation();


document.querySelectorAll(".elem").forEach(function (elem){
    let rotate = 0;
    let diffrot = 0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
        })
    });

    elem.addEventListener("mousemove", function(details){
        let diff = details.clientY - elem.getBoundingClientRect().top
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power2,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-15,15,diffrot),
        })
    });
});

let currentDate = new Date()

document.getElementById('timeAndDate').innerText = currentDate.toDateString();
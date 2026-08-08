let loadingPercentage = 0;
let loadingCache = 0;
let target = 0;
let interval = null;
const svgNS = "http://www.w3.org/2000/svg";
const heroMetricCounters = document.querySelectorAll(".heroMetrics .metricCounter");
const heroMetrics = document.querySelector(".heroMetrics");
function metricCounterAnimationHandler(){

    const metricCounterVals = document.querySelectorAll(".metricCounter .counterVal");
    metricCounterVals.forEach((entry)=>{
        entry.classList.add("bounceUp")
        let counterVal = 0;
        const stopTarget = entry.dataset.count;
        const interval = setInterval(()=>{
            if(counterVal >= stopTarget){
                clearInterval(interval)
            }
            else{
                counterVal++;
                entry.innerHTML = counterVal;
            }
        }, Math.random() * 30)

    })
}
function svgBackgroundGenerator(elem){
    elem.forEach((childElem)=>{
    const refWidth = Math.floor(childElem.getBoundingClientRect().width);
    const refHeight = Math.floor(childElem.getBoundingClientRect().height);
    const svgCanvas = document.createElementNS(svgNS, "svg");
    svgCanvas.setAttribute("width", refWidth);
    svgCanvas.setAttribute("height", refHeight);
    svgCanvas.setAttribute("viewBox", `0 0 ${refWidth} ${refHeight}`);
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "filter1");
    
    const turbulence = document.createElementNS(svgNS, "feTurbulence");
    turbulence.setAttribute("type", "turbulence");
    turbulence.setAttribute("baseFrequency", "0.0033");
    turbulence.setAttribute("numOctaves", "1");
    turbulence.setAttribute("seed", "1");
    turbulence.setAttribute("stitchTiles", "stitch");
    filter.appendChild(turbulence);
    
    const blur = document.createElementNS(svgNS, "feGaussianBlur");
    blur.setAttribute("in", "noise");
    blur.setAttribute("stdDeviation", "0.9");
    blur.setAttribute("result", "blurredNoise");
    filter.appendChild(blur);
    svgCanvas.appendChild(filter)

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.style.opacity = 0.42;
    rect.setAttribute("filter", "url(#filter1)");
    svgCanvas.appendChild(rect);
    svgCanvas.style.position = "absolute";
    svgCanvas.style.zIndex = "-1";
    childElem.appendChild(svgCanvas);
})

    const intObs = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                metricCounterAnimationHandler();
                bannerElemAnimationHandler();
                intObs.unobserve(heroMetrics);
            }
        })
    }, {threshold: 0.1});
    intObs.observe(heroMetrics)
}
function updateUI(newTarget) {
    target = newTarget;

    if (!interval) {
        interval = setInterval(() => {
            loadingPercentage += 40;

            if (loadingPercentage > target) {
                loadingPercentage = target;
            }

            document.querySelector(".plCounterVal").innerHTML =
                Math.floor(loadingPercentage);

            if (loadingPercentage >= 100) {
                clearInterval(interval);
                interval = null;
                function hidePreloader(){     
                    setTimeout(()=>{
                    document.querySelector(".preloader").style.display = "none";
                }, 1000)
            }
                setTimeout(()=>{
                    document.querySelector(".preloader").classList.remove("active");
                    hidePreloader();
                    document.querySelector(".bannerTitleWrap h1").classList.add("fadeInRight")
                    document.querySelector(".bannerContent").classList.add("br_fadeInUp");

                    // const navlinksListItems = document.querySelectorAll(".navLinks li a");

                    svgBackgroundGenerator(heroMetricCounters);
                    // svgBackgroundGenerator(navlinksListItems);
                }, 1000)
            }
        }, 50);
    }
}
function bannerElemAnimationHandler(){
    const bannerDecorElem = document.querySelector(".bannerDecorElem");
    bannerDecorElem.classList.add("smoothSwing")
}

document.addEventListener("DOMContentLoaded", () => {
    const bannerImage = document.querySelector(".banner picture img");
    // preloader
    const preloader = document.querySelector("preloader");
    if (bannerImage.complete) {
        loadingCache += 80;
        updateUI(loadingCache);
    }
    document.fonts.ready.then(() => {
        loadingCache += 20;
        updateUI(loadingCache);
    });
    // About Section
    const aboutMediaHandler = () => {
       const aboutImageWrap = document.querySelector(".aboutImageWrap");
       const availableSpace = aboutImageWrap.getBoundingClientRect().width;
       const fluidContentLength = document.querySelector(".aboutFluidContent").innerText.length;
       aboutImageWrap.style.height = availableSpace / 1 + "px";
       const hexUnits = (availableSpace / 5.8);
       let hexTopMargin = (availableSpace / 10);
       let marginTopPatternArray = [2, 1, 0, 1, 2, 3, 4, 3, 2];
       let marginLeftPatternArray = [0, 1, 2, 3, 4, 3, 2, 1, 2];
       const hexagons = document.querySelectorAll(".aboutImageWrap .hexagon");
       hexagons.forEach((hexagon, i) => {
           hexagon.style.width = hexUnits + "px";
           hexagon.style.height = hexUnits + "px";
           hexagon.style.marginTop = (marginTopPatternArray[i] * hexTopMargin) + "px";
           hexagon.style.marginLeft = (marginLeftPatternArray[i] * hexUnits) + "px";
       });
       
       let lastHexMargin = parseFloat(hexagons[4].style.marginLeft);
       const totalHexRemainSpace = Math.round(availableSpace - (lastHexMargin + hexUnits));
       aboutImageWrap.style.padding = (totalHexRemainSpace/ 2) + "px";

       aboutImageWrap.classList.remove("settingUp");
       const aboutOriginal = document.querySelector(".aboutFluidContent").innerHTML;
       let aboutContent = [];
       let paddingContent = [];
       for (let i = 0; i <= (fluidContentLength - 40); i++) {
           aboutContent += aboutOriginal[i];
       }
       for (let i = 0; i <= (fluidContentLength - 20); i++) {
           paddingContent += aboutOriginal[i];
       }
       const extraContent = paddingContent.slice(-20);
       const newPara = document.createElement("p");
       const paddingSpan = document.createElement("span");
       paddingSpan.innerText = extraContent;
       paddingSpan.style.background = "linear-gradient(90deg, #292929, #0001)";
       paddingSpan.style.color = "transparent";
       paddingSpan.style.backgroundClip = "text";
       newPara.innerText = aboutContent;
       newPara.appendChild(paddingSpan);
       const continueSpan = document.createElement("span");
       continueSpan.style.marginLeft = "6px"
       continueSpan.innerText = ". . .";
       newPara.appendChild(continueSpan);
       document.querySelector(".aboutFluidContent").innerHTML = "";
       document.querySelector(".aboutFluidContent").appendChild(newPara);
    }
    aboutMediaHandler();

    const aboutCounters = document.querySelectorAll(".aboutCounter");
    aboutCounters.forEach((aboutCounter) => {
        aboutCounter.addEventListener("mouseover", (e) => {
            aboutCounters.forEach((aboutCounter) => {
                aboutCounter.classList.remove("active")
            })
            e.target.classList.add("active");
        })
    });

    
});


// fallback
setTimeout(() => {
    loadingPercentage = 100;
    document.querySelector(".plCounterVal").innerHTML = "100%";
    document.querySelector(".preloader").classList.remove("active");

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}, 5000);




// About Section
document.addEventListener("DOMContentLoaded", () => {

});


// Header and Footer load Handler
function loadComponent(id, filePath) {
    fetch(filePath).then(resp => {
        return resp.text()
    }).
    then((responseHTML) => {
        document.querySelector(`.${id}`).innerHTML = responseHTML;
        if (id === "templateHeader") {
            const header = document.querySelector(".header");
            const menuToggler = document.querySelector(".menuToggleWrap");
            // Scroll Tracker
            if (window.innerWidth >= 1023) {
                document.addEventListener("scroll", () => {
                    if (pageYOffset >= 600) {
                        header.classList.add("invisible");
                        menuToggler.classList.add("visible");
                    } else {
                        header.classList.remove("invisible");
                        menuToggler.classList.remove("visible");
                    }
                });
                menuToggler.addEventListener("click", () => {
                    menuToggler.classList.toggle("active");
                    header.classList.toggle("active");
                })

            } else {
                header.classList.add("mobileMenu");
                //     if(pageYOffset >= 600){}
            }


            // Responsive navigation menu  
            const navGroup = document.querySelector(".navGroup");
            // :: Small Screens::
            if (window.innerWidth <= 1023) {
                const hamburger = document.querySelector(".hamburger");
                const headerHeight = header.clientHeight;
                // navGroup handler
                const navGroupToggleHandler = () => {
                    if (navGroup.classList.contains("active")) {
                        navGroup.style.marginTop = (headerHeight + 2) + "px";
                        hamburger.setAttribute("aria-expanded", true);
                    } else {
                        navGroup.style.marginTop = -120 + "%";
                        hamburger.removeAttribute("aria-expanded", false);
                    }
                }
                document.addEventListener("click", (e) => {
                    if (!navGroup.contains(e.target) && !hamburger.contains(e.target)) {
                        navGroup.classList.remove("active");
                        hamburger.classList.remove("active");
                        navGroupToggleHandler();
                    }
                })
                hamburger.addEventListener("click", () => {
                    navGroup.classList.toggle("active");
                    hamburger.classList.toggle("active");
                    navGroupToggleHandler();
                });
            } else {
                // ::Large Screens::
                const hoverfloatRect = document.querySelector(".hoverfloat");
                const navLinks = document.querySelector(".navLinks");
                const allNavLinks = document.querySelectorAll(".navLinks li a");
                navLinks.addEventListener("mouseover", (e) => {
                    const rect = navLinks.getBoundingClientRect();
                    const hoverRectPos = rect.left;
                    const navigationLinks = document.querySelectorAll(".navLinks li a");
                    navigationLinks.forEach((navigationLink) => {
                        navigationLink.addEventListener("mouseover", (e) => {
                            const hoverfloatRectLeft = (navigationLink.getBoundingClientRect().left) - hoverRectPos;
                            hoverfloatRect.style.width = (e.currentTarget.clientWidth) - 12 + "px";
                            hoverfloatRect.style.marginLeft = ((hoverfloatRectLeft) + 6) + "px";
                            hoverfloatRect.style.opacity = 1;
                        })
                    })
                });
                allNavLinks.forEach((navLink) => {
                    navLink.addEventListener("click", (e) => {
                        allNavLinks.forEach((navlink) => navlink.classList.remove("active"));
                        e.target.classList.toggle("active");
                    })
                })
            }
        }
    });
}

// function svgTextGenerator(source){
//     console.log(source.innerText)
// }
// const textSources = document.querySelectorAll("h1");
// textSources.forEach((textSource)=>{
//     svgTextGenerator(textSource);
//     return ;
// })


// portfolio js
function initPortfolio() {
    const lightBoxDialog = document.querySelector("#lightBoxDialog");
    const lightBoxImageView = document.querySelector(".lightBoxImageView");
    const lightBoxPrevImg = document.querySelector(".lightBoxImageView .prevImg");
    const lightBoxNextImg = document.querySelector(".lightBoxImageView .nextImg");
    const lightBoxImages = document.querySelectorAll(".lightBoxImage");
    const closeModalController = document.querySelector(".closeModalController");
    const lightBoxMainImg = lightBoxImageView.querySelector("#lightBoxImage");
    // lightbox image animation handler
    function lightboxImgAnimHandler() {
        document.querySelector(".lbCoutnerVal .currImg").innerText = lightBoxIndex + 1;
        lightBoxMainImg.classList.add("fadeOut");
        setTimeout(() => {
            lightBoxMainImg.classList.remove("fadeOut");
        }, 500);
    }
    let lightBoxIndex = 0;
    // lightbox controlls
    const leftClickImgHandler = () => {
        if (lightBoxIndex <= 0) {
            return;
        } else {
            lightBoxIndex--;
            lightBoxMainImg.src = lightBoxImages[lightBoxIndex].dataset.src;
            lightboxImgAnimHandler();
        }
    }
    const rightClickImgHandler = () => {
        if (lightBoxIndex >= (lightBoxImages.length - 1)) {
            return;
        } else {
            lightBoxIndex++;
            lightBoxMainImg.src = lightBoxImages[lightBoxIndex].dataset.src;
            lightboxImgAnimHandler();
        }
    }
    //lightbox controls
    lightBoxPrevImg.addEventListener("click", () => {
        leftClickImgHandler();
    });
    lightBoxNextImg.addEventListener("click", () => {
        rightClickImgHandler();
    });

    document.addEventListener("keyup", (userEvent) => {
        if (userEvent.key === "ArrowLeft") {
            leftClickImgHandler();
        } else if (userEvent.key === "ArrowRight") {
            rightClickImgHandler();
        } else {
            return;
        }
    })


    lightBoxImages.forEach((lightBoxImage, index) => {
        lightBoxImage.style.background = `url(${lightBoxImage.dataset.src})`;
        lightBoxImage.style.backgroundSize = "cover";
        lightBoxImage.addEventListener("click", () => {
            lightBoxDialog.showModal();
            lightBoxIndex = index;
            lightBoxMainImg.src = lightBoxImage.dataset.src;
            lightboxImgAnimHandler();
            document.querySelector(".lbCoutnerVal .totaImg").innerText = lightBoxImages.length;
        })
    });
    closeModalController.addEventListener("click", () => {
        lightBoxDialog.close();
    })
}


// testimonials js
function initTestMonials() {
    const testimonialCards = document.querySelector(".testimonialCards");
    if (!testimonialCards) return;
    const totalTestimonialCards = document.querySelectorAll(".testimonialCards .testimonialCard");
    const cardsLength = (totalTestimonialCards.length - 1);
    const card = document.querySelector(".testimonialCard");
    const testimonialCardPrev = document.querySelector(".testimonialCardPrev");
    const testimonialCardNext = document.querySelector(".testimonialCardNext");
    const styles = window.getComputedStyle(document.querySelector(".testimonialCards"));
    const gap = parseFloat(styles.columnGap || styles.gap);
    const cardStageWidth = card.offsetWidth + gap;
    let translationXCoords = 0;
    let slidingIndex = 0;
    const sliderPositionHandler = (newCoords) => {
        testimonialCards.style.transform = `translateX(${newCoords}px)`;
    }

    // testCardControllers function
    const testCardControllers = document.querySelectorAll(".testCardControllers .testCardCircle");
    testCardControllers[0].classList.add("active")
    const testCardControllersUpdateHandler = () => {
        testCardControllers.forEach((testCardController) => {
            testCardController.classList.remove("active");
        })
    }
    const slideLeftHandler = () => {
        if (slidingIndex >= 1) {
            slidingIndex -= 1;
            translationXCoords = translationXCoords - cardStageWidth;
            sliderPositionHandler(-translationXCoords);
            testCardControllersUpdateHandler();
            testCardControllers[slidingIndex].classList.add("active");
        }
    }
    const slideRightHandler = () => {
        if (slidingIndex <= cardsLength - 1) {
            slidingIndex += 1;
            translationXCoords = slidingIndex * cardStageWidth;
            sliderPositionHandler(-translationXCoords);
            testCardControllersUpdateHandler();
            testCardControllers[slidingIndex].classList.add("active");
        }
    }

    testimonialCardPrev.addEventListener("click", () => {
        slideLeftHandler();
    })
    testimonialCardNext.addEventListener("click", () => {
        slideRightHandler();
    })
    sliderPositionHandler(slidingIndex);
    // testCardControllers
    testCardControllers.forEach((testCardController, index) => {
        testCardController.addEventListener("click", (element) => {
            testCardControllersUpdateHandler();
            element.target.classList.add("active");
            testimonialCards.style.transform = `translateX(${-index * cardStageWidth}px)`;
            slidingIndex = index;
        })
    })
}
// intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fadeInUp");
            observer.unobserve(entry.target);
        }
    })
}, {
    threshold: 0.2
})


// services card images load handler
function serviceCardImgHandler() {
    const serviceCards = document.querySelectorAll(".serviceCardImage");
    serviceCards.forEach((serviceCard) => {
        serviceCard.style.background = `url(${serviceCard.dataset.src})`;
        serviceCard.style.backgroundSize = "cover";
    })
}



document.addEventListener("DOMContentLoaded", () => {
    loadComponent("templateHeader", "../components/header.html");
    loadComponent("templateFooter", "../components/footer.html");
    // Observer for all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        observer.observe(section);
    });

    serviceCardImgHandler();
})


const lazyIntObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const templateId = section.dataset.template;
            const template = document.getElementById(templateId);
            if (template) {
                const content = template.content.cloneNode(true);
                section.replaceWith(content);
                requestAnimationFrame(() => {
                    initPortfolio();
                    initTestMonials();
                });
                setTimeout(() => {
                    document.querySelector(`.${section.id}`).classList.add("fadeInUp");

                }, 300)
            }
            lazyIntObserver.unobserve(entry.target);
        }
    })
}, {
    root: null,
    threshold: 0.2,
    rootMargin: "100px"
});

const lazySections = document.querySelectorAll(".lazy-section");
lazySections.forEach((lazySection) => {
    lazyIntObserver.observe(lazySection);
})


document.querySelector(".color1").addEventListener("click", ()=>{
    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles.getPropertyValue('--theme-600').trim();
    document.documentElement.style.setProperty('--theme-600', "red");
    console.log(mainColor)
})

let target = 0;
const svgNS = "http://www.w3.org/2000/svg";

function bannerElemAnimationHandler(){
    const bannerDecorElem = document.querySelector(".bannerDecorElem");
    bannerDecorElem.classList.add("smoothSwing");
}
// Portfolio section handler
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
            return ;
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
    const showProjectsBtn = document.querySelector("#showProjects");
    showProjectsBtn.addEventListener("click", ()=>{
        lightBoxDialog.showModal();
            lightBoxMainImg.src = lightBoxImages[0].dataset.src;
    })
}

// Testimonials section handler
function initTestMonials() {
    const testimonialCards = document.querySelector(".testimonialCardsStage");
    if (!testimonialCards) return;
    const totalTestimonialCards = document.querySelectorAll(".testimonialCards .testimonialCard");
    const cardsLength = (totalTestimonialCards.length - 1);
    const card = document.querySelector(".testimonialCard");

    const testimonialCardPrev = document.querySelector(".testimonialCardPrev");
    const testimonialCardNext = document.querySelector(".testimonialCardNext");
    const styles = window.getComputedStyle(document.querySelector(".testimonialCards"));
    const testimonialCardControlsMargin = ((document.querySelector("#testimonialCard1").clientHeight) / 2 ) - 24;
    testimonialCardPrev.style.marginTop = testimonialCardControlsMargin + "px";
    testimonialCardNext.style.marginTop = testimonialCardControlsMargin + "px";
    
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

// Services card images load handler
function serviceCardImgHandler() {
    const serviceCards = document.querySelectorAll(".serviceCardImage");
    serviceCards.forEach((serviceCard) => {
        serviceCard.style.background = `url(${serviceCard.dataset.src})`;
        serviceCard.style.backgroundSize = "cover";
    })
}

// Document Initial Load Handler
document.addEventListener("DOMContentLoaded", () => {
    const aboutMediaHandler = () => {
       const aboutImageWrap = document.querySelector(".aboutImageWrap");
       const availableSpace = aboutImageWrap.getBoundingClientRect().width;
       if(!aboutImageWrap)return;
       if(availableSpace > 10){
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

        let lastHexMarginLeft = parseFloat(hexagons[4].style.marginLeft);
        let lastHexMarginTop = parseFloat(hexagons[6].style.marginTop);
        const totalHexRemainInlineSpace = Math.round(availableSpace - (lastHexMarginLeft + hexUnits));
        const totalHexRemainVerticalSpace = Math.round((lastHexMarginTop + hexUnits));
        aboutImageWrap.style.height = totalHexRemainVerticalSpace + 64 + "px";
        aboutImageWrap.style.padding = (totalHexRemainInlineSpace/ 2) + "px";
        aboutImageWrap.style.paddingBlock = 32 + "px";
       aboutImageWrap.classList.remove("settingUp");
       bannerElemAnimationHandler();
       }
    
    }
    aboutMediaHandler();
    initPortfolio();
    initTestMonials();
    
    window.addEventListener("resize", ()=>{
    aboutMediaHandler();
})
    serviceCardImgHandler();
    initTestMonials();
    
})
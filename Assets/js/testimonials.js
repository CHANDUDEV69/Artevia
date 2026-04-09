document.addEventListener("DOMContentLoaded", ()=>{
    const testimonialCards = document.querySelector(".testimonialCards");
    const totalTestimonialCards = document.querySelectorAll(".testimonialCards .testimonialCard");
    const cardsLength = (totalTestimonialCards.length-1);
    const card = document.querySelector(".testimonialCard");
    const testimonialCardPrev = document.querySelector(".testimonialCardPrev");
    const testimonialCardNext = document.querySelector(".testimonialCardNext");
    const styles = window.getComputedStyle(document.querySelector(".testimonialCards"));
    const gap = parseFloat(styles.columnGap || styles.gap);
    const cardStageWidth = card.offsetWidth + gap;
    let translationXCoords = 0;
    let slidingIndex = 0;
    const sliderPositionHandler = (newCoords) =>{
        testimonialCards.style.transform = `translateX(${newCoords}px)`;
    }
    
    // testCardControllers function
    const testCardControllers = document.querySelectorAll(".testCardControllers .testCardCircle");
    testCardControllers[0].classList.add("active")
    const testCardControllersUpdateHandler = () =>{
        testCardControllers.forEach((testCardController)=>{
            testCardController.classList.remove("active");
        })
    } 
    const slideLeftHandler = () =>{
        if(slidingIndex >= 1){
            slidingIndex-=1;
            translationXCoords = translationXCoords - cardStageWidth;
            sliderPositionHandler(-translationXCoords);
            testCardControllersUpdateHandler();
            testCardControllers[slidingIndex].classList.add("active");
        }
    }
    const slideRightHandler = () =>{
        if(slidingIndex <= cardsLength-1){
            slidingIndex+=1;
            translationXCoords = slidingIndex * cardStageWidth;
            sliderPositionHandler(-translationXCoords);
            testCardControllersUpdateHandler();
            testCardControllers[slidingIndex].classList.add("active");
        }
    }

    testimonialCardPrev.addEventListener("click", ()=>{
        slideLeftHandler();
    })
    testimonialCardNext.addEventListener("click", ()=>{
        slideRightHandler();
    })
    sliderPositionHandler(slidingIndex);
    // testCardControllers
    testCardControllers.forEach((testCardController, index)=>{
        testCardController.addEventListener("click", (element)=>{
            testCardControllersUpdateHandler();
            element.target.classList.add("active");
            testimonialCards.style.transform = `translateX(${-index * cardStageWidth}px)`;
            slidingIndex = index;
        })
    })
})
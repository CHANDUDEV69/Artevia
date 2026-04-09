document.addEventListener("DOMContentLoaded", ()=>{
    // bannerInteractionHandler
    // ::background animation code start::
    const banner = document.querySelector(".banner");
    const decorLights = document.querySelectorAll(".decoLights .decoLight");
    let spinFlag = false;
    let defaultCount = 45;
    let lastScrollTop = 0;
    const translateCoords = [0, 16, 32];

    const bannerIntersection = ((entries)=>{
        // reset banner bg shapes
        const resetLightRotation = () =>{
        decorLights.forEach((decorLight, i)=>{
            decorLight.style.transform = `translate(${translateCoords[i] * -5}px, ${(i+1) * 5}px) rotate(${45}deg)`;
            
        })
        }
                if(spinFlag){
                currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                if(currentScroll > lastScrollTop){
                    defaultCount += (currentScroll / 360);
                    decorLights.forEach((decorLight, i)=>{
                        decorLight.style.transform = `translate(${translateCoords[i] * -5}px, ${i+1 * 5}px) rotate(${ defaultCount}deg)`;
                    });
                    if(currentScroll <= 20){
                        resetLightRotation();
                    }
                }
                else if(currentScroll < lastScrollTop){
                    defaultCount -= (currentScroll / 360);
                    decorLights.forEach((decorLight, i)=>{
                        decorLight.style.transform = `translate(${translateCoords[i] * -5}px, ${i+1 * 5}px) rotate(${ defaultCount}deg)`;
                    });
                    if(currentScroll <= 20){
                        resetLightRotation();
                    }
                }
                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            }
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                spinFlag = true;
            }
            else{
                spinFlag = false;
            }
        })
    })
    const observer = new IntersectionObserver(bannerIntersection, {threshold: Array.from({ length: 101 }, (_, i) => i / 100)});
    
    
    
    document.addEventListener("scroll", (e)=>{
        observer.observe(banner);
    })
    // ::background animation code end::

    // Title beutifier
    const TitleBeutifiyer = () =>{
            const bannerTitleWrapWidth = document.querySelector(".bannerTitleWrap").getBoundingClientRect().width;
            if(window.innerWidth > 1024){
                const titleBreaks =  document.querySelectorAll(".s_break");
                titleBreaks.forEach((titleBreak)=>{
                    titleBreak.innerHTML = "<br>";
                });
            }
        }
            // BannerImageLoader
            const BannerImageLoader = () => {
                const result = ["resource", "mark", "first-input", "largest-contentful-paint"]
                .every((type) => {
                // console.log(type, "is supported");
                return  PerformanceObserver.supportedEntryTypes.includes(type);
            })

            }
            // Dialog Handler
            // const dialogHandler = () =>{
            //     const primaryctaBtn = document.querySelector(".primaryctaBtn");
            //     primaryctaBtn.addEventListener("click", ()=>{
            //         getStartedDialog.showModal();
            //     })
            //     const dialogClsBtn = document.querySelector("dialog button");
            //     dialogClsBtn.addEventListener("click", ()=>{
            //         getStartedDialog.close();
            //     })
            // }
            BannerImageLoader();
            TitleBeutifiyer();
            // dialogHandler();
        })
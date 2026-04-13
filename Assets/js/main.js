
    function loadComponent(id, filePath){
        fetch(filePath).then(resp =>{
            return resp.text()}).
        then((responseHTML)=>{
            document.querySelector(`.${id}`).innerHTML = responseHTML;
            if(id==="templateHeader"){
                const header = document.querySelector(".header");
                const menuToggler = document.querySelector(".menuToggleWrap");
                // Scroll Tracker
                if(window.innerWidth >=1024){
                        document.addEventListener("scroll", ()=>{
                     if(pageYOffset >= 600){
                          header.classList.add("invisible");
                          menuToggler.classList.add("visible");
                     }
                     else{
                          header.classList.remove("invisible");
                          menuToggler.classList.remove("visible");
                     }
                });
                menuToggler.addEventListener("click", ()=>{
                     menuToggler.classList.toggle("active");
                     header.classList.toggle("active");
                })
            
                }
                else{
                          header.classList.add("mobileMenu");
                               //     if(pageYOffset >= 600){}
                }

     
                // Responsive navigation menu  
                const navGroup = document.querySelector(".navGroup");
                // :: Small Screens::
                if(window.innerWidth <= 1024){
                const hamburger = document.querySelector(".hamburger");
                const headerHeight = header.clientHeight;
                // navGroup handler
                const navGroupToggleHandler = () =>{
                     if(navGroup.classList.contains("active")){
                          navGroup.style.marginTop = (headerHeight + 2) + "px";
                          hamburger.setAttribute("aria-expanded", true);
                     }
                     else{
                          navGroup.style.marginTop = -120 + "%";
                          hamburger.removeAttribute("aria-expanded", false);
                     }
                }
                document.addEventListener("click", (e)=>{
                     if(!navGroup.contains(e.target) && !hamburger.contains(e.target)){
                          navGroup.classList.remove("active");
                          hamburger.classList.remove("active");
                          navGroupToggleHandler();
                     }
                })
                hamburger.addEventListener("click", ()=>{
                     navGroup.classList.toggle("active");
                     hamburger.classList.toggle("active");
                     navGroupToggleHandler();
                });
                }
                else{
                     // ::Large Screens::
                     const hoverfloatRect = document.querySelector(".hoverfloat");
                     const navLinks = document.querySelector(".navLinks");
                     const allNavLinks = document.querySelectorAll(".navLinks li a");
                     navLinks.addEventListener("mouseover", (e)=>{
                          const rect = navLinks.getBoundingClientRect();
                          const hoverRectPos = rect.left;
                               const navigationLinks = document.querySelectorAll(".navLinks li a");
                               navigationLinks.forEach((navigationLink)=>{
                                    navigationLink.addEventListener("mouseover", (e)=>{
                                         const hoverfloatRectLeft =  (navigationLink.getBoundingClientRect().left) - hoverRectPos;
                                        hoverfloatRect.style.width = (e.currentTarget.clientWidth) - 12 + "px";
                                         hoverfloatRect.style.marginLeft =  ((hoverfloatRectLeft) + 6)   + "px";
                                         hoverfloatRect.style.opacity =  1;
                                    })
                               })
                     });
                     allNavLinks.forEach((navLink)=>{
                          navLink.addEventListener("click", (e)=>{
                               allNavLinks.forEach((navlink)=>navlink.classList.remove("active"));
                               e.target.classList.toggle("active");
                          })
                     })
                }
                       }
                   });
                }
                // portfolio js
                function initPortfolio(){
                    const lightBoxDialog = document.querySelector("#lightBoxDialog");
                    const lightBoxImageView = document.querySelector(".lightBoxImageView");
                    const lightBoxPrevImg = document.querySelector(".lightBoxImageView .prevImg");
                    const lightBoxNextImg = document.querySelector(".lightBoxImageView .nextImg");
                    const lightBoxImages = document.querySelectorAll(".lightBoxImage");
                    const closeModalController = document.querySelector(".closeModalController");
                    const lightBoxMainImg = lightBoxImageView.querySelector("#lightBoxImage");
                    // lightbox image animation handler
                    function lightboxImgAnimHandler(){
                        document.querySelector(".lbCoutnerVal .currImg").innerText = lightBoxIndex + 1;
                        lightBoxMainImg.classList.add("fadeOut");
                        setTimeout(() => {
                        lightBoxMainImg.classList.remove("fadeOut");
                        }, 500);
                    }
                    let lightBoxIndex = 0;
                    // lightbox controlls
                    const leftClickImgHandler = () => {
                        if(lightBoxIndex <= 0){
                            return ;
                        }
                        else{
                          lightBoxIndex --;
                          lightBoxMainImg.src = lightBoxImages[lightBoxIndex].dataset.src;
                          lightboxImgAnimHandler();
                        }
                        }
                        const rightClickImgHandler = () => {
                            if(lightBoxIndex >= (lightBoxImages.length-1)){
                                return ;
                              }
                              else{
                                  lightBoxIndex ++;
                                  lightBoxMainImg.src = lightBoxImages[lightBoxIndex].dataset.src;
                                  lightboxImgAnimHandler();
                            }
                        }
                        //lightbox controls
                        lightBoxPrevImg.addEventListener("click", ()=>{
                            leftClickImgHandler();
                        });
                        lightBoxNextImg.addEventListener("click", ()=>{
                            rightClickImgHandler();
                        });
                    
                        document.addEventListener("keyup", (userEvent)=>{
                          if(userEvent.key === "ArrowLeft"){
                            leftClickImgHandler();
                          }
                          else if(userEvent.key === "ArrowRight"){
                            rightClickImgHandler();
                          }
                          else{
                              return ;
                          }
                        })
                        

                        lightBoxImages.forEach((lightBoxImage, index)=>{
                                  lightBoxImage.style.background = `url(${lightBoxImage.dataset.src})`;
                                  lightBoxImage.style.backgroundSize = "cover";
                                  lightBoxImage.addEventListener("click", ()=>{
                                      lightBoxDialog.showModal();
                                      lightBoxIndex = index;
                                      lightBoxMainImg.src = lightBoxImage.dataset.src;
                                      lightboxImgAnimHandler();
                                      document.querySelector(".lbCoutnerVal .totaImg").innerText  = lightBoxImages.length;
                                  })
                              });
                        closeModalController.addEventListener("click", ()=>{
                            lightBoxDialog.close();
                        })
                }


                // testimonials js
                function initTestMonials(){
                    const testimonialCards = document.querySelector(".testimonialCards");
                    if (!testimonialCards) return;
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
                }
                // intersection observer
                const observer = new IntersectionObserver((entries)=>{
                    entries.forEach((entry)=>{
                        if(entry.isIntersecting){
                            entry.target.classList.add("fadeInUp");
                            observer.unobserve(entry.target);
                        }
                    })
                },{threshold: 0.2})
                

                // services card images load handler
                function serviceCardImgHandler(){
                    const serviceCards = document.querySelectorAll(".serviceCardImage");
                        serviceCards.forEach((serviceCard)=>{
                            serviceCard.style.background = `url(${serviceCard.dataset.src})`;
                            serviceCard.style.backgroundSize = "cover";
                        })
                }



                document.addEventListener("DOMContentLoaded", ()=>{
                    loadComponent("templateHeader", "../components/header.html");
                    loadComponent("templateFooter", "../components/footer.html");


                    const sections = document.querySelectorAll("section");
                    sections.forEach((section)=>{
                        observer.observe(section);
                    });

                    serviceCardImgHandler();
                })


                // lazy sections intersection observer
                const lazyIntObserver = new IntersectionObserver((entries)=>{
                    entries.forEach((entry)=>{
                        if(entry.isIntersecting){
                            const section = entry.target;
                            const templateId = section.dataset.template;
                            const template = document.getElementById(templateId);
                            if(template){
                                const content = template.content.cloneNode(true);
                                section.replaceWith(content);
                                requestAnimationFrame(() => {
                                    initPortfolio();
                                    initTestMonials();
                                });
                                setTimeout(()=>{
                                    document.querySelector(`.${section.id}`).classList.add("fadeInUp");

                                }, 300)
                            }
                            lazyIntObserver.unobserve(entry.target);
                        }
                    })
                },{root: null, threshold: 0.2, rootMargin: "100px"});

                const lazySections = document.querySelectorAll(".lazy-section");
                lazySections.forEach((lazySection)=>{
                    lazyIntObserver.observe(lazySection);
                })

document.addEventListener("DOMContentLoaded", ()=>{
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
     
     })

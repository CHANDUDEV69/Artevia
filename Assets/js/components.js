// Header and Footer load Handler
function loadComponent(id, filePath) {
    fetch(filePath).then(resp => {
        return resp.text()
    }).
    then((responseHTML) => {
        document.querySelector(`.${id}`).innerHTML = responseHTML;
        if (id === "templateHeader") {
            const header = document.querySelector(".header");
            // Scroll Tracker
            if (window.innerWidth >= 1023) {
                document.addEventListener("scroll", () => {
                    if (pageYOffset >= 600) {
                        header.classList.add("fixed");
                    } else {
                        header.classList.remove("fixed");
                    }
                });


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

        const arteviaFooter = document.querySelector(".arteviaFooter");
        const observerFt = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    observerFt.unobserve(arteviaFooter);
                    const footerSocialLinks = document.querySelectorAll(".footerSocialLinks .socialIcon");
                    footerSocialLinks.forEach((footerSocialLink, index) => {
                        footerSocialLink.innerHTML = socialIcons[index];
                    })

                    function footercontactIconsHandler() {
                        const socialIconsContent = [
                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708"/>
                            </svg>`,
                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-arrow-up-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016"/>
                            </svg>`,
                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>`
                        ];

                        const fccIcons = document.querySelectorAll(".fccIcon");
                        fccIcons.forEach((fccIcon, index) => {
                            fccIcon.innerHTML = socialIconsContent[index];
                        });
                        const newsLetterIcon = `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                            </svg>`;
                        const newsLetterBoxIcon = arteviaFooter.querySelector("#newsLetterIconBtn");
                        newsLetterBoxIcon.insertAdjacentHTML('beforeend', newsLetterIcon)
                    }
                    footercontactIconsHandler();


                }
            });
        });

        if (arteviaFooter) {
            observerFt.observe(arteviaFooter);
        }
    });

}

// Main Image Load Handler
document.addEventListener("DOMContentLoaded", () => {
    const docImages = document.querySelectorAll("img");
    docImages.forEach((docImage) => {
        if (docImage.fetchPriority === "high") {
            const preloader = document.querySelector("preloader");
            if (docImage.complete) {
                loadingCache += 80;
                updateUI(loadingCache);
            }
            document.fonts.ready.then(() => {
                loadingCache += 20;
                updateUI(loadingCache);
            });
        }
    })
});

// intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fadeInUp");
            observer.unobserve(entry.target);
        }
    })
}, {
    threshold: 0.1
})


// Header Footer Component Load Handler
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("templateHeader", "../components/header.html");
    loadComponent("templateFooter", "../components/footer.html");
    // Observer for all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        observer.observe(section);
    });

    function serviceCardImgHandler() {
        const serviceCards = document.querySelectorAll(".serviceCardImage");
        serviceCards.forEach((serviceCard) => {
            serviceCard.style.background = `url(${serviceCard.dataset.src})`;
            serviceCard.style.backgroundSize = "cover";
        })
    }
    serviceCardImgHandler();


    const teamSection = document.querySelector(".team");
    if (teamSection) {
        const descSocialIcons = teamSection.querySelectorAll(".active .descSocialIcon");
        descSocialIcons.forEach((descSocialIcon, index) => {
            descSocialIcon.innerHTML = socialIcons[index];
        })
        
        const designersList = teamSection.querySelectorAll(".designersList li a");
        designersList.forEach((designersListItem, index) => {
            designersListItem.addEventListener("click", (elem) => {
                elem.preventDefault();
                designersList.forEach((designersListItem) => {
                    designersListItem.classList.remove("active");
                })
                elem.target.classList.add("active");
                const designersInfoCards = teamSection.querySelectorAll(".designersInfoCard");
                designersInfoCards.forEach((designersInfoCard) => {
                    designersInfoCard.classList.remove("active")
                });
                designersInfoCards[index].classList.add("active");
                const descSocialIcons = teamSection.querySelectorAll(".active .descSocialIcon");
                descSocialIcons.forEach((descSocialIcon, index) => {
                    descSocialIcon.innerHTML = socialIcons[index];
                })
        
            })
        })
        try {
            const observerTeam = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const activeDescImages = teamSection.querySelectorAll(".descImage");
                        activeDescImages.forEach(((activeDescImage) => {
                            activeDescImage.classList.add("fetching");
                        }))

                        activeDescImages.forEach((activeDescImage, i) => {
                            const descImage = new Image();
                            descImage.setAttribute("width", "100%");
                            const imageResult = fetch(`./assets/images/team/team${i+1}.webp`);
                            imageResult.then((result) => {
                                if(result.status == 200){
                                    activeDescImage.classList.remove("fetching");
                                    descImage.setAttribute("src", result.url);
                                }
                            })
                            activeDescImage.appendChild(descImage);
                        })



                    }
                })
            })
            observerTeam.observe(teamSection);
        } catch (error) {
            console.log("error")
        }
    }
})
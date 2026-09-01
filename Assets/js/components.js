// Main Image Load Handler

let interval = null;
let loadingPercentage = 0;
let loadingCache = 0;

const socialIcons = [`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
        </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
        </svg>`
];

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

                function hidePreloader() {
                    if (heroMetrics) {
                        setTimeout(() => {
                            document.querySelector(".preloader").style.display = "none";

                            const heroMetricCountersObserver = new IntersectionObserver((entries) => {
                                entries.forEach((entry) => {
                                    if (entry.isIntersecting) {
                                        metricCounterAnimationHandler();
                                        heroMetricCountersObserver.unobserve(heroMetrics);
                                    }
                                })
                            }, {
                                threshold: 0.5
                            })
                            heroMetricCountersObserver.observe(heroMetrics);
                        }, 1000);
                    }


                }
                setTimeout(() => {
                    hidePreloader();
                    document.querySelector(".preloader").classList.remove("active");
                    const bannerContentWrap = document.querySelector('.bannerContentWrap');
                    if (bannerContentWrap) {
                        document.querySelector(".bannerTitleWrap h1").classList.add("fadeInRight");
                        document.querySelector(".bannerContent").classList.add("br_fadeInUp");
                        // clean navigation scrollintoview handler
                        const contactNav = document.querySelector(".navLink5");
                        contactNav.addEventListener("click", (e) => {
                            e.preventDefault();
                            requestAnimationFrame(() => {
                                document.querySelector("#contact").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                })
                            })
                        })

                    }

                }, 1000);

            }
        }, 50);
    }
}
const heroMetricCounters = document.querySelectorAll(".heroMetrics .metricCounter");
const heroMetrics = document.querySelector(".heroMetrics");

function metricCounterAnimationHandler() {
    const metricCounterVals = document.querySelectorAll(".metricCounter .counterVal");
    metricCounterVals.forEach((entry) => {
        entry.classList.add("bounceUp")
        let counterVal = 0;
        const stopTarget = entry.dataset.count;
        const interval = setInterval(() => {
            if (counterVal >= stopTarget) {
                clearInterval(interval)
            } else {
                counterVal++;
                entry.innerHTML = counterVal;
            }
        }, Math.random() * 30)

    })
}
// fallback
setTimeout(() => {
    loadingPercentage = 100;
    document.querySelector(".plCounterVal").innerHTML = "100";
    document.querySelector(".preloader").classList.remove("active");
    document.querySelector(".preloader").style.display = "none";

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}, 5000);

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
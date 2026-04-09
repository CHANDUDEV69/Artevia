const services = document.querySelector(".services");
// const observer = new IntersectionObserver((entries)=>{
    // entries.forEach((entry)=>{
        // if(entry.isIntersecting){
            const serviceCards = document.querySelectorAll(".serviceCardImage");
            serviceCards.forEach((serviceCard)=>{
                serviceCard.style.background = `url(${serviceCard.dataset.src})`;
                serviceCard.style.backgroundSize = "cover";
            });
        // }
    // })
    // observer.unobserve(services);
// })

// observer.observe(services);
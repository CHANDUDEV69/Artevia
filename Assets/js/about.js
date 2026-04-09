document.addEventListener("DOMContentLoaded", () => {
    const aboutMediaHandler = () => {
        const aboutImageWrap = document.querySelector(".aboutImageWrap");
        const availableSpace = aboutImageWrap.getBoundingClientRect().width;
        const fluidContentLength = document.querySelector(".aboutFluidContent").innerText.length;
        aboutImageWrap.style.height = availableSpace / 1 + "px";
        const hexUnits = (availableSpace / 5.2);
        let hexTopMargin = (availableSpace / 10);
        let marginTopPatternArray = [2, 1, 0, 1, 2, 3, 4, 3, 2];
        let marginLeftPatternArray = [0, 1, 2, 3, 4, 3, 2, 1, 2];

        const hexagons = document.querySelectorAll(".aboutImageWrap .hexagon");
        hexagons.forEach((hexagon, i) => {
            hexagon.style.width = hexUnits + "px";
            hexagon.style.height = hexUnits + "px";
            hexagon.style.marginTop = (marginTopPatternArray[i] * hexTopMargin) + "px";
            hexagon.style.marginLeft = (marginLeftPatternArray[i] * hexUnits) + "px";
        })
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

    const aboutSection = document.querySelector(".about");
    // const abtObserver = new IntersectionObserver((entries)=>{
    // entries.forEach((entry)=>{
    // if(entry.isIntersecting){
    aboutMediaHandler();
    // }
    // })
    // abtObserver.unobserve(aboutSection);
    // }, {threshold: 0.2}); 
    // abtObserver.observe(aboutSection);

    const aboutCounters = document.querySelectorAll(".aboutCounter");
    aboutCounters.forEach((aboutCounter) => {
        aboutCounter.addEventListener("mouseover", (e) => {
            aboutCounters.forEach((aboutCounter) => {
                aboutCounter.classList.remove("active")
            })
            e.target.classList.add("active");
        })
    })
});
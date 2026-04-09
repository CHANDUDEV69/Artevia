     const loadingContentInfoArray = [
        "Fetching Images Up..",
        "Getting fonts..",
        "Getting CSS files ready.."
     ];
     document.addEventListener("DOMContentLoaded", ()=>{
          const bannerImage = document.querySelector(".banner picture img");
          document.querySelector(".preloader").classList.remove("active")
     });
     const loadingInfo = document.querySelector(".loadingContentInfo");
     const listUpdateHandler = () =>{
          loadingInfo.innerHTML = "";
          loadingContentInfoArray.forEach((listItemText)=>{
          const listItem = document.createElement("li");
          listItem.innerText = listItemText;
          loadingInfo.appendChild(listItem)
     });
     }
     const listAnimHandler = () =>{
          let tempEle = loadingContentInfoArray[0];
               loadingContentInfoArray.push(tempEle);
                    loadingContentInfoArray.shift();
                    listUpdateHandler();

     }
     setInterval(listAnimHandler, 2000);
     listUpdateHandler();
          
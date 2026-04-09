document.addEventListener("DOMContentLoaded", ()=>{
    const lightBoxDialog = document.querySelector("#lightBoxDialog");
    const lightBoxImageView = document.querySelector(".lightBoxImageView");
    const lightBoxPrevImg = document.querySelector(".lightBoxImageView .prevImg");
    const lightBoxNextImg = document.querySelector(".lightBoxImageView .nextImg");
    const lightBoxImages = document.querySelectorAll(".lightBoxImage");
    const closeModalController = document.querySelector(".closeModalController");
    
    let lightBoxIndex = 0;
    // lightbox controlls
    const leftClickImgHandler = () => {
              if(lightBoxIndex <= 0){
                  return ;
              }
              else{
                lightBoxIndex --;
                lightBoxImageView.querySelector("#lightBoxImage").src = lightBoxImages[lightBoxIndex].dataset.src;
              }
          }
          const rightClickImgHandler = () => {
              if(lightBoxIndex >= (lightBoxImages.length-1)){
                  return ;
                }
                else{
                    lightBoxIndex ++;
                    lightBoxImageView.querySelector("#lightBoxImage").src = lightBoxImages[lightBoxIndex].dataset.src;
              }
          }
        //   lightbox controls
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
                        lightBoxImageView.querySelector("#lightBoxImage").src = lightBoxImage.dataset.src;
                    })
                });
        closeModalController.addEventListener("click", ()=>{
            lightBoxDialog.close();
        })
        })
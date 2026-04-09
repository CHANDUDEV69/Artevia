document.addEventListener("DOMContentLoaded", ()=>{
    const formFields = document.querySelectorAll(".contactUs input");
    const textarea = document.querySelector(".contactUs textarea");
    formFields.forEach((formField)=>{
        formField.addEventListener("click", ()=>{
            formField.previousElementSibling.classList.add("active")
            if(document.querySelectorAll(".contactUs .active")){
                // formField.previousElementSibling.classList.add("active")
            }
            else{
                formField.previousElementSibling.classList.add("active");
            }
        })
        formField.addEventListener("blur", ()=>{
            if(formField.value.length > 0){
                formField.previousElementSibling.classList.add("active")
            }
            else{
                formField.previousElementSibling.classList.remove("active")
            }
        })
    })
    textarea.addEventListener("click", ()=>{textarea.classList.add("active")})
    textarea.addEventListener("blur", ()=>{textarea.classList.remove("active")})
})
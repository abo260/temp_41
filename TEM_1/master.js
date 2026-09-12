//Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    //Set Color On Root
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));
    //Remove Active Class From All Childrens
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        });

    //Add Active Class On Element With Data-Color === Local Storage Item
    document.querySelector(".colors-list li[data-color='" + mainColors + "']").classList.add("active");
}

//Random Background Option
let backgroundOption = true;

//Variable To Control The Background Interval
let backgroundInterval;

//Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null){
    
if (backgroundLocalItem === 'true') {
    backgroundOption = true;
}
else {
    backgroundOption = false;
}
//Remove Active Class From All spans
document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active");
} );
if (backgroundLocalItem === 'true') {
    document.querySelector(".random-background .yes").classList.add("active");
}
else {
    document.querySelector(".random-background .no").classList.add("active");
}
}
//Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    //Toggle Class Fa-Spin For Rotation On Self
    this.classList.toggle("fa-spin");
    //Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
//Loop On All List Items
colorsLi.forEach(li => {
    //Click On Every List Items
    li.addEventListener("click", (e) => {
        //Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        handleActive(e);
    });
});
//Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background .yes, .random-background .no");
//Loop On All spans
randomBackEl.forEach(span => {
    //Click On Every spans
    span.addEventListener("click", (e) => {
        handleActive(e);
        //Add Active Class On Self        
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
        e.target.classList.add("active");
    });
});
//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
//Get Array Of Imgs
let imgsArray = ["01.jpg", "02.webp", "03.jpg", "04.jpg", "05.avif"];


//Function To Randomize Imgs
function randomizeImgs() {

    clearInterval(backgroundInterval);

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            //Change Background Image Url
            landingPage.style.backgroundImage =
            'url("imgs/' + imgsArray[randomNumber] + '")';

        }, 10000);

    }

}

randomizeImgs();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;  
    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //Window Height
    let windowHeight = this.innerHeight;
    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}


//Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        //Create Overlay Element   
        let overlay = document.createElement("div");
        //Add Class To Overlay
        overlay.className = "popup-overlay";
        //Append Overlay To The Body
        document.body.appendChild(overlay);
        //Create The Popup Box
        let popupBox = document.createElement("div");

                if (img.alt !== null) {
            //Create Heading
            let imgHeading = document.createElement("h3");
            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            //Append The Text To The Heading
            imgHeading.appendChild(imgText);
            //Add The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }
        //Create The Image
        let popupImage = document.createElement("img");
        //Set Image Source
        popupImage.src = img.src; 
        //Add Image To Popup Box
        popupBox.appendChild(popupImage);
        //Add Class To Popup Box
        popupBox.className = "popup-box";
        //Add The Popup Box To Body
        document.body.appendChild(popupBox);
        //Create The Close Span
        let closeButton = document.createElement("span");
        //Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);
        //Add Class To Close Button
        closeButton.className = "close-button";
        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);


    });
});

//Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") { 
        //Remove The Current Popup
        e.target.parentNode.remove();
        //Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});
//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//Select All Links
const allLinks = document.querySelectorAll(".links a");
function scollToSomewhere(elements) {
    elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
}
scollToSomewhere(allBullets);
scollToSomewhere(allLinks);
//Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_option");
if (bulletsLocalItem !== null) {;
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletsLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
} 

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {  
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "show");
        }
        else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "hide");
        }

        handleActive(e);
    });
});
//Reset Button
document.querySelector(".reset-options").onclick = function () {
    //Clear Local Storage
    localStorage.clear();
    //Reload Window
    window.location.reload();
}
//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    //Stop Propagation
    e.stopPropagation();
    //Toggle Class "menu-active" For Button
    this.classList.toggle("menu-active");
    //Toggle Class "open" For Links
    tLinks.classList.toggle("open");
};
//Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        //Check If Menu Is Open
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});
//Stop Propagation On Menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}
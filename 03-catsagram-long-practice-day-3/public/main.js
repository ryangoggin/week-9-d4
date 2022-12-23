// import { resetScore } from './score.js'; //no longer needed due to localStorage
// import { resetComments } from './comments.js';

export const createMainContent = () => {
    // Create h1
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";
    img.style.padding = "10px";
    img.style.border = "groove 15px gray";

    const newKittenBtn = createNewKittenBtn();

    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.append(newKittenBtn);
    container.appendChild(img);
};

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        localStorage.setItem("imgURL", kittenData[0].url);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;

        localStorage.setItem("score", 0);
        const kittenScore = document.querySelector(".score");
        kittenScore.innerText = 0;

        localStorage.setItem("comments", JSON.stringify([]));
        const kittenComments = document.querySelector('.comments')
        kittenComments.innerHTML = '';

        // // After the image is finished loading, reset the score and comments
        // kittenImg.addEventListener('load', () => {
        //     // resetScore(); //no longer needed due to localStorage
        //     resetComments();
        // });
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};

const createNewKittenBtn = () => {
    // Create "New Kitten" button
    const newKittenBtn = document.createElement("button");
    newKittenBtn.id = "new-kitten";
    newKittenBtn.innerText = "New Kitten";
    newKittenBtn.addEventListener('click', fetchImage);
    return newKittenBtn;
};

import { createMainContent } from './main.js';
import { createScoreContainer } from './score.js';
import { createCommentSection } from './comments.js';

const initializePage = () => {
    // Create container
    const container = document.createElement("section");
    container.className = "container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.marginTop = "20px";
    document.body.appendChild(container);

    createMainContent();
    createScoreContainer();
    createCommentSection();

    //only use fetchImage if imgURL not already in localStorage
    if (localStorage.imgURL) {
        const kittenImg = document.querySelector('img');
        kittenImg.src = localStorage.imgURL;

        const kittenScore = document.querySelector(".score");
        kittenScore.innerText = localStorage.score;
    } else {
        fetchImage();
    }
};

window.onload = () => {
    initializePage();
};

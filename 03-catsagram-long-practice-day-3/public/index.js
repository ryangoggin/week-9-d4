import { createMainContent } from './main.js';
import { createScoreContainer } from './score.js';
import { createCommentSection } from './comments.js';
import { renderComments } from './comments.js';

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
        //localStorage.imgURL maintains the current picture's imgURL
        const kittenImg = document.querySelector('img');
        kittenImg.src = localStorage.imgURL;
        //localStorage.score maintains the current picture's score
        const kittenScore = document.querySelector(".score");
        kittenScore.innerText = localStorage.score;
        //localStorage.comments maintains the current picture's comments
        const kittenComments = JSON.parse(localStorage.comments);
        renderComments(kittenComments);
    } else {
        fetchImage();
    }
};

window.onload = () => {
    initializePage();
};

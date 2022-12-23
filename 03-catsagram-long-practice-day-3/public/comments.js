export const createCommentSection = () => {
    const container = document.querySelector(".container");

    const commentForm = createCommentForm();
    const commentsList = createCommentsList();

    container.appendChild(commentForm);
    container.appendChild(commentsList);
};

const createCommentsList = () => {
    // Create comments section
    const comments = document.createElement("div");
    comments.className = "comments";
    comments.style.border = "solid grey 1px";
    comments.style.height = "400px";
    comments.style.width = "80%";
    comments.style.margin = "10px";
    comments.style.padding = "5px";
    comments.style.overflow = "scroll";

    return comments;
};

const createCommentForm = () => {
    // Create form
    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.style.margin = "20px";
    commentForm.style.display = "flex";
    commentForm.style.width = "100%";
    commentForm.style.justifyContent = "center";
    commentForm.style.alignItems = "center";

    commentForm.appendChild(createCommentInput());
    commentForm.appendChild(createCommentSubmitBtn());

    return commentForm;
};

const createCommentInput = () => {
    // Create comment input
    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container";
    userCommentContainer.style.marginRight = "10px";

    const label = document.createElement("label");
    label.setAttribute("for", "user-comment");
    label.innerText = "Comment: ";

    const commentInput = document.createElement("input");
    commentInput.id = "user-comment";
    commentInput.name = "user-comment";
    commentInput.placeholder = "Add a comment... ";
    commentInput.required = true;

    userCommentContainer.appendChild(label);
    userCommentContainer.appendChild(commentInput);

    return userCommentContainer;
};

const createCommentSubmitBtn = () => {
    // Create submit button
    const submitBtn = document.createElement("input");
    submitBtn.id = "submit-comment"
    submitBtn.type = "submit";
    submitBtn.value = "Submit";

    submitBtn.addEventListener('click', submitComment);

    return submitBtn;
};

const submitComment = e => {
    e.preventDefault();
    //get comment form's data
    const commentForm = document.querySelector('.comment-form');
    const formData = new FormData(commentForm);

    const commentText = formData.get("user-comment");
    commentForm.reset(); //reset so it gets each new comment submitted

    //parse when pulling from localStorage, stringify to send back to localStorage
    const storedComments = JSON.parse(localStorage.comments);
    storedComments.push(commentText);
    localStorage.comments = JSON.stringify(storedComments);

    //create comment with the commentText and give it the corresponding id to track for deleting later
    const comment = createComment(commentText, storedComments.length - 1);

    const comments = document.querySelector(".comments");
    comments.appendChild(comment);
}

export const createComment = (commentText, commentId) => {
    //make container for new comments
    const newCommentContainer = document.createElement('div');
    newCommentContainer.style.display = "flex";
    newCommentContainer.style.margin = "10px";

    //make new comment
    const newComment = document.createElement("p");
    newComment.innerText = commentText;
    newComment.style.width = "fit-content";
    newComment.style.padding = "10px 15px";
    newComment.style.marginBottom = "5px";
    newComment.style.border = "solid 1px black";
    newComment.style.borderRadius = "5px";
    newComment.style.backgroundColor = "#006AFF";
    newComment.style.color = "white";

    //make delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.style.marginLeft = "15px";
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('id', commentId);
    deleteButton.addEventListener("click", event => {deleteComment(event)});

    newCommentContainer.appendChild(newComment);
    newCommentContainer.appendChild(deleteButton);
    return newCommentContainer;
};

export const renderComments = (comments) => {
    //needed for
    const commentsContainer = document.querySelector(".comments");
    commentsContainer.innerHTML = "";
    comments.forEach((comment, i) => {
        commentsContainer.appendChild(createComment(comment, i));
    });
}

const deleteComment = event => {
    const storedComments = JSON.parse(localStorage.comments);
    storedComments.splice(parseInt(event.target.id), 1);
    localStorage.comments = JSON.stringify(storedComments);

    renderComments(storedComments);
}

// no longer need after using localStorage
// export const resetComments = () => {
//     const comments = document.querySelector(".comments");
//     Array.from(comments.children).forEach(child => child.remove());
// };

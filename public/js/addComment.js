const newCommentFormHandler = async (event) => {
  event.preventDefault();
  const postID = window.location.pathname.split("/").pop();
  const content = document.querySelector("#new-comment").value.trim();

  if (content) {
    // ${postID} if from the const delcared at the top of this function
    const response = await fetch(`/api/comments/${postID}`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', newCommentFormHandler);

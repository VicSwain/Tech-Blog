const newPostFormHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector("#content").value.trim();
    const title = document.querySelector("#title").value.trim();
    if (title && content) {
      // ${postID} if from the const delcared at the top of this function
      const response = await fetch('/api/posts/', {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.post-form').addEventListener('submit', newPostFormHandler);
  
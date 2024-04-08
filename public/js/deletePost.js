const deletePostFormHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    const postId = document.getElementById("post-id").value.trim(); // Renamed id to postId to avoid variable name conflict
  
    try {
      if (postId) {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          body: JSON.stringify({ id: postId }), // Renamed id to postId
          headers: { "Content-Type": "application/json" },
        });
    
        document.location.replace("/profile");
      }
    } catch (error) {
      console.log(error);
      // Since 'response' is not defined in the catch block, you can't access 'response.statusText'.
      // You may want to use a generic error message instead.
      alert("An error occurred while updating the post.");
    }
  };
  document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePostFormHandler);
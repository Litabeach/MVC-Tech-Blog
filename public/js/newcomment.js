
  document
    .querySelector('#submitButton')
    .addEventListener('click', function(event){
      event.preventDefault();
    
      const text = document.querySelector('#comment-desc').value.trim();
      const blog_id = document.querySelector('#comment-desc').getAttribute("data-id");
    
      if (text) {
        const response = fetch(`/api/blogs/comment`, {
          method: 'POST',
          body: JSON.stringify({ text: text, blog_id: blog_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
    
        if (response) {
          document.location.replace('/');
        } else {
          alert('Failed to create a new comment');
        }
      }
    });

    //remove hide from comments form when they click the "add comment" button
    document
    .querySelector('#add-comment')
    .addEventListener('click', function(event){
      event.preventDefault();
      function removeHide() {
        var element = document.getElementById("comment-form");
        element.classList.remove("hide");
      }
      removeHide();
    });
    
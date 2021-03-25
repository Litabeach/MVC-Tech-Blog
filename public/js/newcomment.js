
  document
    .querySelector('#submitButton')
    .addEventListener('click', function(event){
      event.preventDefault();
    
      const text = document.querySelector('#comment-desc').value.trim();
      
    
      if (text) {
        const response = fetch(`/api/blogs`, {
          method: 'POST',
          body: JSON.stringify({ text }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
    
        if (response.ok) {
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
    
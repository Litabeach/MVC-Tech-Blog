
  document
    .querySelector('#newButton')
    .addEventListener('click', function(event){
      event.preventDefault();
    
      const comment = document.querySelector('#post-desc').value.trim();
      
    
      if (comment) {
        const response = fetch(`/`, {
          method: 'POST',
          body: JSON.stringify({ comment }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to create a new comment');
        }
      }
    });
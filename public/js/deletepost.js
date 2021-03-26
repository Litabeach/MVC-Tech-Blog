  document
    .querySelector('#delete')
    .addEventListener('click', function (event) {
      const string_id = event.target.getAttribute('data-id');
      const id = parseInt(string_id)
  
      const response = fetch(`api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Failed to delete post');
      } else {
        document.location.replace('/');
        location.reload();
       
      }
    
  });
  
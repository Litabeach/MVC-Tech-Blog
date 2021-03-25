document
  .querySelector('#updatePost')
  .addEventListener('click', function (event) {
    event.preventDefault();

  
    const string_id = event.target.getAttribute('data-id');
    const id = parseInt(string_id)

    const title = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();


    if (title && description) {
      const response = fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // document.location.replace('/dashboard');
      } else {
        document.location.replace('/dashboard');
      }
    }
  }
  );
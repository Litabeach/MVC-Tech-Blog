const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newblogTitle').value.trim();

    const description = document.querySelector('#blogBody').value.trim();

    const user_id = "user"
  
    if (title && description) {
      const response = await fetch('/dash/newblog', {
        method: 'POST',
        body: JSON.stringify({ 
            title, description, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.blog-form').addEventListener('submit', blogFormHandler);
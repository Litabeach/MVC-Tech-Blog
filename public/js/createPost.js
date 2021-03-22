
const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-name').value.trim();

    const description = document.querySelector('#post-desc').value.trim();

    const user_id = "user"
  
    if (title && description) {
      const response = await fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({ 
            title, description, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.blog-form').addEventListener('submit', blogFormHandler);
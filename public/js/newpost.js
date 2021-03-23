const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create a new post');
    }
  }
};

document
  .querySelector('.new-post')
  .addEventListener('submit', newFormHandler);

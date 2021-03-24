const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  console.log("created new post", title, description)

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
console.log("loaded newpost.js")
document
  .querySelector('.submitPost')
  .addEventListener('click', newFormHandler);

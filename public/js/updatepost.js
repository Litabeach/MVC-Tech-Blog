// const updateFormHandler = async (event) => {
//     event.preventDefault();

//     if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     console.log("testing inside UpdateFormHandler")


//     const title = document.querySelector('#post-name').value.trim();
//     const description = document.querySelector('#post-desc').value.trim();


//     if (title && description) {
//       const response = await fetch(`/api/blogs/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ title, description }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('Failed to update post');
//       }
//     }
//   }
//   };
console.log("loaded updatePost.js")
// document
//   .querySelector('#updatePost')
//   .addEventListener('click', updateFormHandler);

document
  .querySelector('#updatePost')
  .addEventListener('click', function (event) {
    event.preventDefault();

    // if (event.target.hasAttribute('data-id')) {
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
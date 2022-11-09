const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#create-title').value.trim();
    const text = document.querySelector('#create-text').value.trim();
  
    if (title && text) {
      const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

document
  .querySelector('#create-post')
  .addEventListener('submit', newPostHandler);
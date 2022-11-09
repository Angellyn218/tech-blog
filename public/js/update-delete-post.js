const updatePostHandler = async (event) => {
    event.preventDefault();

    
    const id = event.target.getAttribute('data-id');
  
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
  
    if (id && title && text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update project');
        }
    }
};
  
const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};
  
document
    .querySelector('#update-post')
    .addEventListener('click', updatePostHandler);
  
document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);
  
const newFormHandler = () => {
    document.location.replace('/posts/new')
};
  
document
    .querySelector('#create-btn')
    .addEventListener('click', newFormHandler);
  
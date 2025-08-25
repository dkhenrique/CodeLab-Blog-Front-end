export const postsList = document.querySelector('.posts-list');
export const inputSearch = document.querySelector('#search-posts');

export const postModal = {
  container: document.getElementById('modal-container'),
  form: document.getElementById('new-post-form'),
  titleInput: document.getElementById('post-title'),
  contentInput: document.getElementById('post-content'),
  closeBtn: document.getElementById('close-modal-btn'),
  newPostBtn: document.getElementById('new-post-btn')
};

export const confirmModal = {
  container: document.getElementById('confirm-delete-modal'),
  confirmBtn: document.getElementById('confirm-delete-btn'),
  cancelBtn: document.getElementById('cancel-delete-btn')
};
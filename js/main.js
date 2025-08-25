import ui from './ui.js';
import api from './api.js';
import { showToast } from './toast.js';
import {inputSearch, postModal } from './elements.js';

document.addEventListener('DOMContentLoaded', () => {
  ui.renderPosts();

  postModal.newPostBtn.addEventListener('click', () => {
    postModal.form.reset();
    delete postModal.form.dataset.editingId;
    postModal.container.classList.add('modal-container--visible');
  });

  postModal.closeBtn.addEventListener('click', () => {
    postModal.container.classList.remove('modal-container--visible');
  });

  postModal.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = postModal.titleInput.value;
    const content = postModal.contentInput.value;
    const editingId = postModal.form.dataset.editingId;

    try {

      if (editingId) {
        await api.updatePost(editingId, title, content);
        await ui.renderPosts();
        showToast('Post atualizado com sucesso!', 'success');
      } else {
        await api.addPost(title, content);
        await ui.renderPosts();
        showToast('Post criado com sucesso!', 'success');
      }
      postModal.form.reset();
      delete postModal.form.dataset.editingId;
      postModal.container.classList.remove('modal-container--visible');
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      showToast('Erro ao salvar post. Tente novamente.', 'error');
    }
  })


  postModal.container.addEventListener('click', (event) => {
  if (event.target === postModal.container) {
    postModal.container.classList.remove('modal-container--visible');
  }
});

  inputSearch.addEventListener('input', manipulateSearch)
})

async function manipulateSearch() {
  const termSearch = inputSearch.value;
  try {
    const filteredPosts = await api.getPostByTerm(termSearch);
    console.log(filteredPosts);
    ui.renderPosts(filteredPosts);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
  }
}
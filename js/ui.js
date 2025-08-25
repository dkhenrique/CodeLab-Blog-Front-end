import api from './api.js';
import { showToast } from './toast.js';
import { postsList, confirmModal, postModal } from './elements.js';

const ui = {
  async renderPosts(filteredPosts = null) {
    postsList.innerHTML = '';
    try {
      let postsForRender;

      if (filteredPosts) {
        postsForRender = filteredPosts;
      } else {
        postsForRender = await api.getPosts();
      }

      postsForRender.sort((a, b) => b.data - a.data);

      postsForRender.forEach(ui.addPostToList);
    } catch (error) {
      console.error('Erro ao renderizar posts:', error);
    }
  },

  addPostToList(post) {
    const li = document.createElement('li')
    li.setAttribute('data-id', post.id);
    li.classList.add('post-card');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-card__header');

    const postDate = document.createElement('p');
    postDate.classList.add('post-card__date');

    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }
    const dateFormated = post.data.toLocaleDateString('pt-BR', options);
    postDate.textContent = dateFormated;

    postHeader.appendChild(postDate);

    const postIcons = document.createElement('div');
    postIcons.classList.add('post-card__icons');
    postHeader.appendChild(postIcons);

    const isFavorited = post.favorito;
    const favoriteIcon = document.createElement('i');
    favoriteIcon.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        await api.updateFavoritePost(post.id, !isFavorited);
        await ui.renderPosts(); 
      } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
        showToast('Não foi possível atualizar o favorito.', 'error');
      }
    });
    favoriteIcon.classList.add('fa-heart');
    favoriteIcon.classList.add(isFavorited ? 'fa-solid' : 'fa-regular');
    favoriteIcon.setAttribute('aria-label', 'Marcar como favorito');
    postIcons.appendChild(favoriteIcon);

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    editIcon.setAttribute('aria-label', 'Editar post');
    postIcons.appendChild(editIcon);

    editIcon.addEventListener('click', () => {
      postModal.titleInput.value = post.titulo;
      postModal.contentInput.value = post.conteudo;
      postModal.form.dataset.editingId = post.id;
      postModal.container.classList.add('modal-container--visible');
    })

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteIcon.setAttribute('aria-label', 'Deletar post');
    postIcons.appendChild(deleteIcon);
    deleteIcon.addEventListener('click', async () => {

      confirmModal.container.classList.add('modal-container--visible');

      confirmModal.cancelBtn.onclick =  () => {
        confirmModal.container.classList.remove('modal-container--visible');
      }

      confirmModal.confirmBtn.onclick = async () => {
        try {
          await api.deletePost(post.id);
          await ui.renderPosts();
          showToast('Post deletado com sucesso!', 'success');
        } catch (error) {
          console.error('Erro ao deletar post:', error);
          showToast('Erro ao deletar post. Tente novamente.', 'error');
        } finally {
          confirmModal.container.classList.remove('modal-container--visible');
        }
      }
    })

    const postInfo = document.createElement('div');
    postInfo.classList.add('post-card__info');
    postInfo.innerHTML = `
      <h2 class="post-card__title">${post.titulo}</h2>
      <p class="post-card__description">${post.conteudo}</p>
    `;

    li.appendChild(postHeader);
    li.appendChild(postInfo);
    postsList.appendChild(li);
  }
}

export default ui;
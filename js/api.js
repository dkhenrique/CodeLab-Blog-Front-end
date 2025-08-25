const URL_BASE = 'http://localhost:3000';


const api = {
  async getPosts() {
    try {
      const response = await axios.get(`${URL_BASE}/artigos`);
      const posts = await response.data;
      return posts.map((post) => {
        return {
          ...post,
          data: new Date(post.data),
        }
      })
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
  },

async addPost(titulo, conteudo) {
  try {
    const newPost = {
      titulo,
      conteudo,
      data: new Date(),
      favorito: false
    };
    const response = await axios.post(`${URL_BASE}/artigos`, newPost);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar post:', error);
    throw error;
  }
},

async updatePost(id, titulo, conteudo) {
  try {
    const response = await axios.patch(`${URL_BASE}/artigos/${id}`, {
      titulo,
      conteudo
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
},

  async getPostByTerm(term) {
    try {
      const posts = await this.getPosts();
      const termInLowerCase = term.toLowerCase();
      const filteredPosts = posts.filter((post) => {
        return (
          post.titulo.toLowerCase().includes(termInLowerCase) ||
          post.conteudo.toLowerCase().includes(termInLowerCase)
        );
      });
      return filteredPosts;
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      throw error;
    }
  },

  async updateFavoritePost (id, favorito) {
    try {
      const response = await axios.patch(`${URL_BASE}/artigos/${id}`, { favorito });
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      throw error;
    }
  },

  async deletePost(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/artigos/${id}`);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      throw error;
    }
  }
}



export default api;
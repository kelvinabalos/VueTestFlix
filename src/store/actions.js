export default {
  addMovie: ({ commit }, payload) => {
    commit('Add_MOVIE', payload)
  },
  updateMovie: ({ commit }, payload) => {
    commit('EDIT_MOVIE', payload)
  }
}

export default {
  Add_MOVIE: (state, movies) => {
    console.log(movies)
    state.movies.push(movies)
  },
  EDIT_MOVIE: (state, movies) => {
    state.movies.forEach(v => {
      if (v.id === movies.id) {
        v = movies
      }
    })
  }
}

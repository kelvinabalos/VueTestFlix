<template>
  <div>
    <b-container fluid class="bv-example-row mt-5">
      <b-row>
        <b-col cols="3"  v-for="data in movies" :key="data.id">
          <movie-card :movies="data"/>
          <!-- <b-button id="deleteMovie" type="button" variant="danger" @click="remove(index)">x</b-button>
          <b-button id="editMovie" @click="getMovieInfo(data)" variant="success">EDIT</b-button> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'home',
  components: {
    'movie-card': MovieCard
  },
  computed: {
    ...mapState([
      'movies'
    ])
  }
}
</script>

<template>
  <div>
    <b-container fluid class="bv-example-row mt-5">
      <b-row>
        <b-col cols="3">
          <b-card
            header-tag="header"
            title="Add Movie"
          >
            <b-form @submit.prevent="handleSubmit">
              <b-form-group label="Title" label-for="exampleInput">
                <b-form-input
                  id="exampleInput"
                  type="text"
                  v-model="formData.name"
                  required
                  placeholder="Enter name" />
              </b-form-group>
              <b-form-group label="Genre" label-for="exampleInput2">
                <b-form-input
                  id="exampleInput2"
                  type="text"
                  v-model="formData.genre"
                  required
                  />
              </b-form-group>
              <b-form-group label="Photo" label-for="exampleInput3">
                <b-form-file
                  v-model="formData.img"
                  :state="Boolean(formData.img)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  accept="image/jpeg"
                  @change=uploadImage
                ></b-form-file>
              </b-form-group>
              <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col>

          <b-row>
            <b-col cols="4"  v-for="(data, index) in movies" :key="data.id">
              <movie-card :movies="data"/>
              <b-button id="deleteMovie" type="button" variant="danger" @click="remove(index)">x</b-button>
              <b-button id="editMovie" @click="getMovieInfo(data)" variant="success">EDIT</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-table striped hover :items="movies">
        <template slot="name" slot-scope="data">
          <router-link :to="`/movies/${data.index}`">
            {{ data.value }}
          </router-link>
        </template>
    </b-table> -->
    <b-modal ref="editMovie" title="Edit Movie" hide-footer>
      <b-form @submit.prevent="handleUpdate" >
        <b-form-group label="Title" label-for="editName">
          <b-form-input
            id="editName"
            type="text"
            v-model="selectedMovie.name"
            required
            placeholder="Enter name" />
        </b-form-group>
        <b-form-group label="Genre" label-for="editGenre">
          <b-form-input
            id="editGenre"
            type="text"
            v-model="selectedMovie.genre"
            required
            />
        </b-form-group>
        <b-form-group label="Photo" label-for="exampleInput3">
          <b-form-file
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept="image/jpeg"
            @change=editUploadImage
          ></b-form-file>
        </b-form-group>

        <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
export default {
  name: 'movies',
  data () {
    return {
      showPetForm: false,
      formData: {
        name: '',
        genre: '',
        img: ''
      },
      selectedMovie: {
        name: '',
        genre: '',
        img: ''
      }
    }
  },
  components: {
    'movie-card': MovieCard
  },
  computed: {
    ...mapState([
      'movies'
    ])
  },
  methods: {
    ...mapActions([
      'addMovie',
      'updateMovie'
    ]),
    handleSubmit () {
      const { genre, name, img } = this.formData
      const payload = {
        name,
        genre,
        img
      }
      this.addMovie(payload)

      // reset form after submit
      this.formData = {
        name: '',
        genre: '',
        img: ''
      }
    },
    remove (id) {
      console.log(id)
      this.$delete(this.movies, id)
    },
    getMovieInfo (item) {
      this.$refs['editMovie'].show()
      this.selectedMovie = item
    },
    handleUpdate () {
      this.selectedMovie = {
        name: this.selectedMovie.name,
        genre: this.selectedMovie.genre,
        img: this.selectedMovie.img
      }
      this.updateMovie(this.selectedMovie)
    },
    uploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.previewImage = e.target.result
        console.log(this.previewImage)
        this.formData.img = this.previewImage
      }
    },
    editUploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.previewImage = e.target.result
        console.log(this.previewImage)
        this.selectedMovie.img = this.previewImage
      }
    }
  }
}
</script>

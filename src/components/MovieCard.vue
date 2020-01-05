<template>
    <b-card
      :title="movies.name"
      :img-src="movies.img"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 border-0"
    >
      <b-card-text>
        {{movies.genre}}
      </b-card-text>
      <!-- <b-button href="#" variant="primary">View info</b-button> -->
    </b-card>
</template>

<script>
export default {
  props: {
    movies: Object
  }
}
</script>

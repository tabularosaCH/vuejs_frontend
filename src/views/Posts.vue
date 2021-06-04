<template>
  <div class="posts">
    <Navbar></Navbar>
    <h1>Posts </h1>
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row" >

                      <div v-for="posts in APIDATA" :key="posts.id" class="col-md-4" >
                      <div class="col-md-4">

                          <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="https://via.placeholder.com/150x100" alt="card image cap">
                            <div class="card-body">
                              <h4 class=""> <a class="text-secondary" href=""> {{ post.title }}</a></h4>
                              <p class="card-text">{{ post.content }}</p>

                              <div class="d-flex justify-content-between align-items-center">
                                      <small class="text-muted"> timesince  </small>
                              </div>
                            </div>
                          </div>

                      </div>
                      </div >

            </div>
          </div>
        </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { getAPI } from '@/router/axios-api.js'

export default {
  name: 'App',
  data () {
    return {
      APIDATA: []
    }
  },
  components: {

  },
  created () {
    getAPI.get('/posts/')
      .then(response => {
        console.log('Post API has recieved data')
        this.posts = response.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
</style>

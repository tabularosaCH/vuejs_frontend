<template>
  <div id="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary navbar-expand-sm">
          <!-- ...................................... MEDIUM view ...................................... -->

          <div class="navbar-brand">
              <router-link  to="/" class="navbar-item p-2 text-white" > <strong> Truffles Home </strong></router-link>
              <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
          </div>

          <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}" >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
               <router-link  to="/about" class="navbar-item p-2 text-white" > About </router-link>
               <router-link  to="/posts" class="navbar-item p-2 text-white" > Posts </router-link>
               <router-link  to="/users" class="navbar-item p-2 text-white" > Users </router-link>
               <router-link  to="/visitors" class="navbar-item p-2 text-white" > Visitors </router-link>

              </li>
            </ul>

          </div>

          <div class="navbar-menu d-flex flex-row-reverse flex-grow-1" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}" >
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">My account</router-link>
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light">Login</router-link>
              </template>

            <span > <img class="dot" src="../src/assets/default.jpg"> </span>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-dark " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </a>
                <div class="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdown">
                    <router-link  to="/profile" class="navbar-item p-2 text-white" > Profile </router-link>
                    <router-link  to="/password_change" class="navbar-item p-2 text-white" > Change Password </router-link>
                    <router-link  to="/logout" class="navbar-item p-2 text-white" > Logout </router-link>
                </div>

              </li>
            </ul>
          </div>
      </nav>

  <section class="section" >
      <router-view/>
  </section>
  </div>

</template>

<script >
export default {
  data () {
    return {
      showMobileMenu: false

    }

  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  computed: {
      cartTotalLength() {
          let totalLength = 0
          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }
          return totalLength
      }
  }
}

</script>

<style lang="scss">

@import '../node_modules/bootstrap';

ul {
  margin: 0;
}
/* li {
  list-style-type: none;
  display : inline;
  } */
#page-container {
  position: relative;
  min-height: 100%;  /* min-height: 100vh; */
}
.navbar{
  height: 50px;
  padding-top: 15px;
  padding-bottom: 0px;
}
/* profile dropdown */
.dot {
  height: 35px;
  width: 35px;
  background-color: rgb(182, 200, 211);
  border-radius: 50%;
  display: inline-block;

}
/* profile dropdown caret arrow  */
.caret{
  border-top:4px solid blue;
}
/* START ui styling START */
.flex-center {
  height: 100%;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
}
ul li {
  /* top right bottom left */
  margin: 0 0 10px 0;
}
.ui.button {
  width: 200px;
  border-radius: 0px !important;
}
.block-center {
  text-align: center !important;
}

/* STOP ui styling STOP */
</style>

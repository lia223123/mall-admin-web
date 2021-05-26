import Vue from "vue"

Vue.mixin({
  methods: {
    hasAuth(perm) {
      let authority = this.$store.state.user.roles
      return authority.indexOf(perm) > -1
    }
  }
})

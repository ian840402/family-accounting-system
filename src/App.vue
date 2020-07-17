<template lang="pug">
  v-app id="inspire"
    v-navigation-drawer(v-model="drawer" app clipped)
      Navigation
    v-app-bar(app clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title 家庭記賬系統
    v-main
      router-view
    v-footer(app)
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data: () => ({
    drawer: null
  })
}
</script>

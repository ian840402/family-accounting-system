<template lang="pug">
  .list-page
</template>

<script>
import apiUser from '@/api/user'

export default {
  data () {
    return {
      listData: []
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiUser.getAll()
      this.listData = data.data
    }
  }
}
</script>

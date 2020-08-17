<template lang="pug">
  .info-page
    h1.page-title 使用者管理 - {{ infoData.name }}
    v-btn(@click="$router.go(-1)") 上一頁
    .info-wrapper
      .info-items
        .item-title 名稱：
        .item-value {{ infoData.name }}
      .info-items
        .item-title 備註：
        .item-value {{ infoData.description }}
</template>

<script>
import { apiUserGet } from '@/api/user'

export default {
  data () {
    return {
      infoData: {}
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiUserGet(this.$route.params.id)
      this.infoData = data
    }
  }
}
</script>

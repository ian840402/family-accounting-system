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
      .info-items
        .item-title 建立日期：
        .item-value {{ infoData.created_at }}
      .info-items
        .item-title 更新日期：
        .item-value {{ infoData.updated_at }}
</template>

<script>
import { apiUserGet } from '@/api/user'
import dayjs from 'dayjs'

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
      const id = this.$route.params.id
      const { data } = await apiUserGet(id)
      data.created_at = dayjs(data.created_at).format('YYYY-MM-DD HH:mm')
      data.updated_at = dayjs(data.updated_at).format('YYYY-MM-DD HH:mm')
      this.infoData = data
    }
  }
}
</script>

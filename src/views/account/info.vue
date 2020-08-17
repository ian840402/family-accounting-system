<template lang="pug">
  .info-page
    h1.page-title 使用者管理 - {{ infoData.name }}
    v-btn(@click="$router.go(-1)") 上一頁
    .info-wrapper
      .info-items
        .item-title 帳戶名稱：
        .item-value {{ infoData.name }}
      .info-items
        .item-title 銀行名稱：
        .item-value {{ infoData.bank }}
      .info-items
        .item-title 使用者：
        .item-value {{ infoData.user_id }}
      .info-items
        .item-title 初始金額：
        .item-value {{ infoData.init_money }}
      .info-items
        .item-title 備註：
        .item-value {{ infoData.description }}
</template>

<script>
import { apiAccountGet } from '@/api/account'

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
      const { data } = await apiAccountGet(id)
      this.infoData = data
    }
  }
}
</script>

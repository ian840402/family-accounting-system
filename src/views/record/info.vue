<template lang="pug">
  .info-page
    h1.page-title 使用者管理 - {{ infoData.name }}
    v-btn(@click="$router.go(-1)") 上一頁
    .info-wrapper
      .info-items
        .item-title 類型：
        .item-value {{ infoData.is_income ? '收入' : '支出' }}
      .info-items
        .item-title 分類：
        .item-value {{ infoData.type_id }}
      .info-items
        .item-title 帳戶名稱：
        .item-value {{ infoData.account_id }}
      .info-items
        .item-title 使用者：
        .item-value {{ infoData.user_id }}
      .info-items
        .item-title 金額：
        .item-value {{ infoData.money }}
      .info-items
        .item-title 備註：
        .item-value {{ infoData.description }}
</template>

<script>
import { apiRecordGet } from '@/api/record'

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
      const { data } = await apiRecordGet(id)
      this.infoData = data
    }
  }
}
</script>

<template lang="pug">
  .info-page
    h1.page-title 帳戶管理 - {{ infoData.name }}
    v-btn(@click="$router.go(-1)") 上一頁
    .info-wrapper
      .info-items
        .item-title 帳戶名稱：
        .item-value {{ infoData.name }}
      .info-items
        .item-title 銀行名稱：
        .item-value {{ infoData.bank }}
      .info-items
        .item-title 銀行帳號：
        .item-value {{ infoData.bank_account }}
      .info-items
        .item-title 使用者：
        .item-value {{ infoData.user.name }}
      .info-items
        .item-title 初始金額：
        .item-value {{ infoData.init_money }}
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
import { apiAccountGet } from '@/api/account'
import moment from 'moment'

export default {
  data () {
    return {
      infoData: {
        user: {}
      }
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiAccountGet(id)
      data.created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm')
      data.updated_at = moment(data.updated_at).format('YYYY-MM-DD HH:mm')
      this.infoData = data
    }
  }
}
</script>

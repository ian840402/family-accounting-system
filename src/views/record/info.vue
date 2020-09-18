<template lang="pug">
  .info-page
    h1.page-title 記帳管理
    v-btn(@click="$router.go(-1)") 上一頁
    .info-wrapper
      .info-items
        .item-title 類型：
        .item-value {{ infoData.is_income ? '收入' : '支出' }}
      .info-items
        .item-title 金額：
        .item-value {{ infoData.money }}
      .info-items
        .item-title 分類：
        .item-value {{ infoData.record_type.name }}
      .info-items
        .item-title 帳戶名稱：
        .item-value {{ infoData.account.name }}
      .info-items
        .item-title 使用者：
        .item-value {{ infoData.user.name }}
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
import { apiRecordGet } from '@/api/record'
import numberFormat from '@/utils/number-with-comma'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      infoData: {
        user: {},
        account: {},
        record_type: {}
      }
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiRecordGet(id)
      data.money = numberFormat(data.money)
      data.created_at = dayjs(data.created_at).format('YYYY-MM-DD HH:mm')
      data.updated_at = dayjs(data.updated_at).format('YYYY-MM-DD HH:mm')
      this.infoData = data
    }
  }
}
</script>

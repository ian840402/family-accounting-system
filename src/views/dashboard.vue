<template lang="pug">
  .page dashboard
    div 今日日期 {{ today }}
    div 當日收入 {{ infoData.today.income }}
    div 當日支出 {{ infoData.today.expense }}
    div 當月收入 {{ infoData.month.income }}
    div 當月支出 {{ infoData.month.expense }}
    div 當季收入 {{ infoData.quarter.income }}
    div 當季支出 {{ infoData.quarter.expense }}
</template>

<script>
import { apiRecordStatisticInfo } from '@/api/record'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      today: dayjs().format('YYYY/MM/DD'),
      infoData: {
        today: {},
        month: {},
        quarter: {}
      }
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiRecordStatisticInfo()

      this.infoData = data
    }
  }
}
</script>

<template lang="pug">
  .main-page
    .control-block
      v-btn(to="/record/add") 新增一筆
    div 今日日期 {{ today }}
    div 當日總支出: {{ expenseTotal }}
    div 當日總收入: {{ incomeTotal }}
    div 當日記帳列表
    div(v-for="item in listData")
      div {{ item.is_income ? '收入' : '支出' }}
      div {{ item.money }}
</template>

<script>
import { apiRecordStatisticPeriod } from '@/api/record'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      today: dayjs().format('YYYY/MM/DD'),
      listData: [],
      incomeTotal: 0,
      expenseTotal: 0
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiRecordStatisticPeriod()

      data.data.forEach((item) => {
        item.date = dayjs(item.date).format('YYYY/MM/DD')
      })

      this.listData = data.data
      this.incomeTotal = data.incomeTotal
      this.expenseTotal = data.expenseTotal
    }
  }
}
</script>

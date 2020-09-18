<template lang="pug">
  .main-page
    .control-block
      v-btn(to="/record/add") 新增一筆
    div 今日日期
    div 當日總支出
    div 當日總收入
    div 當日記帳列表
    div 月曆
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      today: dayjs().format('YYYY/MM/DD')
    }
  }
}
</script>

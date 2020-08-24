<template lang="pug">
  .list-page
    h1.page-title 記帳管理
    v-btn(to="/record/add") 新增
    v-btn(to="/record/type") 分類管理
    .list-table-wrap
      v-data-table(
        :headers="tableConfig.header"
        :items="listData"
        :page.sync="pagination.currentPage"
        :items-per-page="pagination.perPage"
        :disable-sort="true"
        :loading="tableConfig.loading"
        hide-default-footer)
        template(v-slot:item.is_income="{ value }")
          div {{ value ? '收入' : '支出' }}
        template(v-slot:item.activity="{ item }")
          .activity-wrap
            v-btn(:to="`record/info/${item.id}`") 檢視
            v-btn(:to="`record/edit/${item.id}`") 編輯
            v-btn(@click="deleteHandler(item.id)") 刪除
      v-pagination(
        v-model="pagination.currentPage"
        :length="pagination.lastPage"
        @previous="getData"
        @input="getData"
        @next="getData")
</template>

<script>
import { apiRecordGetAll, apiRecordDelete } from '@/api/record'
import numberFormat from '@/utils/number-with-comma'

export default {
  data () {
    return {
      listData: [],
      tableConfig: {
        header: [
          { text: '類型', value: 'is_income' },
          { text: '金額', value: 'money' },
          { text: '分類', value: 'record_type.name' },
          { text: '帳戶', value: 'account.name' },
          { text: '操作', value: 'activity' }
        ],
        loading: true
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        totalPage: 0,
        lastPage: 1
      }
    }
  },
  computed: {
    apiParams () {
      return {
        page_size: this.pagination.perPage,
        page: this.pagination.currentPage
      }
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      this.tableConfig.loading = true
      const { data } = await apiRecordGetAll(this.apiParams)
      data.data.forEach((item) => {
        item.money = numberFormat(item.money)
      })
      this.listData = data.data
      this.pagination.totalPage = data.total
      this.pagination.lastPage = data.last_page
      this.tableConfig.loading = false
    },
    async deleteHandler (id) {
      await apiRecordDelete(id)
      if (this.listData.length % this.pagination.perPage === 1 &&
        this.pagination.currentPage > 1) {
        this.pagination.currentPage--
      }
      await this.getData()
    }
  }
}
</script>

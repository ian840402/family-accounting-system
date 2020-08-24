<template lang="pug">
  .list-page
    h1.page-title 帳戶管理
    v-btn(to="/account/add") 新增
    .list-table-wrap
      v-data-table(
        :headers="tableConfig.header"
        :items="listData"
        :page.sync="pagination.currentPage"
        :items-per-page="pagination.perPage"
        :disable-sort="true"
        :loading="tableConfig.loading"
        hide-default-footer)
        template(v-slot:item.activity="{ item }")
          .activity-wrap
            v-btn(:to="`account/info/${item.id}`") 檢視
            v-btn(:to="`account/edit/${item.id}`") 編輯
            v-btn(@click="deleteHandler(item.id)") 刪除
      v-pagination(
        v-model="pagination.currentPage"
        :length="pagination.lastPage"
        @previous="getData"
        @input="getData"
        @next="getData")
</template>

<script>
import { apiAccountGetAll, apiAccountDelete } from '@/api/account'

export default {
  data () {
    return {
      listData: [],
      tableConfig: {
        header: [
          { text: '帳戶名稱', value: 'name' },
          { text: '銀行', value: 'bank' },
          { text: '銀行帳戶', value: 'bank_account' },
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
      const { data } = await apiAccountGetAll(this.apiParams)
      this.listData = data.data
      this.pagination.totalPage = data.total
      this.pagination.lastPage = data.last_page
      this.tableConfig.loading = false
    },
    async deleteHandler (id) {
      await apiAccountDelete(id)
      if (this.listData.length % this.pagination.perPage === 1 &&
        this.pagination.currentPage > 1) {
        this.pagination.currentPage--
      }
      await this.getData()
    }
  }
}
</script>

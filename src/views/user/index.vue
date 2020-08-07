<template lang="pug">
  .list-page
    .list-control-wrap
      router-link(to="user/add").add-new 新增
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
            .view
              router-link(:to="`user/info/${item.id}`") 檢視
            .edit
              router-link(:to="`user/edit/${item.id}`") 編輯
            .delete(@click="deleteEvent(item.id)") 刪除
      v-pagination(
        v-model="pagination.currentPage"
        :length="pagination.lastPage"
        @previous="getData"
        @input="getData"
        @next="getData")
</template>

<script>
import apiUser from '@/api/user'

export default {
  data () {
    return {
      listData: [],
      tableConfig: {
        header: [
          { text: '使用者', value: 'name' },
          { text: '建立日期', value: 'createdAt' },
          { text: '更新日期', value: 'updatedAt' },
          { text: '操作', value: 'activity' }
        ],
        loading: true
      },
      pagination: {
        perPage: 2,
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
      const { data } = await apiUser.getAll(this.apiParams)
      this.listData = data.data
      this.pagination.totalPage = data.total
      this.pagination.lastPage = data.last_page
      this.tableConfig.loading = false
    },
    async deleteEvent (id) {
      await apiUser.deleteOne(id)
      if (this.listData.length % this.pagination.perPage === 1 &&
        this.pagination.currentPage > 1) {
        this.pagination.currentPage--
      }
      await this.getData()
    }
  }
}
</script>

<template lang="pug">
  .list-page
    h1.page-title 類別管理
    v-btn(@click="$router.go(-1)") 上一頁
    v-btn(@click="status.dialog = true") 新增
    .list-controll-block
      v-radio-group(v-model="status.is_income" @change="getData")
        v-radio(label="收入" :value="true")
        v-radio(label="支出" :value="false")
    .list-table-wrap
      v-data-table(
        :headers="tableConfig.header"
        :items="listData"
        :disable-sort="true"
        :loading="tableConfig.loading"
        hide-default-footer)
        template(v-slot:item.name="{ item }")
          .item-input(v-if="item.isEdit")
            v-text-field(v-model="item.name")
          .item-value(v-else) {{ item.name }}
        template(v-slot:item.is_income="{ value }")
          div {{ value ? '收入' : '支出' }}
        template(v-slot:item.activity="{ item }")
          .activity-wrap
            .activity-edit(v-if="item.isEdit")
              v-btn(@click="item.isEdit=false") 取消
              v-btn(@click="updateHandler(item)") 儲存
            v-btn(v-else @click="item.isEdit = true") 編輯
            v-btn(@click="deleteHandler(item.id)") 刪除
    v-dialog(v-model="status.dialog" persistent max-width="600px")
      v-card
        v-card-title 新增類別
        v-card-text
          v-form
            v-text-field(v-model="formData.name" label="名稱" placeholder="請輸入名稱")
            v-radio-group(v-model="formData.is_income")
              v-radio(label="收入" :value="true")
              v-radio(label="支出" :value="false")
        v-card-actions
          v-btn(@click="status.dialog = false") 取消
          v-btn(@click="createHandler" :disable="status.saveLoading" :loading="status.saveLoading") 儲存
</template>

<script>
import { apiRecordTypeGetAll, apiRecordTypePost, apiRecordTypePut, apiRecordTypeDelete } from '@/api/record'

export default {
  data () {
    return {
      listData: [],
      tableConfig: {
        header: [
          { text: '名稱', value: 'name', width: 250 },
          { text: '類型', value: 'is_income' },
          { text: '操作', value: 'activity' }
        ],
        loading: true
      },
      formData: {
        name: '',
        is_income: true
      },
      status: {
        is_income: true,
        saveLoading: false,
        dialog: false
      }
    }
  },
  computed: {
    apiParams () {
      return {
        is_income: this.status.is_income
      }
    }
  },
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      this.tableConfig.loading = true
      const { data } = await apiRecordTypeGetAll(this.apiParams)
      data.data.forEach((item) => { item.isEdit = false })
      this.listData = data.data
      this.tableConfig.loading = false
    },
    async createHandler () {
      const data = this.formData
      if (data.name) {
        this.status.saveLoading = true
        await apiRecordTypePost(data)
        await this.getData()
        this.status.saveLoading = false
        this.status.dialog = false
        this.initFormData()
      }
    },
    async updateHandler (item) {
      const id = item.id
      const data = {
        name: item.name,
        is_income: item.is_income
      }
      await apiRecordTypePut(id, data)
      item.isEdit = false
    },
    async deleteHandler (id) {
      await apiRecordTypeDelete(id)
      await this.getData()
    },
    initFormData () {
      this.formData.name = ''
      this.formData.is_income = true
    }
  }
}
</script>

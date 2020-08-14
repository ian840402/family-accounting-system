<template lang="pug">
  .edit-page
    h1.page-title 使用者管理 - {{ pageMode === 'UserEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-text-field(v-model="formData.name" label="名稱" placeholder="請輸入名稱")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(@click="submitEvent") 儲存
    v-snackbar(v-model="status.success" color="success" timeout="1500" top) 儲存成功
</template>

<script>
import { apiUserGet, apiUserPost, apiUserPut } from '@/api/user'

export default {
  data () {
    return {
      formData: {
        name: '',
        description: ''
      },
      status: {
        success: false
      }
    }
  },
  computed: {
    pageMode () {
      return this.$route.name
    }
  },
  created () {
    if (this.pageMode === 'UserEdit') this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiUserGet(this.$route.params.id)
      this.formData.name = data.name
      this.formData.description = data.description
    },
    async submitEvent () {
      this.pageMode === 'UserEdit' ? await apiUserPut(this.formData) : await apiUserPost(this.formData)
      this.status.success = true
      setTimeout(() => {
        this.$router.push('/user')
      }, 1500)
    }
  }
}
</script>

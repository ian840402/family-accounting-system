<template lang="pug">
  .edit-page
    h1.page-title 使用者管理 - {{ pageMode === 'UserEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-text-field(v-model="formData.name" label="名稱" placeholder="請輸入名稱")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(v-if="pageMode === 'UserEdit'" @click="updateHandler" :loading="status.loading") 儲存
      v-btn(v-else @click="creatHandler" :loading="status.loading") 儲存
    v-snackbar(v-model="status.success" color="success" timeout="1000" top) 儲存成功
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
        success: false,
        loading: false
      }
    }
  },
  computed: {
    pageMode () {
      return this.$route.name
    }
  },
  async created () {
    if (this.pageMode === 'UserEdit') await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiUserGet(id)
      this.formData.name = data
    },
    async creatHandler () {
      this.status.loading = true
      await apiUserPost(this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/user')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    },
    async updateHandler () {
      const id = this.$route.params.id
      this.status.loading = true
      await apiUserPut(id, this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/user')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    }
  }
}
</script>

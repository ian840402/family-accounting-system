<template lang="pug">
  .edit-page
    h1.page-title 帳戶管理 - {{ pageMode === 'UserEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-text-field(v-model="formData.name" label="名稱" placeholder="請輸入名稱")
      v-text-field(v-model="formData.bank" label="銀行名稱" placeholder="請輸入銀行名稱")
      v-select(v-model="formData.user_id" label="使用者" :items="userData" item-text="name" item-value="id")
      v-text-field(v-model="formData.init_money" label="初始金額" placeholder="請輸入初始金額" prefix="$")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(@click="submit_event") 儲存
    v-snackbar(v-model="status.success" color="success" timeout="1500" top) 儲存成功
</template>

<script>
import { apiAccountGet, apiAccountPost, apiAccountPut } from '@/api/account'
import { apiUserGetAll } from '@/api/user'

export default {
  data () {
    return {
      userData: [],
      formData: {
        name: '',
        bank: '',
        user_id: null,
        init_money: 0,
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
  async created () {
    const { data } = await apiUserGetAll()
    this.userData = data.data
    if (this.pageMode === 'AccountEdit') this.getData()
  },
  methods: {
    async getData () {
      const { data } = await apiAccountGet(this.$route.params.id)
      this.formData.name = data.name
      this.formData.description = data.description
    },
    async submit_event () {
      this.pageMode === 'AccountEdit' ? await apiAccountPut(this.formData) : await apiAccountPost(this.formData)
      this.status.success = true
      setTimeout(() => {
        this.$router.push('/user')
      }, 1500)
    }
  }
}
</script>

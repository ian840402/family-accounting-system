<template lang="pug">
  .edit-page
    h1.page-title 帳戶管理 - {{ pageMode === 'AccountEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-text-field(v-model="formData.name" label="名稱" placeholder="請輸入名稱")
      v-text-field(v-model="formData.bank" label="銀行名稱" placeholder="請輸入銀行名稱")
      v-text-field(v-model="formData.bank_account" label="銀行帳號" placeholder="請輸入銀行帳號")
      v-select(v-model="formData.user_id" label="使用者" :items="userData" item-text="name" item-value="id")
      v-text-field(v-model="formData.init_money" label="初始金額" placeholder="請輸入初始金額" prefix="$")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(v-if="pageMode === 'AccountEdit'" @click="updateHandler" :loading="status.loading") 儲存
      v-btn(v-else @click="creatHandler" :loading="status.loading") 儲存
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
        bank_account: '',
        user_id: null,
        init_money: 0,
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
    const { data } = await apiUserGetAll()
    this.userData = data.data
    if (this.pageMode === 'AccountEdit') await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiAccountGet(id)
      this.formData.name = data.name
      this.formData.bank = data.bank
      this.formData.bank_account = data.bank_account
      this.formData.user_id = data.user.id
      this.formData.init_money = data.init_money
      this.formData.description = data.description
    },
    async creatHandler () {
      this.status.loading = true
      await apiAccountPost(this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/account')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    },
    async updateHandler () {
      const id = this.$route.params.id
      this.status.loading = true
      await apiAccountPut(id, this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/account')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    }
  }
}
</script>

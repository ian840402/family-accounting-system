<template lang="pug">
  .edit-page
    h1.page-title 帳戶管理 - {{ pageMode === 'RecordEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-select(v-model="formData.type_id" label="類型" :items="recordTypeData" item-text="name" item-value="id")
      v-select(v-model="formData.account_id" label="帳戶" :items="accountData" item-text="name" item-value="id")
      v-select(v-model="formData.user_id" label="使用者" :items="userData" item-text="name" item-value="id")
      v-text-field(v-model="formData.money" label="金額" placeholder="請輸入金額" prefix="$")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(v-if="pageMode === 'RecordEdit'" @click="updateHandler" :loading="status.loading") 儲存
      v-btn(v-else @click="creatHandler" :loading="status.loading") 儲存
    v-snackbar(v-model="status.success" color="success" timeout="1500" top) 儲存成功
</template>

<script>
import { apiRecordGet, apiRecordPost, apiRecordPut, apiRecordTypeGetAll } from '@/api/record'
import { apiAccountGetAll } from '@/api/account'
import { apiUserGetAll } from '@/api/user'

export default {
  data () {
    return {
      userData: [],
      accountData: [],
      recordTypeData: [],
      formData: {
        is_income: true,
        type_id: null,
        user_id: null,
        account_id: null,
        money: 0,
        date: new Date(),
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
    const { data: userData } = await apiUserGetAll()
    const { data: accountData } = await apiAccountGetAll()
    const { data: recordTypeData } = await apiRecordTypeGetAll()
    this.userData = userData.data
    this.accountData = accountData.data
    this.recordTypeData = recordTypeData.data
    if (this.pageMode === 'RecordEdit') await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiRecordGet(id)
      this.formData = data
    },
    async creatHandler () {
      this.status.loading = true
      await apiRecordPost(this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/record')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    },
    async updateHandler () {
      const id = this.$route.params.id
      this.status.loading = true
      await apiRecordPut(id, this.formData)
        .then(() => {
          this.status.success = true
          setTimeout(() => {
            this.$router.push('/record')
          }, 1000)
        })
        .catch(() => {
          this.status.loading = false
        })
    }
  }
}
</script>

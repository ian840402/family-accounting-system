<template lang="pug">
  .edit-page
    h1.page-title 記帳管理 - {{ pageMode === 'RecordEdit' ? '編輯' : '新增' }}
    v-btn(@click="$router.go(-1)") 上一頁
    v-form
      v-radio-group(v-model="formData.is_income" @change="getTypeData" :disabled="pageMode === 'RecordEdit'")
        v-radio(label="收入" :value="true")
        v-radio(label="支出" :value="false")
      v-text-field(v-model="formData.money" label="金額" placeholder="請輸入金額" prefix="$")
      v-select(v-model="formData.type_id" label="類型" :items="recordTypeData" item-text="name" item-value="id")
      v-select(v-model="formData.account_id" label="帳戶" :items="accountData" item-text="name" item-value="id")
      v-select(v-model="formData.user_id" label="使用者" :items="userData" item-text="name" item-value="id")
      v-menu(v-model="status.dataPicker" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px" :nudge-right="40")
        template(v-slot:activator="{ on, attrs }")
          v-text-field(v-model="formData.date" label="日期"  placeholder="請選擇時間" readonly v-bind="attrs" v-on="on")
        v-date-picker(v-model="formData.date" @input="status.dataPicker = false")
      v-textarea(v-model="formData.description" label="備註" placeholder="請輸入備註" :clearable="true" :dense="true")
      v-btn(v-if="pageMode === 'RecordEdit'" @click="updateHandler" :loading="status.loading") 儲存
      v-btn(v-else @click="creatHandler" :loading="status.loading") 儲存
    v-snackbar(v-model="status.success" color="success" timeout="1500" top) 儲存成功
</template>

<script>
import { apiRecordGet, apiRecordPost, apiRecordPut, apiRecordTypeGetAll } from '@/api/record'
import { apiAccountGetAll } from '@/api/account'
import { apiUserGetAll } from '@/api/user'
import dayjs from 'dayjs'

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
        date: dayjs().format('YYYY-MM-DD'),
        description: ''
      },
      status: {
        dataPicker: false,
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
    await this.getTypeData()
    this.userData = userData.data
    this.accountData = accountData.data
    if (this.pageMode === 'RecordEdit') await this.getData()
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      const { data } = await apiRecordGet(id)
      data.date = dayjs(data.date).format('YYYY-MM-DD')
      this.formData.is_income = data.is_income
      this.formData.type_id = data.record_type.id
      this.formData.user_id = data.user.id
      this.formData.account_id = data.account.id
      this.formData.money = data.money
      this.formData.date = data.date
      this.formData.description = data.description
    },
    async getTypeData () {
      const isIncome = this.formData.is_income
      const { data } = await apiRecordTypeGetAll({ isIncome })
      this.recordTypeData = data.data
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

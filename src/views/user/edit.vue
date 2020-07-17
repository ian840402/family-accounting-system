<template lang="pug">
  .edit-page
    div edit page
    v-form
      v-text-field(v-model="formData.name" label="名稱")
      v-textarea(v-model="formData.note" label="備註" :clearable="true" :dense="true")
      v-btn(@click="submit_event" :disabled="!status.submit") 送出
    v-snackbar(v-model="status.snackbar" color="success" timeout="2000" top) 新增成功
</template>

<script>
import apiUser from '@/api/user'

export default {
  data () {
    return {
      formData: {
        name: '',
        note: ''
      },
      status: {
        submit: true,
        snackbar: false
      }
    }
  },
  methods: {
    async submit_event () {
      this.status.submit = false
      await apiUser(this.formData)
      await this.submit_success()
    },
    async submit_success () {
      this.status.snackbar = true
      setTimeout(() => {
        this.$router.push('/user')
      }, 2000)
    }
  }
}
</script>

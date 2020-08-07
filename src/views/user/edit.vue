<template lang="pug">
  .edit-page
    div edit page
    v-form
      v-text-field(v-model="formData.name" label="名稱")
      v-textarea(v-model="formData.description" label="備註" :clearable="true" :dense="true")
      v-btn(@click="submit_event") 送出
    v-snackbar(v-model="status.success" color="success" timeout="1500" top) 新增成功
</template>

<script>
import apiUser from '@/api/user'

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
  methods: {
    async submit_event () {
      await apiUser.create(this.formData)
      this.status.success = true
      setTimeout(() => {
        this.$router.push('/user')
      }, 1500)
    }
  }
}
</script>

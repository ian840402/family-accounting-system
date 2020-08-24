<template lang="pug">
  #navigation.navigation
    .main-menu
      ul.menu-list
        li.menu-list__items(v-for="item, index in menu" :key="index")
          router-link(:to="item.path").item
            .item-name {{ item.name }}
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: '首頁',
          path: '/'
        },
        {
          name: 'Dashboard',
          path: '/dashboard'
        },
        {
          name: '記帳管理',
          path: '/record'
        },
        {
          name: '帳戶管理',
          path: '/account'
        },
        {
          name: '使用者管理',
          path: '/user'
        }
      ]
    }
  }
}
</script>

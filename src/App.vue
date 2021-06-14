<template>
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'
import { getCookieValue } from './common/common'

export default {
  name: 'app',
  provide: {
    userId: ref(getCookieValue('token')),
    isTeacher: ref(JSON.parse(getCookieValue('isTeacher') || false)),
  }
}

</script>

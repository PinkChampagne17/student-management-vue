<template>
  <div class="container">
    <div class="title">咚咚校园</div>
    <div class="button-group">
      <van-button :to="{ name: 'register' }" type="primary" size="large" round block>注册</van-button>
      <van-button :to="{ name: 'login' }" type="success" size="large" round block>登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'vant'

export default {
  components: {
    VanButton: Button,
  }
}
</script>

<style scoped src="./Index.css"></style>

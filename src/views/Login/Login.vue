<template>
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-field
      v-model="id"
      name="id"
      label="用户名"
      placeholder="用户名"
      :rules="[
        { required: true, message: '请填写用户名' },
        { pattern: /^[a-zA-Z0-9]{5,20}$/ , message: '用户名需在5-20个字符以内（仅包含字母与数字）' },
      ]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[
        { required: true, message: '请填写密码' },
        { pattern: /^.{6,20}$/ , message: '密码需在6-20个字符以内' },
      ]"
    />
    <p style="margin: 16px; text-align: center;">
      还没有账户？
      <router-link to="/register" style="color: cornflowerblue;">立即注册</router-link>
    </p>
    <div style="margin: 16px;">
      <van-button round block type="success" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" src="./Login.ts"></script>

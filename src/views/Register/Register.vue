<template>
  <van-nav-bar
    title="注册"
    left-text="返回"
    right-text="登录"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
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
        { validator: validateId , message: '用户名已存在' },
      ]"
    />
    <van-field
      v-model="name"
      name="name"
      label="姓名"
      placeholder="姓名"
      :rules="[
        { required: true, message: '请填写姓名' },
        { pattern: /^.{2,15}$/ , message: '姓名需在2-15个字以内' },
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
    <van-field
      v-model="confirmPassword"
      type="password"
      name="confirmPassword"
      label="确认密码"
      placeholder="密码"
      :rules="[
        { required: true, message: '请填写密码' },
        { validator: val => val === password, message: '两次输入的密码不一致' },
      ]"
    />
    <div style="margin: 16px">
      <van-radio-group v-model="isTeacher" direction="horizontal">
        <van-radio name="0">我是学生</van-radio>
        <van-radio name="1">我是老师</van-radio>
      </van-radio-group>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="success" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" src="./Register.ts"></script>

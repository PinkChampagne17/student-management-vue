<template>
  <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" multiple />
  <van-form @submit="onSubmit">
    <van-field
      v-model="form.name"
      name="name"
      label="姓名"
      placeholder="姓名"
      :rules="[
        { pattern: /^.{2,15}$/ , message: '姓名需填写在2-15个字以内' },
      ]"
    />
    <van-field
      readonly
      clickable
      v-model="form.gender"
      name="gender"
      label="性别"
      placeholder="性别"
      @click="showGenderPicker = true"
    />
    <van-popup v-model:show="showGenderPicker" round position="bottom">
      <van-picker
        :columns="genderColumns"
        @cancel="showGenderPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-field
      v-model="form.phone"
      name="phone"
      label="电话"
      placeholder="电话"
      :rules="[{ pattern: /^.{0,11}$/, message: '电话号码需填写在11个字符以内' }]"
    />
    <van-field
      v-model="form.email"
      name="email"
      label="邮箱"
      placeholder="邮箱"
      :rules="[{ pattern: /^.{0,30}$/, message: '电子邮件需填写在30个字符以内' }]"
    />
    <!-- 学生专有信息 -->
    <template v-if="!isTeacher">
      <van-field
        v-model="form.studentId"
        name="studentId"
        label="学号"
        placeholder="学号"
        :rules="[{ required: /^.{0,20}$/, message: '学号需填写在20个字符以内' }]"
      />
      <van-field
        v-model="form.dormitory"
        name="dormitory"
        label="宿舍"
        placeholder="宿舍"
        :rules="[{ required: /^.{0,20}$/, message: '宿舍位置需填写在20个字符以内' }]"
      />
    </template>
    <div style="margin: 16px;">
      <van-button
      type="primary"
        native-type="submit"
        :loading="isSubmitting"
        loading-text="修改中..."
        round
        block
      >
        修改
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" src="./EditProfile.ts"></script>

<template>
  <van-nav-bar
    title="新建班级"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    placeholder
    fixed
  />
  <van-form @submit="onSubmit">
    <van-field
      v-model="form.school"
      name="school"
      label="学校"
      :rules="[
        { required: true, message: '请填写学校名称' },
        { pattern: /^.{3,20}$/ , message: '学校名称需在3-20个字以内' },
      ]"
    />
    <van-field
      v-model="form.department"
      name="college"
      label="院系"
      :rules="[
        { required: true, message: '请填写院系名称' },
        { pattern: /^.{3,20}$/ , message: '院系名称需在3-20个字以内' },
      ]"
    />
    <van-field
      v-model="form.major"
      name="major"
      label="专业"
      :rules="[
        { required: true, message: '请填写专业名称' },
        { pattern: /^.{2,20}$/ , message: '专业名称需在2-20个字以内' },
      ]"
    />
    <van-field
      v-model="form.name"
      name="name"
      label="班级"
      :rules="[
        { required: true, message: '请填写班级名称' },
        { pattern: /^.{2,20}$/ , message: '专业名称需在2-20个字以内' },
      ]"
    />
    <van-field
      v-model="form.year"
      name="year"
      label="年级"
      readonly
      clickable
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="yearColumns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div style="margin: 16px;">
      <van-button
        type="primary"
        native-type="submit"
        :loading="isLoading"
        loading-text="加载中..."
        round
        block
        >
        创建班级
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" src="./CreateClass.ts"></script>

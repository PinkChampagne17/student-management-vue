<template>
  <van-nav-bar
    title="加入班级"
    left-text="返回"
    @click-left="onClickLeft"
    left-arrow
    placeholder
    fixed
  />
  <van-form @submit="onSubmit">
    <van-field
      v-model="classId"
      name="school"
      label="班级ID"
      type="number"
      :rules="[
        { required: true, message: '请填写班级ID' },
      ]"
    />
    <div style="margin: 16px;">
      <van-button
        type="primary"
        native-type="submit"
        :loading="isLoading"
        loading-text="加载中..."
        round
        block
      >
        加入班级
      </van-button>
    </div>
  </van-form>
</template>

<script src="./JoinClass.ts"></script>

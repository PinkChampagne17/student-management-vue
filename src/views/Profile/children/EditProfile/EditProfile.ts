import { NavBar, Form, Field, Button, Uploader, Picker, Popup, Dialog, Skeleton } from 'vant';
import { updateProfile } from '@/api/user-api';
import { reactive, ref } from 'vue';
import { genderStrings, stringToGender } from '@/types/user';
import { defaultErrorHandler } from '@/common/error-handler';

export default {
  components: {
    VanForm: Form,
    VanField: Field,
    VanPopup: Popup,
    VanButton: Button,
    VanNavBar: NavBar,
    VanPicker: Picker,
    VanSkeleton: Skeleton,
    VanUploader: Uploader,
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  setup ({ user }: any) {
    // const user = props.user as User
    const isTeacher = user.isTeacher

    // form
    const isSubmitting = ref(false)
    const form = reactive({ ...user }) as any
    const fileList = ref([{ url: '/img/AquaMinato.png', isImage: true },])

    const onSubmit = async (values: any) => {
      isSubmitting.value = true
      values.gender = stringToGender(form.gender)
      try {
        await updateProfile(user.id, values)
        Dialog.alert({
          message: "修改成功",
        })
      } catch (error) {
        defaultErrorHandler(error)
      }
      isSubmitting.value = false
    }

    const afterRead = (file: any) => {
      console.log(file) // 此时可以自行将文件上传至服务器
    }


    // GenderPicker
    const showGenderPicker = ref(false)
    const genderColumns = ref(genderStrings)

    const onConfirm = (value: string) => {
      form.gender = value
      showGenderPicker.value = false
    }

    return {
      fileList,
      form,
      showGenderPicker,
      genderColumns,
      isSubmitting,
      isTeacher,
      onConfirm,
      onSubmit,
      afterRead,
    }
  }
}

import { Form, Field, Button, NavBar, RadioGroup, Radio, Popup, Picker, Dialog } from 'vant'
import { reactive, ref } from 'vue'
import { createClass } from '@/api/class-api'
import { defaultErrorHandler } from '@/common/error-handler'
import { useRouter } from 'vue-router'
import { routerBack } from '@/common/router'

export default {
  components: {
    VanForm: Form,
    VanField: Field,
    VanPopup: Popup,
    VanRadio: Radio,
    VanButton: Button,
    VanNavBar: NavBar,
    VanPicker: Picker,
    VanRadioGroup: RadioGroup,
  },
  setup () {
    const router = useRouter()

    const isLoading = ref(false)
    const showPicker = ref(false)
    const form = reactive({
      school: '',
      department: '',
      major: '',
      name: '',
      year: new Date().getFullYear(),
    })

    // 生成近7年的年份，作为年份选择器的选择项
    const yearColumns = [...new Array(7)].map((v, i) => new Date().getFullYear() - i)

    const onConfirm = (value: number) => {
      form.year = value;        // 修改ViewModel的值
      showPicker.value = false; // 关闭选择器
    }

    const onClickLeft = routerBack
    const onSubmit = (values: any) => {
      isLoading.value = true  // 提交信息时在按钮上显示加载图标
      createClass(form)
        .then((response) => {
          Dialog.alert({ message: '创建成功' })
          router.push({ name: 'student-list', params: { id: response.data.id } })
        })
        .catch(defaultErrorHandler)
        .finally(() => isLoading.value = false)
    }

    return {
      isLoading,
      showPicker,
      form,
      yearColumns,
      onConfirm,
      onSubmit,
      onClickLeft,
    }
  },
}

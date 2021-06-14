import { contains, register as RegisterApi } from '@/api/user-api'
import { routerBack } from '@/common/router'
import { AxiosError } from 'axios'
import { Form, Field, Button, NavBar, RadioGroup, Radio, Dialog } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    VanForm: Form,
    VanRadio: Radio,
    VanField: Field,
    VanButton: Button,
    VanNavBar: NavBar,
    VanRadioGroup: RadioGroup,
  },
  setup () {
    const router = useRouter()

    const id = ref('')
    const name = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const isTeacher = ref('0')

    const validateId = async (id: string) => {
      return contains(id)
    }

    const onSubmit = async () => {
      try {
        await RegisterApi({
          id: id.value,
          name: name.value,
          password: password.value,
          isTeacher: isTeacher.value == '1',
        })

        await Dialog.alert({
          title: '注册成功',
          message: '请记住您的账号与密码'
        })

        router.push({ name: 'login' })

      } catch (error) {
        Dialog.alert({
          title: '注册失败',
          message: (error as AxiosError).response?.data.message || error
        })
      }
    }

    const onClickLeft = routerBack
    const onClickRight = () => {
      router.push({ name: 'login' })
    }

    return {
      id,
      name,
      password,
      confirmPassword,
      isTeacher,
      validateId,
      onSubmit,
      onClickLeft,
      onClickRight,
    }
  },
}

import { Form, Field, Button, NavBar, Dialog, Notify } from 'vant'
import { getCookieValue } from '@/common/common';
import { logIn } from '@/api/user-api';
import { AxiosError } from 'axios';
import { inject, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { routerBack } from '@/common/router';

export default {
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanNavBar: NavBar,
  },
  setup () {
    const router = useRouter()

    const userIdRef = inject('userId') as Ref<string>
    const isTeacherRef = inject('isTeacher') as Ref<boolean>

    const id = ref('')
    const password = ref('')

    const onClickLeft = routerBack
    const onSubmit = () => {
      logIn(id.value, password.value)
        .then(() => {
          Notify({ type: 'success', message: '登录成功' })

          userIdRef.value = getCookieValue('token') || ''
          isTeacherRef.value = JSON.parse(getCookieValue('isTeacher') as string)

          router.push({ name: 'me' })
        })
        .catch((error) => {
          Dialog.alert({
            message: (error as AxiosError)?.message || error
          })
        })
    }

    return {
      id,
      password,
      onSubmit,
      onClickLeft,
    }
  },
}

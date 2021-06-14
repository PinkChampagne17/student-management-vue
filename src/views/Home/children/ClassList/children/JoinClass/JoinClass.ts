import { NavBar, Form, Field, Button, Dialog } from 'vant';
import { inject, ref, Ref } from 'vue';
import { classAddMember } from '@/api/class-api';
import { defaultErrorHandler } from '@/common/error-handler';
import { routerBack } from '@/common/router';

export default {
  components: {
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanNavBar: NavBar,
  },
  setup () {

    const userId = (inject('userId') as Ref<string>).value

    const classId = ref(null) as Ref<number | null>
    const isLoading = ref(false)

    const onClickLeft = routerBack
    const onSubmit = () => {
      if (classId.value != null) {
        isLoading.value = true
        classAddMember(classId.value, userId)
          .then(async () => {
            await Dialog.alert({ message: '加入班级成功' })
            location.reload()
          })
          .catch(defaultErrorHandler)
          .finally(() => isLoading.value = false)
      }
    }

    return {
      classId,
      isLoading,
      onClickLeft,
      onSubmit,
    }
  },
}

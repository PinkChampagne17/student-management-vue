import { getClass } from '@/api/class-api';
import { defaultErrorHandler } from '@/common/error-handler';
import { routerBack } from '@/common/router';
import { Class } from '@/types/class';
import { Cell, NavBar, Form, Field, Button } from 'vant';
import { Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    VanCell: Cell,
    VanForm: Form,
    VanField: Field,
    VanButton: Button,
    VanNavBar: NavBar,
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const classInstance = ref(undefined) as Ref<Class | undefined>

    let id = parseInt(route.params['id'] as string)
    getClass(id)
      .then(response => classInstance.value = response.data)
      .catch(defaultErrorHandler)

    const onClickLeft = routerBack
    const onClickRight = () => router.push({ name: 'student-list', params: { id } })

    return () => (
      <div>
        <van-nav-bar
          title={classInstance.value?.name}
          left-text="返回"
          onClickLeft={onClickLeft}
          right-text="班级成员"
          onClickRight={onClickRight}
          left-arrow
          placeholder
          fixed />
        <van-cell title="班级名称" value={classInstance.value?.name} />
        <van-cell title="班级ID" value={classInstance.value?.id} />
        <van-cell title="学校名称" value={classInstance.value?.school} />
        <van-cell title="院系" value={classInstance.value?.department} />
        <van-cell title="专业" value={classInstance.value?.major} />
        <van-cell title="年级" value={classInstance.value?.year} />
        <van-cell title="创建者用户ID" value={classInstance.value?.creatorUserId} />
      </div>
    )
  }
}

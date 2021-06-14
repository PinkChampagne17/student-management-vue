import { NavBar, Skeleton } from 'vant';
import { getUser } from '@/api/user-api';
import { computed, inject, Ref, ref } from 'vue';
import { genderToString, User } from '@/types/user';
import ShowProfile from './children/ShowProfile/ShowProfile'
import EditProfile from './children/EditProfile/EditProfile.vue'
import { useRoute } from 'vue-router';
import { defaultErrorHandler } from '@/common/error-handler';
import { routerBack } from '@/common/router';

export default {
  components: {
    ShowProfile,
    EditProfile,
    VanNavBar: NavBar,
    VanSkeleton: Skeleton,
  },
  setup () {
    // inject
    const currentUserId = (inject('userId') as Ref<string>).value

    // data
    const user = ref(null) as Ref<User | any>
    const isEditable = ref(false)

    // computed
    const isSameUser = computed(() => currentUserId == user.value?.id)
    const rightText = computed(() => isSameUser.value ? (isEditable.value ? '取消编辑' : '编辑') : '')

    // methods
    const onClickLeft = routerBack
    const onClickRight = () => {
      if (isSameUser.value) {
        isEditable.value = !isEditable.value
      }
    }

    // 初始化
    const id = useRoute().params['id'] as string
    getUser(id)
      .then((response) => {
        user.value = response.data
        user.value.gender = genderToString(user.value.gender)
      })
      .catch(defaultErrorHandler)

    // render
    const renderProfile = () => {
      // 用户信息加载完成后渲染用户资料面板
      if (user.value && !isEditable.value) {
        return <show-profile user={user.value}></show-profile>
      }
      // 用户点击编辑按钮后渲染资料编辑面板
      if (user.value && isEditable.value) {
        return <edit-profile user={user.value}></edit-profile>
      }
      // 服务器暂未响应时，显示骨架屏
      return <van-skeleton title row="5" />
    }

    return () => (
      <div>
        <van-nav-bar
          title="个人资料"
          left-text="返回"
          onClickLeft={onClickLeft}
          rightText={rightText.value}
          onClickRight={onClickRight}
          left-arrow
          placeholder
          fixed
        />
        { renderProfile() }
      </div>
    )
  }
}

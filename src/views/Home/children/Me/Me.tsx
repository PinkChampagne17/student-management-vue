import { Cell, CellGroup, Image, Loading, Dialog, Notify } from 'vant'
import { getUser, logOut } from '@/api/user-api'
import { inject, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defaultErrorHandler } from '@/common/error-handler'

export default {
  components: {
    VanCell: Cell,
    VanImage: Image,
    VanLoading: Loading,
    VanCellGroup: CellGroup,
  },
  setup () {
    const router = useRouter()

    const uid = (inject('userId') as Ref<string>).value

    const name = ref(null) as Ref<string | null>

    getUser(uid)
      .then(response => name.value = response.data.name)
      .catch(defaultErrorHandler)

    const onClickLogOutBtn = () => {
      Dialog.confirm({
        message: '确认要退出登录？',
      })
        .then(() => {
          logOut()
          Notify({ type: 'success', message: '你已退出登录' })
          router.push({ name: 'index' })
        })
        .catch(() => {
          Notify({ type: 'primary', message: '您取消了退出登录' })
        })
    }

    const slots = {
      loading: () => <van-loading type="spinner" size="20" />,
      error: () => <span>加载失败</span>
    }

    return () => (
      <div>
        <div style="padding-top: 20px; padding-bottom: 5px; background-color: turquoise;">
          <van-image
            round
            width="7rem"
            height="7rem"
            fit="cover"
            src="/img/AquaMinato.png"
            style="display: block; margin: 0 auto;"
            v-slots={slots}
          >
          </van-image>
          <p style="text-align: center; color: white; text-shadow: rgb(0 0 0) 0px 0px 6px">
            {name.value}
          </p>
        </div>
        <van-cell title="用户名" value={uid} />
        <van-cell title="个人资料" to={{ name: 'profile', params: { id: uid } }} is-link />
        <van-cell-group title="设置选项">
          <van-cell title="退出登录" onClick={onClickLogOutBtn}/>
        </van-cell-group>
      </div>
    )
  },
}

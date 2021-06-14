import { IndexBar, IndexAnchor, Cell, NavBar, Search, Sticky, SwipeCell, Button, Dialog, Notify } from 'vant';
import { classRemoveMember, getClass, getClassMember } from '@/api/class-api'
import { computed, inject, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { User } from '@/types/user';
import { getToProfileViewFunction, routerBack } from '@/common/router';
import { defaultErrorHandler } from '@/common/error-handler';

export default {
  // 引入组件
  components: {
    VanCell: Cell,
    VanButton: Button,
    VanNavBar: NavBar,
    VanSearch: Search,
    VanSticky: Sticky,
    VanIndexBar: IndexBar,
    VanSwipeCell: SwipeCell,
    VanIndexAnchor: IndexAnchor,
  },
  // 定义可传入的属性
  props: {
    classId: {
      type: Number,
    }
  },
  setup (props: any) {
    const router = useRouter()
    const route = useRoute()

    // 若为传入需要显示学生列表的班级id，则从路由参数上获取
    const classId = props.classId || parseInt(route.params['id'] as string)
    // 获取当前登录的userId
    const userId = (inject('userId') as Ref<string>).value

    // 定义响应式变量
    const className = ref('')               // 班级名称
    const classCreatorUserId = ref('')      // 该班级的创建者id
    const query = ref('')                   // 查询关键字
    const students = ref([]) as Ref<User[]> // 该班级的学生

    // 可复用的方法
    // 通过班级Id从后端获取学生列表
    const fetchStudents = () => {
      getClassMember(classId)
        .then(response => students.value = response.data)
        .catch(defaultErrorHandler)
    }

    // 计算属性
    // 经过查询关键字筛选后的学生列表
    const studentsMatchesQuery = computed(() =>
      students.value.filter(s => s.name?.indexOf(query.value) != -1)
    )
    const rightText = computed(() =>
      classCreatorUserId.value == userId ? "" : '退出班级'
    )

    // 初始化
    fetchStudents()   // 获取学生列表
    getClass(classId) // 获取班级信息
      .then(response => {
        className.value = response.data.name
        classCreatorUserId.value = response.data.creatorUserId
      })
      .catch(defaultErrorHandler)

    // 按钮点击事件
    // 点击左上角返回按钮返回上一个界面
    const onClickLeft = routerBack
    // 点击退出按钮
    const onExitBtn = async () => {
      try {
        await Dialog.confirm({ message: '是否确认退出班级' })
        await classRemoveMember(classId, userId)
        await Dialog.alert({ message: '退出班级成功' })
        location.reload()
      } catch (error) {
        if (error != 'cancel') {
          defaultErrorHandler(error)
        }
      }
    }
    // 点击学生单元格则跳转到该学生的资料页面
    const onClickStudentCell = (sId: string) => getToProfileViewFunction(router, sId)
    // 点击删除按钮
    const onClickRemoveBtn = (sId: string) => {
      return async () => {
        try {
          let name = studentsMatchesQuery.value.find(s => s.id == sId)?.name
          await Dialog.confirm({ message: `确定要移除成员“${name}”吗？` })
          await classRemoveMember(classId, sId)
          fetchStudents()
          Notify({ type: 'success', message: '删除成功' })
        } catch (error) {
          if (error == 'cancel') {
            Notify({ type: 'primary', message: '你取消了删除操作' })
          } else {
            defaultErrorHandler(error)
          }
        }
      }
    }

    // 学生列表渲染函数
    const renderStudents = () => studentsMatchesQuery.value.map(stu => {
      let slots = {
        right: () => {
          // 只有当前登录用户为该班级的创建者时渲染学生删除按钮
          if (classCreatorUserId.value == userId) {
            return <van-button square type="danger" text="删除" onClick={onClickRemoveBtn(stu.id)} />
          }
        }
      }
      return (
        <van-swipe-cell key={stu.id} v-slots={slots}>
          <van-cell border={true} title={stu.name} onClick={onClickStudentCell(stu.id)} />
        </van-swipe-cell>
      )
    })

    // 学生列表界面渲染函数
    return () => (
      <div>
        <van-sticky>
          <van-nav-bar
            title={className.value}
            left-text="返回"
            onClickLeft={onClickLeft}
            right-text={rightText.value}
            onClickRight={onExitBtn}
            left-arrow
            placeholder
            fixed
          />
          <van-search
            v-model={query.value}
            placeholder="请输入搜索关键词"
            shape="round"
          />
        </van-sticky>
        {renderStudents()}
      </div>
    )
  },
}

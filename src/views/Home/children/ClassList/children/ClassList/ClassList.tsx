import { getClasses } from '@/api/class-api';
import { defaultErrorHandler } from '@/common/error-handler';
import { Class } from '@/types/class';
import { Cell, CellGroup, NavBar, Empty } from 'vant';
import { inject, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    VanCell: Cell,
    VanEmpty: Empty,
    VanNavBar: NavBar,
    VanCellGroup: CellGroup,
  },
  setup () {
    const router = useRouter()

    const id = (inject('userId') as Ref<string>).value

    const classes = ref(null) as Ref<Class[] | null>

    getClasses(id)
      .then(response => classes.value = response.data)
      .catch(defaultErrorHandler)

    const renderEmptyTips = () => {
      if (classes.value?.length == 0) {
        return <van-empty image="search" description="您还没有创建过班级" />
      }
    }

    const renderClassList = () => classes.value?.map(c => (
      <van-cell title={c.name} to={{ name: 'class-profile', params: { id: c.id } }} is-link />
    ))

    const onClickRight = () => {
      router.push({ name: 'create-class' })
    }

    return () => (
      <div>
        <van-nav-bar
          title="班级列表"
          right-text="新建班级"
          onClickRight={onClickRight}
        />
        {renderEmptyTips()}
        {renderClassList()}
      </div>
    )
  }
}

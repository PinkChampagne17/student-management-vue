import { Cell } from 'vant'

export default {
  components: {
    VanCell: Cell,
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  setup ({ user }: any) {
    return () => (
      <div>
        <van-cell title="用户名" value={user.id} />
        <van-cell title="姓名" value={user.name} />
        <van-cell title="性别" value={user.gender} />
        <van-cell title="电话" value={user.phone} />
        <van-cell title="邮箱" value={user.email} />
        {
          !user.isTeacher && (
            <div>
              <van-cell title="学校" value={user.school} />
              <van-cell title="学号" value={user.phone} />
              <van-cell title="院系" value={user.department} />
              <van-cell title="专业" value={user.major} />
              <van-cell title="班级" value={user.className} />
              <van-cell title="年级" value={user.year} />
              <van-cell title="宿舍" value={user.dormitory} />
            </div>
          )
        }
      </div>
    )
  },
}

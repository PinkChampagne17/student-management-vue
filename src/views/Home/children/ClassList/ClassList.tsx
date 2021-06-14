import { getUser } from '@/api/user-api'
import { defaultErrorHandler } from '@/common/error-handler'
import { inject, Ref, ref } from 'vue'
import ClassList from './children/ClassList/ClassList'
import JoinClass from './children/JoinClass/JoinClass.vue'
import StudentList from '../../../StudentList/StudentList'

export default {
  components: {
    ClassList,
    JoinClass,
    StudentList,
  },
  setup () {
    const classId = ref(undefined) as Ref<number | null | undefined>

    const uid = (inject('userId') as Ref<string>).value
    const isTeacher = (inject('isTeacher') as Ref<boolean>).value

    getUser(uid)
      .then(response => classId.value = response.data.classId)
      .catch(defaultErrorHandler)

    const render = () => {
      if (isTeacher) {
        return <class-list></class-list>
      }
      if (classId.value === null) {
        return <join-class></join-class>
      }
      if (classId.value != null) {
        return <student-list classId={classId.value}></student-list>
      }
    }

    return () => (
      <div>
        {render()}
      </div>
    )
  },
}

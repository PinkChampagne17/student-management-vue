import { hasLoggedIn } from '@/api/user-api'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const ClassProfile = () => import('@/views/ClassProfile/ClassProfile.tsx')
const CreateClass = () => import('@/views/CreateClass/CreateClass.vue')
const Home = () => import('@/views/Home/Home.tsx')
const HomeClassList = () => import('@/views/Home/children/ClassList/ClassList.tsx')
const HomeMe = () => import('@/views/Home/children/Me/Me.tsx')
const StudentList = () => import('@/views/StudentList/StudentList.tsx')
const Index = () => import('@/views/Index/Index.vue')
const Login = () => import('@/views/Login/Login.vue')
const Profile = () => import('@/views/Profile/Profile.tsx')
const Register = () => import('@/views/Register/Register.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: { name: 'class' }
      },
      {
        path: 'classes',
        name: 'classes',
        component: HomeClassList
      },
      {
        path: 'me',
        name: 'me',
        component: HomeMe
      },
    ]
  },
  {
    path: '/users/:id/',
    name: 'profile',
    component: Profile
  },
  {
    path: '/create-class',
    name: 'create-class',
    component: CreateClass
  },
  {
    path: '/classes/:id',
    name: 'class-profile',
    component: ClassProfile,
  },
  {
    path: '/classes/:id/students',
    name: 'student-list',
    component: StudentList
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  let loggedIn = await hasLoggedIn()
  let toWelcomeViews = ['index', 'login', 'register'].find(n => n == to.name) != undefined

  if (!loggedIn && !toWelcomeViews) {
    next({ name: 'index'})
  } else if (loggedIn && toWelcomeViews) {
    next({ name: 'me'})
  } else {
    next()
  }
})

export default router

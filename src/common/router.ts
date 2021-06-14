import { Router } from 'vue-router'

export const getToProfileViewFunction = (router: Router, id: string) => {
  return () => {
    router.push({ name: 'profile', params: { id }})
  }
}

/** 路由回退 */
export const routerBack = () => {
  window.history.back()
}

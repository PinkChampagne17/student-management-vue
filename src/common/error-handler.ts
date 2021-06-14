import { AxiosError } from 'axios'
import { Dialog } from "vant"

export const defaultErrorHandler = (error: any) => {
  Dialog.alert({
    message: (error as AxiosError).response?.data.message || '服务器连接失败'
  })
}

/**
 * 睡眠函数。
 * @param {number} delay 需要睡眠的毫秒数。
 */
export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

/**
 * 获取cookie的值
 * @param name cookie name
 */
export const getCookieValue = (name: string) => {
  let prefix = `${name}=`
  let cookie = document.cookie.split('; ').find(c => c.startsWith(prefix))
  return cookie?.substring(prefix.length)
}

// 表单验证工具函数
export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  export const isValidPassword = (password: string): boolean => {
    // 至少8位，包含大小写字母和数字
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return regex.test(password)
  }
  
  export const isValidPhone = (phone: string): boolean => {
    // 中国大陆手机号
    const regex = /^1[3-9]\d{9}$/
    return regex.test(phone)
  }
  
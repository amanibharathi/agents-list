class LS {
  key = ''
  constructor(k: string) {
    this.key = k
  }
  set = (value: any, isFunction = false) => {
    if (isFunction) {
      value.action = value.action?.toString()
      localStorage.setItem(this.key, JSON.stringify(value))
    } else if (typeof value === 'function') {
      localStorage.setItem(this.key, 'function:' + value.toString())
    } else {
      localStorage.setItem(this.key, JSON.stringify(value))
    }
  }
  clear = () => {
    localStorage.removeItem(this.key)
  }
  get = () => {
    const val = localStorage?.getItem(this.key)

    if (val) {
      if (val?.startsWith('function:')) {
        const removeFunctionString = val.slice(9)
        const pausedFunc = eval('(' + removeFunctionString + ')')
        return pausedFunc
      } else {
        return JSON.parse(val)
      }
    } else {
      return null
    }
  }
  getFunction = () => {
    const val = localStorage?.getItem(this.key)
    if (val) {
      const parsedVal = JSON.parse(val)
      parsedVal.action = new Function('return ' + parsedVal.action)()
      // parsedVal.action = eval('(' + parsedVal.action + ')')
      return parsedVal
    }
  }
}

export const ls_previous_list_url = new LS('previous_list_url')
export const paused_action = new LS('paused_action')

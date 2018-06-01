function queryPresent(q) {
  return new RegExp(`[?&]${q}(&|$)`).test(window.location.search)
}

export default {
  install(Vue, options) {
    Vue.prototype.$flags = {
      payments: queryPresent('payments'),
      rules: queryPresent('rules')
    }
  }
}

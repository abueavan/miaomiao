import Vue from 'vue'
import MessageBox from './MessageBox'

export const messageBox = (() => {
  var defaults = {
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  }

  const MyComponent = Vue.extend(MessageBox)

  return (opts) => {
    for (let attr in opts) {
      defaults[attr] = opts[attr]
    }

    const vm = new MyComponent({
      el: document.createElement('div'),

      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },

      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this)
          document.body.removeChild(vm.$el)
        },

        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  }
})()

export default {
  props: {
    value: {type: String, require: true, default: ""},
    mode: {type: String, default: 'selector'},
    isError: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    label: {type: String},
    isFocus: {type: Boolean, default: false},
    placeholder: {type: String, default: ""},
  },
  computed: {
    VIEW_CLASS() {
      return (
        'zan-cell zan-field' +
        (this.isError ? ' zan-field--error' : '') +
        (this.mode === 'wrapped' ? ' zan-field--wrapped' : '')
      )
    }
  }
}

let Export = {}
let date = new Date()

Export.cookieSet = function (name, value, day) {
  day = day || 7
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day)
  window.document.cookie = name + '=' + value + ';path=/;expires=' + date.toGMTString()
}
Export.cookieGet = function (name) {
  let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
Export.cookieDel = function (name) {
  date.setTime(date.getTime() - 1)
  let val = this.cookieGet(name)
  if (val != null) {
    document.cookie = name + '=' + val + ';expires=' + date.toGMTString()
  }
}

export default Export

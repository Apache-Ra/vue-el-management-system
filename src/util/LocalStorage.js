/**
 * LocalStorage增删该查操作
 * @type {{}}
 */
let Export = {}

Export.getKey = function (key) {
  var val = localStorage.getItem(key)
  if (val) return JSON.parse(val)
  else return {}
}

Export.setKey = function (key, val) {
  if (val) localStorage.setItem(key, JSON.stringify(val));
}

Export.removeKey = function (key) {
  localStorage.removeItem(key)
}

Export.groupSet = function (gKey, key, val) {
  var obj = Export.getKey(gKey)
  if (!obj) {
    obj = {}
  }
  obj[key] = val
  Export.setKey(gKey, obj)
}

Export.groupGet = function (gKey, key) {
  var obj = Export.getKey(gKey)

  return (obj) ? obj[key] : ''
}

Export.groupRemove = function (gKey, key) {
  var obj = Export.getKey(gKey)
  if (obj && obj[key]) {
    delete obj[key]
    Export.setKey(gKey, obj)
  }
}

export default Export

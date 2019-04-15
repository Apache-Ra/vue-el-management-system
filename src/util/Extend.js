/**
 * description: 深拷贝
 * create_time: 2019-01-08
 * message: 不接受任何私下吐槽，请当面沟通协调
 */
export default function extend() {
  let length = arguments.length;
  let target = arguments[0] || {};
  if (typeof target != 'object' && typeof target != 'function') {
    target = {};
  }
  if (length == 1) {
    target = this;
  }
  for (let i = 1; i < length; i++) {
    let source = arguments[i];
    for(let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
  return target;
}



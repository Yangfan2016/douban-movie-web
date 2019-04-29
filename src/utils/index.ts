// serialize data  e.g. {a:"abc",b:"123"} -> "a=abc&b=123"
export function serialize(data: any, isTraditional: boolean = false): string {
  let arr = [];
  if (typeof data == "object") {
    for (let key in data) {
      if (data[key] != null) {
        let item = data[key];
        if (isTraditional && item instanceof Array) {
          arr.push(item.map(function (field) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(field);
          }).join("&"));
        } else {
          arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
        }
      }
    }
    return arr.join("&");
  }
  return '';
}
/**
* reverse serialize data  e.g. "a=abc&b=123" -> {"a":"abc","b":"123"}
* @param {string} str
* @param {boolean} isTraditional if true e.g. "a=abc&b=123&b=456" -> {"a":"abc","b":["123","456"]}
*/
export function reSerialize(str: string, isTraditional = true): object {
  let s = decodeURIComponent(str);

  return s.split("&").reduce(function (prev:any, cur) {
    let flag = cur.indexOf("=");
    let key = cur.slice(0, flag);
    let val = cur.slice(flag + 1);

    if (isTraditional) {
      if (prev[key]) {
        prev[key] instanceof Array ? prev[key].push(val) : prev[key] = [prev[key], val];
      } else {
        prev[key] = val;
      }
    } else {
      prev[key] = val;
    }

    return prev;
  }, {});
}

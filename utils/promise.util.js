/**
 * 将wx的callback形式的API转换成支持Promise的形式  
 */
const promisify = api => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      const extras = {
        success: resolve,
        fail: reject
      }
      api({ ...options, ...extras }, ...params)
    })
  }
};
module.exports = {
  promisify: promisify

}
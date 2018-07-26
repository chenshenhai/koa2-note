function jsonp(app, opts = {}) {
  let callback = opts.callback || 'callback';

  app.context.jsonp = function(obj = {}) {
    let ctx = this;
    if (Object.prototype.toString.call(obj).toLowerCase() === '[object object]') {
      let jsonpStr = `;${callback}(${JSON.stringify(obj)})`;

      // 用text/javascript，让请求支持跨域获取
      ctx.type = 'text/javascript';

      // 输出jsonp字符串
      ctx.body = jsonpStr;
    } else {
      ctx.throw(500, 'result most be a json');
    }
  };
}

module.exports = jsonp;

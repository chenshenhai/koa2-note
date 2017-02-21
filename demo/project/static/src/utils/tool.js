
let Global = window

const tools = {

  getUrlParam( name ) {
    if (typeof name === 'undefined') {
      return null
    }

    let paramReg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    let value = window.location.search.substr(1).match(paramReg)
    if (value != null) {
      return unescape(value[2])
    }

    return false
  },

  redirect( url ) {
    Global.location.href = url
  },

  loadJs(url, callback) {
    let _script = document.createElement('script')
    _script.src = url
    callback = callback || function(){}

    if(navigator.userAgent.indexOf("MSIE")>0){
      _script.onreadystatechange = function(){
        if('loaded' === this.readyState || 'complete' === this.readyState){
          callback()
          this.onload = this.onreadystatechange = null
          this.parentNode.removeChild(this)
        }
      }
    }else{
      _script.onload = function(){
        callback()
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
      }
    }

    document.getElementsByTagName('head')[0].appendChild(_script)
  }

}


export default tools

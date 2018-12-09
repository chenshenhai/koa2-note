import 'whatwg-fetch';

function fetchEvent( options ) {
  if ( !options ) {
    return;
  }
  let _url = options.url || '';
  let _type = options.type || 'GET';
  let _data = options.data || {};
  let _success;
  let _error;
  let fetchParams = {
    credentials: 'include',
  };
  if ( _type === 'GET' ) {
    let urlParams = [];
    for ( let key in _data ) {
      let _paramStr = '';
      if ( typeof _data[key] === 'object' ) {
        _paramStr = `${key}=${JSON.stringify(_data[key])}`;
      } else {
        _paramStr = `${key}=${_data[key]}`;
      }
      urlParams.push(_paramStr)
    }

    if ( _url.indexOf('?') >= 0 ) {
      _url = `${_url}&${urlParams.join('&')}`
    } else {
      _url = `${_url}?${urlParams.join('&')}`
    }
    fetchParams = {
      ...fetchParams,
      ...{
        headers: new Headers()
      }
    }
  } else {
    fetchParams = {
      credentials: 'include',
      method: _type,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(_data)
    }
    fetchParams = {
      ...fetchParams,
      ...{
        method: _type,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_data)
      }
    }
  }

  if ( typeof options.success === 'function' && typeof options.error === 'function' ) {
    _success = options.success;
    _error = options.error;
    window.fetch(_url, fetchParams)
    .then((response) => {
      return response.json();
    }).then( ( result ) => {
      _success( result )
    }).catch( ( err ) => {
      _error( err )
    })
  } else {
    // return window.fetch(_url, fetchParams)
    // .then((response) => {
    //   return response.json();
    // })

    return new Promise(( resolve, reject ) => {
      window.fetch(_url, fetchParams)
      .then((response) => {
        return response.json();
      }).then( ( result ) => {
        resolve( result )
      }).catch( ( err ) => {
        reject( err )
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
}

const request = {
  get( options ) {
    if ( typeof options !== 'object') {
      return;
    }
    options.type = 'GET';
    return fetchEvent( options );
  },


  post( options ) {
    if ( typeof options !== 'object') {
      return;
    }
    options.type = 'POST';
    return fetchEvent( options );
  },


  form( options ) {
    if ( typeof options !== 'object') {
      return;
    }
    let _url = options.url || '';
    let _data = options.data || {};
    let _form = document.createElement('form');
    _form.method = 'POST';
    _form.action = _url;
    for ( let key in _data ) {
      let _input = document.createElement('input');
      _input.type = 'hidden';
      _input.name = key;
      let _value = _data[key];
      if ( typeof _value === 'object') {
        _value = window.JSON.stringify(_value);
      }
      _input.value = _value;
      _form.appendChild( _input );
    }
    document.body.appendChild(_form);
    _form.submit();

  }

};

export default request;

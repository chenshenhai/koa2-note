const fs = require('fs')

function render( page ) {

  return new Promise(( resolve, reject ) => {

    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
  
}

module.exports = render



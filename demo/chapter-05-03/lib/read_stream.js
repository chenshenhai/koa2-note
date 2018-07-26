module.exports = readStream;

function readStream(req) {
  return new Promise((resolve, reject) => {
    try {
      streamEventListen(req, (data, err) => {
        if (data && !isError(err)) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function isError(err) {
  return Object.prototype.toString.call(err).toLowerCase() === '[object error]';
}

function streamEventListen(req, callback) {
  let stream = req.req || req;
  let chunk = [];
  let complete = false;

  // attach listeners
  stream.on('aborted', onAborted);
  stream.on('close', cleanup);
  stream.on('data', onData);
  stream.on('end', onEnd);
  stream.on('error', onEnd);

  function onAborted() {
    if (complete) {
      return;
    }
    callback(null, new Error('request body parse aborted'));
  }

  function cleanup() {
    stream.removeListener('aborted', onAborted);
    stream.removeListener('data', onData);
    stream.removeListener('end', onEnd);
    stream.removeListener('error', onEnd);
    stream.removeListener('close', cleanup);
  }

  function onData(data) {
    if (complete) {
      return;
    }
    if (data) {
      chunk.push(data.toString());
    }
  }

  function onEnd(err) {
    if (complete) {
      return;
    }

    if (isError(err)) {
      callback(null, err);
      return;
    }

    complete = true;
    let result = chunk.join('');
    chunk = [];
    callback(result, null);
  }
}

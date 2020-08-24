

export function request(cmd, data) {
  return new Promise((resolve, reject) => {
    const MockData = {
      'initApp': {
        type: 'success',
        message: '',
        data: {}
      }
    };
    var msg = MockData[cmd];

    setTimeout(() => {
      if(msg.type === 'success') {
        resolve(msg);
      } else {
        reject(msg);
      }
    }, 300);
  });
}

export function request2(cmd, data) {
  return new Promise((resolve, reject) => {
    const listener = msg => {
      chrome.runtime.onMessage.removeListener(listener);
      console.log(msg);
      if(msg.type === 'success') {
        resolve(msg);
      } else {
        reject(msg);
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    chrome.runtime.sendMessage({
      cmd,
      data
    });
  });
}

export function initApp() {
  return request('initApp');
}

export function signin(data) {
  return request('signin', data);
}

export function signout(data) {
  return request('signout', data);
}

export function saveInfo(data) {
  return request('saveInfo', data);
}

export function saveUnreachable(data) {
  return request('saveUnreachable', data);
}
import $ from 'jquery';

const DEFAULT_OPTION = {
  baseURL: '',
  timeout: 30000
};

export function request(option) {
  return new Promise((resolve, reject) => {
    option.url = DEFAULT_OPTION.baseURL + option.url;
    option.method = option.method || 'GET';
    option.dataType = option.dataType || 'json';
    option.timeout = DEFAULT_OPTION.timeout;

    $.ajax(option)
    .done(function(res) {
      console.log(res);
      resolve(res);
    })
    .fail(function(err) {
      reject(err);
    });
  });
}

// export function initApp() {
//   return checkVersion().then(res => )
// }

export function checkVersion() {
  return request({
    url: '/check_version'
  });
}

export function signin(data) {
  return request({
    method: 'post',
    url: '/query_login',
    data
  });
}

export function queryTask(data) {
  return request({
    url: '/linkedin_tools/query_task',
    data
  });
}

export function queryInfo(data) {
  return request({
    url: '/linkedin_tools/query_info',
    data
  });
}

export function saveInfo(data) {
  return request({
    method: 'post',
    url: '/linkedin_tools/save_data',
    data
  });
}

export function saveUnreachable(data) {
  return request({
    method: 'post',
    url: '/linkedin_tools/save_unreachable',
    data
  });
}
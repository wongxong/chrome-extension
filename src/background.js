import { 
  checkVersion 
} from './background-api/service';

const MessageListeners = [];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  MessageListeners.forEach(cb => {
    cb(sender.tab.id, msg);
  });
});

/**
 * 监听来自 content 的消息 
 */
function onMessage(cb) {
  cb && MessageListeners.push(cb);
}

function render_success(tabId, cmd, message, data) {
  chrome.tabs.sendMessage(tabId, {
    cmd,
    type: 'success',
    message,
    data
  });
}

function render_error(tabId, cmd, message, data) {
  chrome.tabs.sendMessage(tabId, {
    cmd,
    type: 'error',
    message,
    data
  });
}

onMessage(function(tabId, { cmd, data }) {
  if(cmd === 'initApp') {
    checkVersion()
    .then(res => {
      
    })
    .catch(err => {

    });
    render_success(tabId, cmd, 'init success.', {
      
    });
  }
});

onMessage(function(tabId, { cmd, data }) {
  if(cmd === 'signin') {

  }
});
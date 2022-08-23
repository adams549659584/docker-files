/**
 * 生成二维码
 * @param {string} text 需生成二维码的文本
 */
const initQRCode = (text = '') => {
  const qrcodeEle = document.querySelector('.qrcode');
  const qrcode = new QRCode(qrcodeEle, {
    text,
    width: 256,
    height: 256,
  });
  /**
   * @type {HTMLDivElement}
   */
  const qrcodeBgEle = document.querySelector('.qrcode-bg');
  qrcodeBgEle.style.cssText = 'display:block;';
};

/**
 * 复制文本
 * @param {string} text 要复制的文本内容
 * @returns
 */
const copyText = text => {
  try {
    const ele = document.createElement('textarea');
    ele.value = text;
    ele.setAttribute('readonly', '');
    ele.style.position = 'absolute';
    ele.style.left = '-9999px';
    document.body.appendChild(ele);
    const n = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0);
    ele.select();
    document.execCommand('copy');
    document.body.removeChild(ele);
    if (n) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(n);
      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

/**
 * 轻提示
 * @param {string} message 消息文字
 * @param {'success' | 'warning' | 'error' | 'loading'} type 消息类型
 * @param {number} duration 显示时间，单位为毫秒
 */
const toast = (message, type = 'success', duration = 1000 * 3) => {
  const toastEle = document.querySelector('.toast');
  toastEle.className = `toast toast--${type}`;
  const iconText = {
    success: '√',
    warning: '!',
    error: '×',
    loading: '~',
  };
  toastEle.querySelector('.toast__icon').innerHTML = iconText[type] || '';
  toastEle.querySelector('.toast__content').innerHTML = message;
  setTimeout(() => {
    toastEle.className = `toast`;
  }, duration);
};

const init = async () => {
  toast('努力读取配置中 ~~~', 'loading');
  const config = await fetch('./config/config.json')
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      toast('读取配置错误', 'error');
      return null;
    });
  if (!config) {
    return;
  }
  toast('读取配置成功');
  // iOS 不支持 零宽断言
  // const currentPort = location.href.match(/(?<=-)\d+(?=\.)/)?.toString();
  const currentPort = location.href
    .match(/-\d+\./)
    ?.toString()
    .replace('-', '')
    .replace('.', '');
  const serverClient = config.inbounds[0].settings.clients[0];
  const serverStreamSetting = config.inbounds[0].streamSettings;
  const clientConfig = {
    v: '2',
    ps: 'Docker Playground',
    add: location.host.replace(currentPort, config.inbounds[0].port),
    port: '80',
    id: serverClient.id,
    aid: serverClient.alterId,
    scy: 'auto',
    net: serverStreamSetting.network,
    type: serverStreamSetting.header?.type || 'none',
    host: serverStreamSetting.wsSettings.headers?.Host || '',
    path: serverStreamSetting.wsSettings.path || '',
    tls: '',
    sni: '',
    alpn: '',
  };
  const vmessLink = `vmess://${window.btoa(JSON.stringify(clientConfig))}`;
  /**
   * @type {HTMLDivElement}
   */
  const vmessLinkEle = document.querySelector('.vmess-link');
  vmessLinkEle.innerHTML = vmessLink;
  vmessLinkEle.style.cssText = 'display:block;';
  vmessLinkEle.onclick = function () {
    const isCopied = copyText(vmessLink);
    if (isCopied) {
      toast('已复制vmess链接');
    } else {
      toast('请手动选中后复制', 'warning');
    }
  };
  initQRCode(vmessLink);
};

init();

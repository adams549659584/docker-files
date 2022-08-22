const initQRCode = (text = '') => {
  const qrcodeEle = document.querySelector('.qrcode');
  const qrcode = new QRCode(qrcodeEle, {
    text,
    width: 256,
    height: 256,
  });
};

const copy = text => {
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

const init = async () => {
  const config = await fetch('./config/config.json')
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      alert('读取配置错误');
    });
  const currentPort = location.href.match(/(?<=-)\d+(?=\.)/)?.toString();
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
    type: 'none',
    host: '',
    path: serverStreamSetting.wsSettings.path,
    tls: '',
    sni: '',
    alpn: '',
  };
  const vmessLink = `vmess://${window.btoa(JSON.stringify(clientConfig))}`;
  const vmessLinkEle = document.querySelector('.vmess-link');
  vmessLinkEle.innerHTML = vmessLink;
  vmessLinkEle.onclick = function () {
    const isCopied = copy(vmessLink);
    if (isCopied) {
      alert('已复制vmess链接');
    } else {
      alert('请手动选中后复制');
    }
  };
  initQRCode(vmessLink);
};

init();

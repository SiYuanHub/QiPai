import axios from "axios";
import ConfigHelper from "./ConfigHelper";
function source ({ url, method, data, headers, service, onDownloadProgress, timeout }) {
  let defaultheaders = {
    'Content-Type': 'application/json',
    ...headers
  }
  //读取service路由
  console.log(service);
  let route = service ? ConfigHelper.get(['Services', service]) : ConfigHelper.get(['Services', "WebService"]);
  console.log(url,route);
  //如果输入了完成的接口地址就不做处理
  let url_checked = url.indexOf('http://') > -1 ? url : `${route}${url}`;
  console.log(url_checked);
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: url_checked,
      data,
      headers: defaultheaders,
      timeout: timeout ? timeout : 30000,
      // onUploadProgress (a){
      //     console.log(a)
      // },
      onDownloadProgress
    })
      .then((...res) => {
        // if (ErrorCodes.indexOf(res[0].data.ErrorCode) > -1) {
        //   window._unAuth = true;
        //   setTimeout(() => {
        //     if (window._unAuth) {
        //       window._unAuth = false;
        //       res[0].data.ErrorMsg && alert(res[0].data.ErrorMsg);
        //       window.name = window.location.href.toString();
        //       window.location.href = ConfigHelper.get(['LoginPage']);
        //     }
        //   }, 0)
        // }
        resolve(...res);
      })
      .catch((...res) => {

        if (res[0].response && res[0].response.status == 401) {
          window._unAuth = true;
          setTimeout(() => {

            if (window._unAuth) {
              window._unAuth = false;
              res[0].response.data.ErrorMsg && alert(res[0].response.data.ErrorMsg);
              window.name = window.location.href.toString();
              window.location.href = ConfigHelper.get(['LoginPage']);
            }
          }, 0)
        }
        reject(...res);
      })
  })
}
export default source;
<template>
  <div class="container">
    <div class="logo"><img src="../assets/images/logo.png" /></div>
    <div class="row">
      <div class="col-md-7 col-padding">
        <fieldset>
          <h3>Generate</h3>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 control-label text-left" for="ds_host">
              <span class="icon-zhanghao iconfont"></span>SKU</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" id="ds_host" type="text" placeholder="SKU" ref="sku" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username">
              <span class="icon-youxiang iconfont"></span>PrintEmailId</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" id="ds_username" type="text" placeholder="PrintEmailId" ref="PrintEmailId" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 control-label text-left" for="ds_username"></label>
            <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
              <button class="btn btn-default btn-primary" @click="step1">Genetare QR Code</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <h3>Scan QR Code</h3>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 control-label text-left">
              <span class="icon-shengchengerweimaxuanzhong iconfont"></span>OR code
            </label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <img id="qRCode" :src="codeSrc" class="img-responsive img-center" alt="qRcode">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_password"></label>
            <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
              <button class="btn btn-default btn-primary" @click="step2">Scan</button>
            </div>
          </div>
        </fieldset>
        <fieldset style="position:relative;">
          <h3>Binding</h3>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
              <span class="icon-shebeixinghao iconfont"></span>Printer Model Name</label>
            <div class="col-sm-6 col-xs-6 col-md-6">{{printerName}}</div>
          </div>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
              <span class="icon-tupian iconfont"></span>Printer Image
            </label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <img class="img-responsive img-center" alt="printer image" :src="printerImg">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-md-4 col-xs-4 text-left control-label" for="ds_username">
              <span class="icon-xuliehaoshangpin iconfont"></span>Sn</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" v-model="sn" type="text" placeholder="Readonly input here…" readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_username">
              <span class="icon-biaozhunhualiucheng1 iconfont"></span>Pid</label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <input class="form-control" v-model="pid" type="text" placeholder="Readonly input here… " readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_username">
              <span class="icon-youxiang iconfont"></span>Din</label>
            <div class="col-sm-4 col-xs-6 col-md-6">
              <input class="form-control" v-model="Din" type="text" placeholder="Readonly input here… " readonly/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_password"></label>
            <div class="col-sm-6  col-xs-6 col-md-6 bth-style">
              <button class="btn btn-default btn-primary" :disabled='!newBing' @click="step3">Binding</button>
            </div>
            <div class="alert alert-warning warning" v-show="isWarning">
              <a href="#" class="close" data-dismiss="alert">&times;</a>
              <strong>warning！</strong>This printer has been bound.
            </div>
          </div>
        </fieldset>
        <fieldset>
          <h3>File Settings</h3>
          <div class="form-group">
            <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
              <span class="icon-wenjian iconfont"></span>File Upload
            </label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <div class="file-container" style="display:inline-block;position:relative;overflow: hidden;vertical-align:middle;">
                <button class="btn fileinput-button" type="button" style="background: rgb(3, 138, 253);color:#fff;">Select file</button>
                <input type="file" id="jobData" @change="loadFile" style="position:absolute;top:0;left:0;font-size:34px; opacity:0">
              </div>
              <span id="filename" style="vertical-align: middle">{{filename}}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="disabledSelect " class="col-sm-4 col-xs-4 text-left col-md-4 control-label">
              <span class="icon-dayin_zhizhangshezhi iconfont"></span>Job Settings
            </label>
            <div class="col-sm-6 col-xs-6 col-md-6">
              <div class="file-container" style="display:inline-block;position:relative;overflow: hidden;vertical-align:middle;">
                <button class="btn fileinput-button" type="button" style="background: rgb(3, 138, 253);color:#fff;">Settings</button>
                <input type="file" id="jobData" @change="loadFile" style="position:absolute;top:0;left:0;font-size:34px; opacity:0">
              </div>
              <span style="vertical-align: middle">{{filename}}</span>
            </div>
          </div>
          <div class="form-group ">
            <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_password"></label>
            <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
              <button class="btn btn-default btn-primary" @click="step4">Upload&Submit</button>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-md-4 col-padding">
        <fieldset>
          <h3>Log</h3>
          <div class="form-group">
            <div class="col-sm-12 col-md-12">
              <div class="log" v-html="logMessage"></div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <h3>Notification</h3>
          <div class="form-group">
            <div class="col-sm-12 col-md-12">
              <div class="log" v-html="notification"></div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qRcode',
  data() {
    return {
      logMessage: '',//log日志
      sku: 'F5S46B',//输入的地址
      PrintEmailId: 'iaby762uch58@emailinbound-test3.itcs.hp.com',//打印机的email地址
      url: 'http://localhost:3000',//请求的地址
      printerId: '',//获取到的打印机的Id
      codeSrc: '',//二维码的图片路径
      errorMessage: '',
      printerImg: '',//打印机的图片
      printerName: '',//打印机的名字
      Din: '',//din的value值
      sn: '',//sn的value值
      pid: '',//pid的value值
      newBing: true,//是否为新绑定的
      isWarning: false,//是否出现警告框
      resultCode: null,//当是新绑定的时候的绑定的时候返回的结果
      filename: "未上传文件",//显示上传的是哪个文件
      notification: '',//上传日志
    }

  },
  methods: {
    step1: function() {//第一次生成图片二维码
      var vm = this;
      // vm.sku = vm.$refs.sku.value
      // vm.PrintEmailId = vm.$refs.PrintEmailId.value
      var json = JSON.stringify({
        "sku": vm.sku,
        "emailId": vm.PrintEmailId
      })
      if (vm.sku == '') {
        vm.errorMessage = "Please enter the correct sku"
        console.log(vm.errorMessage)
      } else if (vm.PrintEmailId == '') {
        vm.errorMessage = 'Please enter the correct PrintEmailId'
        console.log(vm.errorMessage)
      } else {
        vm.$http.post(vm.url + "/qrcode/generate", json, { emulateJSON: true }).then((data) => {
          vm.printerId = data.body.content.split("=")[1]
          vm.codeSrc = "data:image/png;base64," + data.body.data
          vm.logMessage += JSON.stringify(data.body)
        }, (err) => {
          console.log(err)
          vm.logMessage += err
        })
      }
    },
    step2: function() {//根据生成二维码获得的id去调用获取该printerid的相关信息
      var vm = this;
      vm.$http.get(vm.url + "/scanQRCodeRest/getSnAndPidByCloudPrintId/?printerId=" + vm.printerId).then((data) => {
        vm.logMessage += JSON.stringify(data.body)
        let Am = data.body
        vm.printerName = Am.model
        vm.printerImg = Am.printerLogoUrl
        vm.Din = Am.token.din;
        vm.sn = Am.snInfo.sn;
        vm.pid = Am.snInfo.pid;
        vm.newBing = Am.newBinding;
        vm.isWarning = !Am.newBinding
      }, (err) => { })

    },
    step3: function() {//当是新绑定的时候，调用这个函数返回结果为0
      if (newBing) {
        let vm = this;
        var json = JSON.stringify({
          "pid": vm.pid,
          "sn": vm.sn,
          "din": vm.Din
        });
        vm.$http.post(vm.url + "/bindPrinter/bind", json, { emulateJSON: true }).then((data) => {
          vm.resultCode = data.body.resultCode;
          vm.logMessage += JSON.stringify(data.body)
        }, (err) => {
          vm.logMessage += err
        })
      }
    },
    step4: function() {//当上传需要打印的文件上传好之后，将结果返回给后台时做的操作
      var vm = this;
      let str = "";
      var thead = setInterval(function() {
        vm.$http.post(vm.url + "/test", JSON.stringify({ time: 10 * 1000 }), { emulateJSON: true }).then((data) => {
          if (data.body.test == 1) {
            vm.notification += str;
            console.log(data.body.test)
            clearInterval(thead)
            return false
          }
          str = '<p><span>' + new Date() + ':&npsb</span>' + data.body.data + '<span>' + data.body.test + '</span></p>'
          vm.notification += str;
          console.log(data.body.test)
        })
      }, 1000)
    },
    loadFile: function(e) {
      this.filename = e.target.files[0].name;
    }
  }
}
</script>

<style scoped>
.form-group {
  margin: 10px 0;
  overflow: hidden;
}

h3 {
  padding-left: 3%;
  margin-bottom: 24px;
  color: rgb(51, 122, 183);
}

.bth-style {
  margin: 10px 0;
}

.img-center {
  margin: 0 auto;
}

.warning {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 55px;
}
</style>




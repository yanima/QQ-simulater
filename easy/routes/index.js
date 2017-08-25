var express = require('express');
var router = express.Router();
/* ===========================page路由=========================== */


var list = {};
var Id = ''
var n = 0;
var test = 0;
var setInterval;
router.get('/scanQRCode/getSnAndPidByPinterId/*', function(req, res, next) {
    list = {
        "sn": "de0c1ccd662b4da5",
        "pid": "1700001671"
    }
    Id = "71AD306D9F0544F088FCE36A2385E0A6";
    printer(req, res, list, Id)
});

router.get('/scanQRCodeRest/getSnAndPidByCloudPrintId/*', function(req, res, next) {
    list = {
        "snInfo": {
            "id": 1,
            "sn": "b854d1f8a991440a",
            "pid": "1700001671",
            "tokenId": 1,
            "eccSignature": "30460221008FCC9DA2427BDE6EC38F3FE365D87B2527770C555C2C464FEA4C90B9EF3300B1022100D117D60FDE5904F876D52B20EA40C12242CD49B7E7F5EA2A6B3C59A36AACCA49",
            "createTime": 1503304337000,
            "lastUpdateTime": 1503304337000
        },
        "newBinding": false,
        "token": {
            "id": 1,
            "din": "simulator_150330433548609749",
            "token": "2312ee2d770d41cb94acb7af0171a6d9",
            "refreshToken": "6d1bed62fac24a71a3c030c4ecdb59e4"
        },
        "model": "HP DeskJet 3630",
        "printerLogoUrl": "http://s3-ap-southeast-1.amazonaws.com/printer-logo/shaolin.jpg"
    }
    Id = "71AD306D9F0544F088FCE36A2385E0A6"
    printer(req, res, list, Id)
})
router.post('/qrcode/generate', function(req, res, next) {
    list = {
        "url": "https://cloud-print-qrcode-sgp.s3-ap-southeast-1.amazonaws.com/1700001671/71ad306d9f0544f088fce36a2385e0a6.png",
        "content": "undefined/get?printerId=71AD306D9F0544F088FCE36A2385E0A6",
        "data": "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"
    }
    if (req.body) {
        //能正确解析 json 格式的post参数
        res.json(list);
    } else {
        // 不能正确解析json 格式的post参数
        var body = '',
            jsonStr;
        req.on('data', function(chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function() {
            //读取参数流结束后将转化的body字符串解析成 JSON 格式
            try {
                jsonStr = JSON.parse(body);
            } catch (err) {
                jsonStr = null;
            }
            jsonStr ? res.json(list) : res.json({ "status": "error" });
        });
        console.log('输入框不能为空')
    }

})
router.post('/bindPrinter/bind', function(req, res, next) {
    list = {
        "resultCode": 0
    }
    res.json(list);
})
router.post('/test', function(req, res, next) {
    // res.setTimeout(function() { //请求超时设置
    //     res.send("请求超时")
    //     console.log(1111)
    // }, req.body.time);

    if (test == 0) {
        n++;
        res.json({ data: "我是数据", test: 0 })
        if (n > 19) {
            test = 1
        }
    } else {
        test = 0;
        n = 0;
        res.json({ data: "我结束传送了", test: 1 })
    }
})

function printer(req, res, list, Id) {
    var printerId = req.query.printerId;
    if (printerId) {
        if (printerId == Id) {
            res.json(list)
        } else {
            res.json("printerId输入错误")
        }
    } else {
        res.json("未输入printerId")
    }
}
module.exports = router;
$("#genetareQRCode ").click(function() {
    var sku = $("#sku ").val();
    var emailId = $("#printEmailId ").val();

    if (sku == null || sku == " " || sku == undefined) {
        alert("请输入sku ");
        return false;
    }
    if (emailId == null || emailId == " " || emailId == undefined) {
        alert("请输入emailId ");
        return false;
    }

    $.ajax({
        method: "GET ",
        url: 'http://192.168.54.31:8088/scanQRCode/getSnAndPidByPinterId?printerId=02F5932E339D45C0A45C88F39AB147BC',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a ":"2 ","b ":"3 "}
        //data: {"sku ": "F5S46B ","emailId ": "iaby762uch58@emailinbound-test3.itcs.hp.com "},
        // data: JSON.stringify({
        //     sku: sku,
        //     emailId: emailId
        // }),

        contentType: "application/json; charset=utf-8 ",
        dataType: "json ",
        success: function(data) {
            $("#qRCode ").attr("src ", data.url); //ajax调用后台服务成功后赋值
            $("#log ").text("call service successfully! "); //日志
            console.log(data)
        },
        error: function(e) {
            debugger;
            $("#log ").text(e.responseText); //日志
            alert("调用服务失败! ");
        }

    });
});

$("#scan ").click(function() {
    debugger;
    $.ajax({
        method: "GET",
        url: 'http://localhost:5000/qrcode/gen',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a ":"2 ","b ":"3 "}
        //data: {"sku ": "F5S46B ","emailId ": "iaby762uch58@emailinbound-test3.itcs.hp.com "},
        data: JSON.stringify({
            url: "https://cloud-print-qrcode-sgp.s3-ap-southeast-1.amazonaws.com/1700001671/cfd48b309abd44ae895a39bdf4fc4b51.png"
        }),

        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function(data) {
            debugger;
            $("#log").text("call service successfully!"); //日志
            $("#din").val(data); //
        },
        error: function(e) {
            $("#log").text(e.responseText); //日志
            alert("调用服务失败!");
        }

    });
});
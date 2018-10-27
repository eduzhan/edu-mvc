$(document).ready(function () {

    // commit consulting
    $(".submitForm").click(function (e) {
        commitEvaluation();
    });
});

// 提交数据
function commitEvaluation() {

    var firstChoiceCountry = $("input[name='firstChoiceCountry']:checked").val();
    var planDegree = $("input[name='planDegree']:checked").val();
    var firstChoiceMajor = $("#firstChoiceMajor").val().replace(/\s/g, "");
    var timeAbroad = $("input[name='timeAbroad']:checked").val();
    var graduateSchool = $("#graduateSchool").val().replace(/\s/g, "");
    var schoolType = $("#schoolType").val().replace(/\s/g, "");
    var currentGrade = $(".select").find("option:selected").text();
    var cityArea = $('.inseachcity1').text();

    var sat = $("#sat").val();
    var ssat = $("#ssat").val();
    var tofel = $("#tofel").val();
    var ieits = $("#ieits").val();
    var ger = $("#ger").val();
    var gmat = $("#gmat").val();

    var chName = $("#chName").val().replace(/\s/g, "");
    var mobPhone = $("#mobPhone").val().replace(/\s/g, "");
    var email = $("#email").val().replace(/\s/g, "");
    var sex = $("input[name='sex']:checked").val();
    if (undefined == sex) {
        sex = "";
    }
    console.log("firstChoiceMajor:"+firstChoiceMajor + "-timeAbroad:" + timeAbroad+"-graduateSchool:"+graduateSchool+"-schoolType:"+schoolType+"-currentGrade:"+currentGrade+"-planDegree:"+planDegree);

    if (firstChoiceCountry == undefined) {
        alert("请选择首选留学国家！");
        return;
    }
    if (planDegree == undefined) {
        alert("请选择计划攻读学位！");
        return;
    }
    if (chName.length > 10) {
        alert("您输入的名字太长了！");
        return;
    }
    if ("" == cityArea) {
        alert("请选择所在地区！");
        return;
    }

    var APP_ID = '2sEEFCDWhQvQRiFu7lJNm9EO-gzGzoHsz';
    var APP_KEY = 'nM6fAYBp1f2OanAv5eFQMzy7';
    AV.init({appId: APP_ID, appKey: APP_KEY});

    var Forms = AV.Object.extend("StudyApplyEvaluation");
    var formObject = new Forms();

    formObject.save({
        chName: chName,
        mobPhone: mobPhone,
        email: email,
        sex: sex,
        cityArea: cityArea,
        firstChoiceCountry: firstChoiceCountry,
        planDegree: planDegree,
        firstChoiceMajor: firstChoiceMajor,
        timeAbroad: timeAbroad,
        graduateSchool: graduateSchool,
        schoolType: schoolType,
        currentGrade: currentGrade,
        scoreSAT: sat,
        scoreSSAT: ssat,
        scoreTOFEL: tofel,
        scoreIELTS: ieits,
        scoreGRE: ger,
        scoreGMAT: gmat
    }).then(function (object) {
        alert('提交成功!');
        window.fillFormUrl = window.location.protocol + window.location.pathname;
        window.location.href = fillFormUrl.replace('fillForm', 'appointment');
    });
    console.log("结束提交数据...");
}



$(document).ready(function(){
	// 获取当前url	
	var search = window.location.search
	window.id = search.substring(search.lastIndexOf('?')+1, search.length);
	console.log(id);	
	getDetail(id);
	
	// commit consulting
	$("#agency_form_right_button").click(function(e){
		var username = $("#right_username").val().replace(/\s/g,"");
		var phone = $("#right_phone").val().replace(/\s/g,"");
		var email = $("#right_email").val().replace(/\s/g,"");
		var agencyname = $("#right_agencyname").val().replace(/\s/g,"");
		commitConsulting(username,phone,email,agencyname);
	});
}); 

// load data to listjson
function loadDetail(length,_list){
	var t_m = "";
	var t_m_list='';
	for (var i = 0; i < length; i++){
		// console.log(_list[i]);
		var starNumHtml='';
		for (var j=0;j<_list[i].starOn;j++) {
			starNumHtml+= '<img src="http://staticresource.liuxue315.cn/images/star-on.png">';
		}
		if (_list[i].starHalf > 0){
			starNumHtml+= '<img src="http://staticresource.liuxue315.cn/images/star-half.png">';
		}
		
		var companyNameArr = _list[i].companyName.split("（");
		var companyName = companyNameArr[0];
		var shortCompanyName = companyNameArr[1].split("）")[0];
		
		$(".stars").empty().append(starNumHtml);
		$("#generalScore").empty().append(_list[i].generalScore);
		$("#companyName").empty().append(companyName);
		$("#imgUrl").attr('src',_list[i].imgUrl);
		$("#certificateNO").empty().append(_list[i].certificateNO);
		$("#shortCompanyName").empty().append(shortCompanyName); // ...
		$("#serviceArea").empty().append(_list[i].serviceArea);
		
		$("#serviceItem").empty().append(_list[i].serviceItem);
		$("#agencyCountry").empty().append(_list[i].agencyCountry);
		$("#serviceArea").empty().append(_list[i].serviceArea);		

		var companySituationHtml = ""!=_list[i].companySituation?_list[i].companySituation:"机构信息录入中...";
		var consultantTeamHtml = ""!=_list[i].consultantTeam?_list[i].consultantTeam:"信息录入中...";
		var honorShowHtml = ""!=_list[i].honorShow?_list[i].honorShow:"信息录入中...";
		$("#companySituation").empty().append(companySituationHtml);
		$("#consultantTeam").empty().append(consultantTeamHtml);
		$("#successfulCase").empty().append('<table border="" cellspacing="0" cellpadding="0"><tbody>'+_list[i].successfulCase+'</tbody></table>');
		$("#honorShow").empty().append(honorShowHtml);

	}
}

// 筛选
function getDetail(id){
	var filterarray = $.grep(listjson,function(obj){
		return obj.detailUri==id;
	});

	for (var i = 0; i < filterarray.length; i++){
		console.log(filterarray[i]);
	}  
	loadDetail(1,filterarray);
}

// 提交数据
function commitConsulting(name,phone,email,cooperate){
	
	if(name.length> 10){
		alert("您输入的名字太长了！");  
        return; 
	}
	if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        alert("请输入正确的手机号码！");  
        return; 
    } 
	if( email=="" || ( email!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(email) ) ){
		alert("请输入正确的E-Mail地址");
		return;
	}
	
	console.log("开始提交数据...");
	var APP_ID = '2sEEFCDWhQvQRiFu7lJNm9EO-gzGzoHsz';
	var APP_KEY = 'nM6fAYBp1f2OanAv5eFQMzy7';
	AV.init({appId: APP_ID,appKey: APP_KEY});
	
	var Forms = AV.Object.extend("StudyConsulting");
	var formObject = new Forms();
	
	//var name="您的姓名";
	//var phone="您的手机";
	//var email="您的邮箱123@qq.com";
	//var cooperate="机构名称";
	formObject.save({
		type:1,
		name:name,
		phone:phone,
		email:email,
		cooperate:cooperate
	}).then(function(object) {
		alert('保存成功!');
		window.detailUrl = window.location.protocol + window.location.pathname;
		window.location.href=detailUrl.replace('detail','appointment');
	});
	console.log("结束提交数据...");
}



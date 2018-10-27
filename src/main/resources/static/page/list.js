$(document).ready(function(){ 

	// get current uri 
	window.listUrl = window.location.protocol + window.location.pathname;
	window.detailUrl = listUrl.replace('list','detail');
	
	var search = window.location.search;
	
	window.city=GetQueryString("city");
	window.type=GetQueryString("type");
	window.country=GetQueryString("country");
	
	listjson = fucsearch();
	
	window.curpage=1;
	if(null != GetQueryString("page")){
		window.curpage = GetQueryString("page");
	}
	
	var length = listjson.length;
	window.initPage = (curpage -1) * 5; 
	window.limitPage = curpage * 5 > length ? length : curpage * 5;
	
	window.nextPage = curpage*1+1;
	window.frontPage = curpage*1-1;
	window.pagenum = parseInt((listjson.length-1)/5) + 1;
	
	console.log("load.params ="+initPage+","+limitPage+","+listjson.length);
	// $(".T-m-list").empty();
	load(initPage,limitPage,listjson);
	
	// commit consulting
	$("#agency_form_right_button").click(function(e){
		var username = $("#right_username").val().replace(/\s/g,"");
		var phone = $("#right_phone").val().replace(/\s/g,"");
		var email = $("#right_email").val().replace(/\s/g,"");
		var agencyname = $("#right_agencyname").val().replace(/\s/g,"");
		commitConsulting(username,phone,email,agencyname);
	});
	
	$('.show_more').click(function(){
		$(this).siblings('.show_box').toggle();
	})

}); 

// load data to listjson
function load(initPage,limitPage,_list){
	// var length = length > _list.length ? _list.length : length;

	var t_m = "<div class='' id='searchs'> <ul class='T-m-reveal'>";
	var t_m_list='';
	var frontPageHtml='';
	for (var i = initPage; i < limitPage; i++){
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

		var serviceItemHtml='';
		if (_list[i].serviceItem.indexOf("待补充") >= 0){
			t_m_list.replace('$serviceItem',_list[i].serviceItem);
		}else{
			serviceItemHtml = '<dl class="c"><dt>提供服务：</dt><dd>'+ _list[i].serviceItem +'</dd></dl>';
		}
		var bestSubjectHtml='';
		if (_list[i].serviceItem.indexOf("待补充") >= 0){

		}else{
			bestSubjectHtml = '<dl class="c"><dt>擅长学科：</dt><dd>'+ _list[i].bestSubject +'</dd></dl>';
		}
		
		t_m_list = t_m_list + list_t.replace('$detailUri',detailUrl+"?"+_list[i].detailUri)
						 .replace('$detailUri',detailUrl+"?"+_list[i].detailUri)
						 .replace('$shortCompanyName',shortCompanyName).replace('$companyName',companyName)
						 .replace('$imgUrl',''+_list[i].imgUrl).replace('$generalScore',''+_list[i].generalScore)
						 .replace('$certificateNO',''+_list[i].certificateNO).replace('$foundingDate',''+_list[i].foundingDate)
						 .replace('$agencyCountry',_list[i].agencyCountry).replace('$serviceArea',_list[i].serviceArea)
						 .replace('$serviceItem',serviceItemHtml).replace('$bestSubject',bestSubjectHtml)
						 .replace('$starNumHtml',starNumHtml);

	}
	
		// Pagination number href
		var search_url = "";
		if(null!=window.type) {
			search_url = search_url+"&type="+window.type; 
		}
		if(null!=window.city) {
			search_url = search_url+"&city="+window.city; 
		}
		if(null!=window.country) {
			search_url = search_url+"&country="+window.country; 
		}
		if (curpage < 3){
			for(var p=2;p<(pagenum<6?pagenum:6);p++){
				frontPageHtml = frontPageHtml+  '<a id="pagination_'+p+'" href="'+listUrl+'?page='+p+ search_url +'">'+p+'</a>';
			}
		} else if (curpage*1==pagenum*1){
			
			for(var p=(pagenum-4>1?pagenum-4:2);p<pagenum;p++){
				frontPageHtml = frontPageHtml+  '<a id="pagination_'+p+'" href="'+listUrl+'?page='+p+search_url+'">'+p+'</a>';
			}
		} else if (curpage > 2){
			
			for(var p=curpage-2;p<curpage*1+3;p++){
				frontPageHtml = frontPageHtml+  '<a id="pagination_'+p+'" href="'+listUrl+'?page='+p+search_url+'">'+p+'</a>';
			}
		}
	// console.log("frontPageHtml-"+frontPageHtml);
	
	var pageHtml = list_p.replace('$nextPage',listUrl+'?page='+nextPage+search_url)
						 .replace('$lastPage',listUrl+'?page='+pagenum+search_url)
						 .replace('$frontPageHtml',frontPageHtml)
						 .replace('$homePage',listUrl+'?page=1'+search_url)
						 .replace('$pagenum',pagenum);
	// console.log("pageHtml-"+pageHtml);
	
	t_m = t_m + t_m_list + "</ul></div>" + pageHtml;
	$(".T-m-list").empty().append(t_m);
	
	$("#pagination_"+curpage).addClass("hover");
	
	if (nextPage > pagenum){
		$("#nextPage").hide();
	}
	if (frontPage > curpage){
		//$("#nextPage").hide();
	}
	
	// search type
	var _url = listUrl+"?page="+curpage;
	if(null!=window.country) {
		_url = _url+"&country="+window.country; 
	}
	if(null!=window.city) {
		_url = _url+"&city="+window.city; 
	}
	
	var s_agencytype_html = '<a href="'+_url+'" class="Unlimited hover">不限</a><a href="'+_url+'&type=1">留学机构</a><a href="'+_url+'&type=2">留学工作室</a>'; 
	$("#s_agencytype").empty().append(s_agencytype_html);
	
	// search-city
	var _url2 = listUrl+"?page="+curpage;
	if(null!=window.type) {
		_url2 = _url2+'&type='+window.type; 
	}
	if(null!=window.country) {
		_url2 = _url2+'&country='+window.country; 
	}
	var s_area_html='<a href="'+_url2+'" class="Unlimited hover">不限</a>';
	for(var n=0;n<s_service.length;n++){
		s_area_html=s_area_html+ '<a href="'+_url2+'&city='+s_service[n]+'">'+s_service[n]+'</a>';
	}
	s_area_html=s_area_html+'<button type="button" class="show_more" onclick="showMore()">更多&gt;&gt;</button><div class="show_box">';
	var areaarr = s_service_more.split(",");
	for(var n=0;n<areaarr.length;n++){
		s_area_html=s_area_html+ '<a href="'+_url2+'&city='+areaarr[n]+'">'+areaarr[n]+'</a>';
	}
	s_area_html = s_area_html + '</div>'; 	
	$("#s_servicearea").empty().append(s_area_html);
	
	// search-contry
	var _url3 = listUrl+"?page="+curpage;
	if(null!=window.type) {
		_url3 = _url3+'&type='+window.type; 
	}
	if(null!=window.city) {
		_url3 = _url3+'&city='+window.city; 
	}
	var s_country_html='<a href="'+_url3+'" class="Unlimited hover">不限</a>';
	for(var n=0;n<s_agency.length;n++){
		s_country_html=s_country_html+ '<a href="'+_url3+'&country='+s_agency[n]+'">'+s_agency[n]+'</a>';
	}
	s_country_html=s_country_html+'<button type="button" class="show_more" onclick="showMore()">更多&gt;&gt;</button><div class="show_box">';
	var country_arr = s_agency_more.split(",");
	for(var n=0;n<country_arr.length;n++){
		s_country_html=s_country_html+ '<a href="'+_url3+'&country='+country_arr[n]+'">'+country_arr[n]+'</a>';
	}
	s_country_html = s_country_html + '</div>';
	$("#s_agencycontry").empty().append(s_country_html);
}
// 提交数据
function changeOrder(type){

	$("#a-sort").removeClass("hover");
	$("#a-level").removeClass("hover");
	$("#a-score").removeClass("hover");
	
	if (type=="sort") {	// 综合
		$("#a-sort").addClass("hover");
		listjson.sort(function(a,b){
			// return (b.starNum+b.generalScore) - (a.starNum+a.generalScore);
			return (Number(b.starNum)+ Number(b.generalScore)) - (Number(a.starNum) + Number(a.generalScore));
		});
		
		load(initPage,limitPage,listjson);
	} else
	if (type=="level") { // 好评度
		$("#a-level").addClass("hover");
		listjson.sort(function(a,b){
			return b.starNum - a.starNum;
		});
		
		load(initPage,limitPage,listjson);
		
	} else
	if (type=="score") { // 综合得分
		$("#a-score").addClass("hover");
		listjson.sort(function(a,b){
			return b.generalScore - a.generalScore;
		});

		load(initPage,limitPage,listjson);
	}
	
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
		window.location.href=listUrl.replace('list','appointment');
	});
}

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r2="list.html?city=12&country=23".match(reg);
	 
	 var searchs = decodeURI(window.location.search.substr(1));
	 
     var r = searchs.match(reg);
	 
     if(r!=null)
		 return r[2];
		 //return unescape(r[2]); 
	 return null;
}


// 筛选
function fucsearch(){
	console.log("---筛选---");
	
	var s_jg=window.type; // type 1:留学机构 ，2：留学工作室
	var s_service=window.city==null?"":window.city; // 服务地区
	var s_agency=window.country==null?"":window.country;  // 代理国家
	
	console.log("s_jg="+s_jg + ",s_service=" + s_service+",s_agency="+s_agency);
	
	if (null==s_jg && ""==s_service && ""==s_agency) {
		return listjson;
	}

	var filterarray = $.grep(listjson,function(obj){
		// console.log(obj.type + "--" + obj.serviceArea);
		var a=true,b=true,c=true;
		if (null == s_jg) {
			a = true;
		}else{
			a = obj.type==s_jg ? true:false;
		}
		
		b = obj.serviceArea.indexOf(s_service) >= 0 ?true:false;
		c = obj.agencyCountry.indexOf(s_agency) >= 0 ?true:false;
		//console.log(a + "--" + b + "--" + c);
		return a && b && c;//筛选出大于5的 
	});
	
	return filterarray;
}

function showMore(){}


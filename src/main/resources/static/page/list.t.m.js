var list_t= '<div class="" id="searchs"><ul class="T-m-reveal"><li class="T-m-r-logo">'
             +'<h1><a href="$detailUri"><img src="$imgUrl" title="$shortCompanyName"></a></h1>'
			 +'</li>'
			+'<li class="T-m-r-cont">'
			+'<h1 class="c"><a href="$detailUri">$companyName</a>'
			+'</h1>'
			+'<p>好评度：$starNumHtml'
			+'<span class="ml15 pl10">综合得分：<span class="T-red">$generalScore</span></span></p>'
			+'<dl class="c"><dt>成立时间：</dt><dd>$foundingDate</dd></dl><dl class="c"><dt>办理国家：</dt><dd>$agencyCountry</dd></dl>'
			+'<dl class="c"><dt>分之结构：</dt><dd>$serviceArea</dd></dl>'
            +'$serviceItem'
            +'$bestSubject'
			+'</li></ul></div>';
			
var list_p ='<div class="T-pages T-f-tenter" style="width: auto;margin: 25px 0px 0 150px;">'
			+'<div class="T-pages-f c">'
			+'<a href="$homePage" id="pagination_1">首页</a>'
			+'$frontPageHtml'
			+'<span>...</span><a id="nextPage" href="$nextPage">下一页</a><a href="$lastPage">末页</a>'
			+'<li><a href="javascript:void(0)">共$pagenum页</a></li>'
			+'</div></div>'
			;
var s_type_arr="";
var s_service=["北京","上海","广州","深圳","重庆","武汉","长沙"];
var s_service_more="哈尔滨,沈阳,大连,长春,郑州,佛山,成都,南京,杭州,青岛,济南,西安,天津,宁波,石家庄,福州,南昌,厦门,珠海,昆明,呼和浩特,乌鲁木齐,太原,兰州,南宁,合肥,贵阳,苏州,南通,吉林,泰安,鞍山,温州,抚顺,临沂,无锡,烟台,常州,金华,泉州,唐山,北京,国贸,洛阳,宜昌,北京,海淀,淄博,东京,福冈,汉口,武昌,义乌,宜宾,绵阳,海口";

var s_agency = ["美国","英国","广澳大利亚州","加拿大","法国","德国","日本"];
var s_agency_more="新加坡,爱尔兰,韩国,荷兰,新西兰,意大利,澳洲,阿根廷,波兰,西班牙,瑞典,马来西亚,挪威,芬兰,丹麦,冰岛,台湾,其他,俄罗斯,瑞士,乌克兰,香港,澳门";
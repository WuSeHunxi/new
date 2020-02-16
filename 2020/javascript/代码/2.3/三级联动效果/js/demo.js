(function () {
    var provinceNode = document.getElementById('province');
    var cityNode = document.getElementById('city');
    var schoolNode = document.getElementById('school');
    var len = province.length;
    var provinceStr = '';
    for (var i = 0; i < len; i++) {
        provinceStr += '<option value=>' + province[i][0] + '>' + province[i][1] + '</option>';
    }
    provinceNode.innerHTML = provinceStr;

    var cityArr = city[provinceNode.value];
    var cityStr = '';
    for (var i = 0; i < cityArr.length; i++) {
        cityStr += '<option value=' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>';
    }
    //最后一组数据是其他
    cityStr += '<option>其他</option>';
    cityNode.innerHTML = cityStr;

    var schoolArr = allschool[cityNode.value];
    var schoolStr = '';
    for (var i = 0; i < schoolArr.length; i++) {
        schoolStr += '<optio>' + schoolArr[i][2] + '</option>';
    }
    schoolStr += '<option>其他</option>';
    schoolNode.innerHTML = schoolStr;


    //点击省份时城市和学校都会发生改变，即：三级联动
    //修改省份，城市随之变化
    provinceNode.onchange = function () {
        //获取的是当前选择的省份的城市
        var cityArr = city[provinceNode.value];
        var cityStr = '';
        for (var i = 0; i < cityArr.length; i++) {
            cityStr += '<option value=' + cityArr[i][0] + '>' + cityArr[i][1] + '</option>';
        }
        cityStr += '<option>其他</option>';
        cityNode.innerHTML = cityStr;

        //城市修改，省份也随之变化
        var schoolArr = allschool[cityNode.value];
        var schoolStr = '';
        for (var i = 0; i < schoolArr.length; i++) {
            schoolStr += '<option>' + schoolArr[i][2] + '</option>';
        }
        schoolNode.innerHTML = schoolStr;
    }

    //修改默认学校
    cityNode.onchange = function () {
        var schoolArr = allschool[cityNode.value];
        if (schoolArr) {
            //因为要修改学校就要把之前的置为空
            var schoolStr = '';
            for (var i = 0; i < schoolArr.length; i++) {
                schoolStr += '<option>' + schoolArr[i][2] + '</option>';
            }
            schoolNode.innerHTML = schoolStr;
        } else {
            schoolNode.innerHTML = '<option>其他</option>'
        }
    }
}())
import { getCities } from "@/util/areaService"
import qs from "query-string"
import $ from "jquery"

//qs.parse()将URL解析成对象的形式
const parsed = qs.parse(location.search);

$(".title").text(parsed.name)
const dl = $("dl");

getCities(parsed.id).then(cs => {
    for (const c of cs) {
        $("<dd>").text(c.simpleName).appendTo(dl)
    }
})
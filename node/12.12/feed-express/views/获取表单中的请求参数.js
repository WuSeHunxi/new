/**
 * 在Express中获取表单Get请求参数：
 *          request.query
 * 在Express中获取表单Post请求参数
 *          先安装npm install --save body-parser
 *          导包
 *          配置body-parser：
 *              app.use(bodyParser.urlencoded({
                    extended: false
                }))
                app.use(bodyParser.json());
            使用：
                app.use(function(req,res){
                    res.setHeader('Content-Type),'tetx/plain;
                    res.write('you posted:\n');
                    res.end(JSON.stringify(req.body,null,2));
                })
 * 
 */
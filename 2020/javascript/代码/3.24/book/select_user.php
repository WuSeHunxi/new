<head>
    <meta charset="UTF-8">
    <title>管理员页面</title>
</head>
<body>
<table  width="1400" height="80" align="center">
    <tr>
        
        <td bgcolor="#deb887" align="center"><h2><b>书航管理员，欢迎您</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;书航管理员您好！</h2>
<hr>
<body>
<hr>
<h3 align="center">用户信息管理</h3>
</body>
<form action="" method="get">
    <table  align="center" border="0">
        <tr>
            <td><input type="button" name='select'onclick="window.location.href='select_user.php'" value="查看用户信息"></td>
            <td><input type="button" name='delete'onclick="window.location.href='delete_user.php'" value="删除用户信息"></td>
			<td><input type="button" name='delete'onclick="window.location.href='superUser.php'" value="返回"></td>
        </tr>
    </table>
</form>
<?php
$conn = mysqli_connect('localhost', 'root', '1234567', 'test');
if ($conn->connect_error){
    echo '数据库连接失败！';
    exit(0);
}
mysqli_select_db($conn,'user');
$sql="select * from user";
$result=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($result)){
    $username=$row['username'];
    $password=$row['password'];
    $tell=$row['tell'];
    $user_class=$row['user_class'];
    echo "<table align='center' border='1' width='900'><tr>
              <td>
                <p>用户名：$username</p>
                <p>密码：$password</p>
                <p>电话：$tell</p>
                <p>用户类型：$user_class</p>
              </td>
              </tr></table>";
}
mysqli_free_result($result);
mysqli_close($conn);
?>
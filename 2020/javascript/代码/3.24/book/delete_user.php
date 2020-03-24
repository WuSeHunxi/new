<head>
    <meta charset="UTF-8">
    <title>管理员页面</title>
</head>
<body>
<table  width="1400" height="80" align="center">
    <tr>
        <td bgcolor="#abc666" align="center"><h2><b>书航管理员，欢迎您</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;书航管理员您好！</h2>
<hr>

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
?>
<html>
<body>
<form action="#" method="get">
    <table align="center"  width="900" >
        <tr><td>
                <select name="befor">
                    <option value=0>--请选择您要删除的用户--</option>
                    <?php
                    $sql= "select * from user ";//sql语句
                    $result = mysqli_query($conn, $sql);//执行sql语句
                    while($row = mysqli_fetch_array($result))
                    {
                        if($row['user_class']=='1' or $row['user_class']=='2'){
                            echo "<option value='$row[username]'>$row[username]</option>";//循环，拼凑下拉框选项
                        }
                    }
                    ?>
        </tr>
        <tr><td colspan="2" align="right"><input type="submit" name="queren" value="确认删除"></td></tr>
    </table>
</form>
</body>
</html>
<?php
if(!empty($_GET['queren'])){
    $name=$_GET['befor'];
    //echo $name;
    $sql="delete from user where username='{$name}'";
    mysqli_query($conn,$sql);
    $result=mysqli_query($conn,$sql);
    if (!$result) {
        printf("Error: %s", mysqli_error($conn));
        exit();
    }
    else{
        echo '<script>alert("删除成功！");</script>';
    }
}
?>

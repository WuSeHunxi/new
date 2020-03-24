<!DOCTYPE html>
<html lang="en">
<body>
<table  width="1400" height="80" align="center">
    <tr>

        <td bgcolor="#deb887" align="center"><h2><b>领航者，欢迎您</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;领航者，您好！</h2>
<hr>
<h3 align="center">书籍信息管理</h3>
</body>
<form method="post">
    <table  align="center" border="0">
        <tr>
            <td><input type="button" name='select'onclick="window.location.href='shangJia.php'" value="返回"></td>
            
        </tr>
    </table>
</form>

<?php
$conn = mysqli_connect('localhost', 'root', '1234567', 'test');
if ($conn->connect_error){
    echo '数据库连接失败！';
    exit(0);
}
mysqli_select_db($conn,'book');
?>
<html>
<body>
<form action="#" method="get">
    <table align="center"  width="900" >
        <tr><td>
                <select name="befor">
                    <option value=0>--请选择您要删除的用户--</option>
                    <?php
                    $sql= "select * from book ";//sql语句
                    $result = mysqli_query($conn, $sql);//执行sql语句
                    while($row = mysqli_fetch_array($result))
                    {
                        
                            echo "<option value='$row[book_name]'>$row[book_name]</option>";//循环，拼凑下拉框选项
              
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
    $sql="delete from book where book_name='{$name}'";
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

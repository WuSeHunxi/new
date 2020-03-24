<!DOCTYPE html>
<html lang="en">
<body>
<table  width="1400" height="80" align="center">
    <tr>

        <td bgcolor="#deb887" align="center"><h2><b>领航者，欢迎您</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;领航者您好！</h2>
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
        <option value=0>--请选择您要修改的书名--</option>
        <?php
        $sql= "select book_name from book ";//sql语句
        $result = mysqli_query($conn, $sql);//执行sql语句
        while($row = mysqli_fetch_array($result))
        {
            echo "<option value='$row[book_name]'>$row[book_name]</option>";//循环，拼凑下拉框选项
        }
        ?>
    <!--</select></td>
        <td>
            <select name="attribute">
                <option value="0">--请选择您要修改的书属性--</option>
                <option value="name">书Rfid</option>
                <option value="time">书id</option>
                <option value="address">书名</option>
                <option value="actor">书名拼音</option>
                <option value="director">书作者</option>
                <option value="movie_address">书介绍</option>
                <option value="movie_time">书价格</option>
                <option value="price">书总数</option>
            </select>
        </td>-->
		    <tr>
		    <div>
            <td>输入您要书的价格修改的值：<input type="text" name="update"></td>
			<td>输入您要书的总书修改的值：<input type="text" name="update1"></td>
			</div> 
			
			
			</tr>
			
        </tr>
        <tr><td colspan="2" align="right"><input type="submit" name="queren" value="确认修改"></td></tr>
    </table>
</form>
</body>
</html>
<?php
if(!empty($_GET['queren'])){
    $text=$_GET['update'];
	$text1=$_GET['update1'];
	
	
    $befor=$_GET['befor'];
    echo $text;
    echo $befor;


	
	if($text==null){
		
		
	}else{
		$sql="update book set bookjiage='$text'where book_name='$befor'";
	}
    mysqli_query($conn,$sql);
    $result=mysqli_query($conn,$sql);
    if (!$result) {
        printf("Error: %s", mysqli_error($conn));
        exit();
    }
	
	if($text1==null){
		
		
	}else{
		$sql="update book set booktotle='$text1'where book_name='$befor'";
	}

	
    mysqli_query($conn,$sql);
    $result=mysqli_query($conn,$sql);
    if (!$result) {
        printf("Error: %s", mysqli_error($conn));
        exit();
    }
}

?>
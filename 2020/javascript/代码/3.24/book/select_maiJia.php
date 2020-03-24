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
            <td><input type="button" name='select'onclick="window.location.href='maiJia.php'" value="返回"></td>
            
        </tr>
    </table>
</form>
<?php
header("Content-type: text/html; charset=utf-8");
$conn = mysqli_connect('localhost', 'root', '1234567', 'test');
if ($conn->connect_error){
    echo '数据库连接失败！';
    exit(0);
}
mysqli_select_db($conn,'book');
$sql="select * from book";
$result=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($result)){
    $bookRFId=$row['bookRFId'];
    $bookid=$row['bookid'];
    $bookname=$row['bookname'];
    $bookzuozhe=$row['bookzuozhe'];
	$bookjieshao=$row['bookjieshao'];
	$bookjiage=$row['bookjiage'];
	$booktotle=$row['booktotle'];
    echo "<table align='center' border='1' width='900'><tr>
              <td>
                <p>书RFid：$bookRFId</p>
                <p>书id：$bookid</p>
                <p>书名：$bookname</p>
                <p>书作者：$bookzuozhe</p>
				<p>书介绍：$bookjieshao</p>
				<p>书价格：$bookjiage 元</p>
				<p>书总数：$booktotle 本</p>
              </td>
              </tr></table>";
}
mysqli_free_result($result);
mysqli_close($conn);
?>
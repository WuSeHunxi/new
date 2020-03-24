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
echo '<form method="get"><table align="center" border="1" width="900"><tr>
          <td align="center">
          <p> 书RFid：<input type="text" name="bookRFId" ></p>
          <p> 书&nbsp;&nbsp;&nbsp;&nbsp;id：<input type="text" name="bookid" ></p>
          <p> 书&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text" name="bookname" ></p>
		  <p> 书名拼音：<input type="text" name="book_name" ></p>
          <p> 书作者：<input type="text" name="bookzuozhe" ></p>
          <p> 书介绍：<input type="text" name="bookjieshao" ></p>
          <p> 书价格：<input type="text" name="bookjiage" ></p>
          <p> 书总数：<input type="text" name="booktotle" ></p>
          <p><input type="submit" name="queren"  value="确认添加信息"></p></td>
          </tr></table></form>';
if(!empty($_GET['queren'])){
    //echo "点击成功";
    $bookRFId=$_GET['bookRFId'];
    $bookid=$_GET['bookid'];
    $bookname=$_GET['bookname'];
	$book_name=$_GET['book_name'];
    $bookzuozhe=$_GET['bookzuozhe'];
	$bookjieshao=$_GET['bookjieshao'];
	$bookjiage=$_GET['bookjiage'];
	$booktotle=$_GET['booktotle'];
	
	$bookRFId=iconv('gbk','utf-8',$bookRFId);
	$bookid=iconv('gbk','utf-8',$bookid);
	$bookname=iconv('gbk','utf-8',$bookname);
	$book_name=iconv('gbk','utf-8',$book_name);
	$bookzuozhe=iconv('gbk','utf-8',$bookzuozhe);
	$bookjieshao=iconv('gbk','utf-8',$bookjieshao);
	$bookjiage=iconv('gbk','utf-8',$bookjiage);
	$booktotle=iconv('gbk','utf-8',$booktotle);
	
	
	
	
    $conn = mysqli_connect('localhost', 'root', '1234567', 'test');
    if ($conn->connect_error){
        echo '数据库连接失败！';
        exit(0);
    }
    if($bookRFId==null || $bookid==null || $bookname==null || $bookzuozhe==null || $bookjieshao==null || $bookjiage==null || $booktotle==null){
        echo'<script>alert("以上信息应填全，添加数据失败！");
               exit(0);
              </script>';
    }else{
	
        mysqli_select_db($conn,'book');
        $sql="insert into book value ('$bookRFId','$bookid','$bookname','$book_name','$bookzuozhe','$bookjieshao','$bookjiage','$booktotle')";
        $result=mysqli_query($conn,$sql);
    }

}
?>
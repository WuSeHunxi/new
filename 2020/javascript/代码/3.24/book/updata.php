<!DOCTYPE html>
<html lang="en">
<body>
<table  width="1400" height="80" align="center">
    <tr>

        <td bgcolor="#deb887" align="center"><h2><b>�캽�ߣ���ӭ��</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;�캽�����ã�</h2>
<hr>
<h3 align="center">�鼮��Ϣ����</h3>
</body>
<form method="post">
    <table  align="center" border="0">
        <tr>
            <td><input type="button" name='select'onclick="window.location.href='shangJia.php'" value="����"></td>
            
        </tr>
    </table>
</form>

<?php
$conn = mysqli_connect('localhost', 'root', '1234567', 'test');
if ($conn->connect_error){
    echo '���ݿ�����ʧ�ܣ�';
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
        <option value=0>--��ѡ����Ҫ�޸ĵ�����--</option>
        <?php
        $sql= "select book_name from book ";//sql���
        $result = mysqli_query($conn, $sql);//ִ��sql���
        while($row = mysqli_fetch_array($result))
        {
            echo "<option value='$row[book_name]'>$row[book_name]</option>";//ѭ����ƴ��������ѡ��
        }
        ?>
    <!--</select></td>
        <td>
            <select name="attribute">
                <option value="0">--��ѡ����Ҫ�޸ĵ�������--</option>
                <option value="name">��Rfid</option>
                <option value="time">��id</option>
                <option value="address">����</option>
                <option value="actor">����ƴ��</option>
                <option value="director">������</option>
                <option value="movie_address">�����</option>
                <option value="movie_time">��۸�</option>
                <option value="price">������</option>
            </select>
        </td>-->
		    <tr>
		    <div>
            <td>������Ҫ��ļ۸��޸ĵ�ֵ��<input type="text" name="update"></td>
			<td>������Ҫ��������޸ĵ�ֵ��<input type="text" name="update1"></td>
			</div> 
			
			
			</tr>
			
        </tr>
        <tr><td colspan="2" align="right"><input type="submit" name="queren" value="ȷ���޸�"></td></tr>
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
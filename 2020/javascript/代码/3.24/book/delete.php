<!DOCTYPE html>
<html lang="en">
<body>
<table  width="1400" height="80" align="center">
    <tr>

        <td bgcolor="#deb887" align="center"><h2><b>�캽�ߣ���ӭ��</b></h2></td>
    </tr>
</table>
<h2>&nbsp;&nbsp;&nbsp;�캽�ߣ����ã�</h2>
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
                    <option value=0>--��ѡ����Ҫɾ�����û�--</option>
                    <?php
                    $sql= "select * from book ";//sql���
                    $result = mysqli_query($conn, $sql);//ִ��sql���
                    while($row = mysqli_fetch_array($result))
                    {
                        
                            echo "<option value='$row[book_name]'>$row[book_name]</option>";//ѭ����ƴ��������ѡ��
              
                    }
                    ?>
        </tr>
        <tr><td colspan="2" align="right"><input type="submit" name="queren" value="ȷ��ɾ��"></td></tr>
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
        echo '<script>alert("ɾ���ɹ���");</script>';
    }
}
?>

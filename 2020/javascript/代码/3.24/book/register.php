<style type="text/css">
 form{
    width:300px;
    background-color:#3299CC;
    margin-left:450px;
    margin-top:100px;
    padding:30px;
 }
</style>


<form method="post">


<br/>�麽��Աע��<br/>

<br/><label>�û���:<input type="text" name="name"></label><br/>

<br/><label>����:<input type="password" name="password"></label><br/>

<br/><label>ȷ������:<input type="password" name="repassword"></label><br/>

<br/><label>�ֻ���:<input type="text" name="tell"></label><br/>

<br/><label>�û�:<input type="radio" id="sex" name="user1" value='1'>�캽��<input type="radio" id="sex" name="user1" value='2'>��֪��</label><br/>

<br/>
<button type="submit" name="submit">ע��</button>
<button type="submit" name="submit0">��¼</button>
</form>

<?php 
$link = mysqli_connect('localhost', 'root', '1234567', 'test');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}else {
    if (isset($_POST['submit'])){
		
		$query = "select * from user where username = '{$_POST['name']}'";
        $result = mysqli_query($link, $query);
		
		if(mysqli_num_rows($result) == 1){
			
			echo "<script>alert('�û��Ѵ��ڣ�');history.back();WS</script>";
			$result=mysqli_query($link, $query);
		}else if ($_POST['password'] == $_POST['repassword']){
			$name=$_POST['name'];
			$password=$_POST['password'];
			$tell=$_POST['tell'];
			$user_class=$_POST['user1'];
			$query = "insert into user (username,password,tell,user_class) values('$name','$password','$tell','$user_class')";
			$result=mysqli_query($link, $query);
        }else {
            echo "<script>alert('�����������벻һ�£�');history.back();WS</script>";
        }
    }
    if (isset($_POST['submit0'])){
            header("Location:login.php");
    }
}
?>

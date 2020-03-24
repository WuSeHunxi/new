<style type="text/css">
form {
    width: 300px;
    background-color: #3299CC;
    margin-left: 450px;
    margin-top: 100px;
    padding: 30px;
}
</style>

<form method="post">
    <label>�û���:<input type="text" name="name"></label>
    <br /><br />

    <label>��&nbsp;&nbsp;&nbsp;��:<input type="password" name="password"></label>
    <br /><br />

    <label>��֤�룺</label>
    <td>

        <img id="captcha_img" border='1' src='./captcha.php?r=<?php echo rand(); ?>' style="width:100px; height:30px" />
    </td>
    <td colspan="2">
        <a href="javascript:void(0)"
            onclick="document.getElementById('captcha_img').src='./captcha.php?r='+Math.random()">��һ��?</a>
    </td>
    <br /><br />
    <label>��������֤�룺</label>
    <td></td>
    <td><input type="text" name='authcode' value='' /></td>
    <br /><br />

    <button type="submit" name="submit">��¼</button>
    <button type="submit" name="submit0">ע��</button>




</form>

<?php 
$link = mysqli_connect('localhost', 'root', 'root', 'test');
if (!$link){
    echo"<script>alert('���ݿ�����ʧ�ܣ�')</script>";
}else {
	/*if(isset($_REQUEST['authcode'])){
    session_start();
    strtolower()Сд����
		if(strtolower($_REQUEST['authcode'])== $_SESSION['authcode']){*/

			if (isset($_POST['submit'])){
				
				$query = "select * from user where username = '{$_POST['name']}' and password = '{$_POST['password']}'";
				$result = mysqli_query($link, $query);
				if (mysqli_num_rows($result) == 1){
					$query1 = "select * from user where  username = '{$_POST['name']}'and user_class='1'";
					$result1 = mysqli_query($link, $query1);
					
					$query2 = "select * from user where  username = '{$_POST['name']}'and user_class='2'";
					$result2 = mysqli_query($link, $query2);
					
					if(mysqli_num_rows($result1) == 1){
						header("Location:shangJia.php");
					}else if(mysqli_num_rows($result2) == 1){
						header("Location:maiJia.php");
					}else{
						header("Location:superUser.php");
					}
				}else{
					echo "�û������������";
				}
				
			}
	
	if (isset($_POST['submit0'])){
				header("Location:register.php");
	}
}
?>
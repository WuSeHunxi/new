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
    <label>用户名:<input type="text" name="name"></label>
    <br /><br />

    <label>&nbsp;&nbsp;&nbsp;密码:<input type="password" name="password"></label>
    <br /><br />

    <label>��֤�룺</label>
    <td>

        <img id="captcha_img" border='1' src='./captcha.php?r=<?php echo rand(); ?>' style="width:100px; height:30px" />
    </td>
    <td colspan="2">
        <a href="javascript:void(0)"
            onclick="document.getElementById('captcha_img').src='./captcha.php?r='+Math.random()">验证码</a>
    </td>
    <br /><br />
    <label></label>
    <td></td>
    <td><input type="text" name='authcode' value='' /></td>
    <br /><br />

    <button type="submit" name="submit">注册</button>
    <button type="submit" name="submit0">登录</button>




</form>

<?php 
$link = mysqli_connect('localhost', 'root', 'root', 'test');
if (!$link){
    echo"<script>alert('连接数据库失败')</script>";
}else {
	/*if(isset($_REQUEST['authcode'])){
    session_start();
    strtolower()
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
					echo "登陆失败";
				}
				
			}
	
	if (isset($_POST['submit0'])){
				header("Location:register.php");
	}
}
?>
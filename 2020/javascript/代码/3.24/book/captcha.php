<?php
 //10>����session,���봦�ڽű����
 session_start();
 
 $image = imagecreatetruecolor(100, 30);  //1>������֤��ͼƬ��С�ĺ���
 //5>������֤����ɫ imagecolorallocate(int im, int red, int green, int blue);
 $bgcolor = imagecolorallocate($image,255,255,255); //#ffffff
 //6>������� int imagefill(int im, int x, int y, int col) (x,y) ���ڵ�������ɫ,col ��ʾ��Ϳ�ϵ���ɫ
 imagefill($image, 0, 0, $bgcolor);
 //10>���ñ���
 $captcha_code = "";
 //7>�����������ĸ������
 for($i=0;$i<4;$i++){
  //���������С
  $fontsize = 8;  
  //����������ɫ�������ɫ
  $fontcolor = imagecolorallocate($image, rand(0,120),rand(0,120), rand(0,120));   //0-120����ɫ
  //������Ҫ���ȡ��ֵ,ȥ�����׳����ֵ��0��o
  $data ='abcdefghigkmnpqrstuvwxy3456789';
  //ȡ��ֵ���ַ�����ȡ���� strlen��ȡ�ַ�������
  $fontcontent = substr($data, rand(0,strlen($data)),1);
  //10>.=�����������
  $captcha_code .= $fontcontent;  
  //��������
  $x = ($i*100/4)+rand(5,10);
  $y = rand(5,10);
 
  imagestring($image,$fontsize,$x,$y,$fontcontent,$fontcolor);
 }
 //10>�浽session
 $_SESSION['authcode'] = $captcha_code;
 //8>���Ӹ���Ԫ�أ�����ѩ����
 for($i=0;$i<200;$i++){
  //���õ����ɫ��50-200��ɫ������ǳ���������Ķ�
  $pointcolor = imagecolorallocate($image,rand(50,200), rand(50,200), rand(50,200));  
  //imagesetpixel �� ��һ����һ����
  imagesetpixel($image, rand(1,99), rand(1,29), $pointcolor);
 }
 //9>���Ӹ���Ԫ�أ����ú���
 for($i=0;$i<4;$i++){
  //�����ߵ���ɫ
  $linecolor = imagecolorallocate($image,rand(80,220), rand(80,220),rand(80,220));
  //�����ߣ�����һ��
  imageline($image,rand(1,99), rand(1,29),rand(1,99), rand(1,29),$linecolor);
 }
 
 //2>����ͷ����image/png
 header('Content-Type: image/png');
 //3>imagepng() ����pngͼ�κ���
 imagepng($image);
 //4>imagedestroy() ����ͼ�κ��� ����$image
 imagedestroy($image);

<?php

$con = @mysql_connect("host","username","pwd");
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

@mysql_select_db("db_name", $con);

$result = array('status'=>0,'msg'=>'');

$username = $_REQUEST['username'];
$phone    = $_REQUEST['phone'];
$callback = $_REQUEST['callback'];
if(empty($username))
{
    $result['status'] = -1;
    $result['msg']    = 'username must be not empty!';
    echo json_encode($result);
    exit();
}
if(empty($phone))
{
    $result['status'] = -1;
    $result['phone']    = 'phone must be not empty!';
    echo json_encode($result);
    exit();
}
if(empty($callback))
{
    $result['status'] = -1;
    $result['phone']    = 'callback must be not empty!';
    echo json_encode($result);
    exit();
}


$sql = "SELECT * FROM api_user where username = '$username' and tel =  '$phone' ";
$res = mysql_query($sql);

$num = mysql_num_rows($res);

if($num)
{
    $result['status'] = -2;
    $result['msg']    = 'had same username and phone';
}
if($result['status'] == 0)
{
    $add = mysql_query("INSERT INTO api_user (username, tel) VALUES ('$username', '$phone')");
    if($add)
    {
        $result['status'] = 0;
        $result['msg']    = 'add success!';
    }
    else{
        $result['status'] = -3;
        $result['msg']    = 'add fail!';
    }
}

echo $_REQUEST['callback']."(".json_encode($result).")";
    
    


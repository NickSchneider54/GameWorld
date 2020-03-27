<?php
    include "connection.php";
        
    $sql = "SELECT * FROM users";
    
    $result = $pdo->query($sql);
    $json_array = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        $json_array[] = $row;
    }
    $json = json_encode($json_array);
    echo $json;
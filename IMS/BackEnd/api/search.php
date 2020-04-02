<?php

    include "connection.php";  

    $action = $_GET['action'];
  
    switch($action){
        case 'sell':
            $upc = $_GET['upc'];

            getProduct($upc);

        break;
    }  

    function getProduct($upc){   
        global $pdo;

        $sql = "SELECT * FROM products
                WHERE productID = '$upc'";

        $result = $pdo->query($sql);

        $json_array = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $json_array[] = $row;
        }

        $json = json_encode($json_array);

        echo $json;
    }

?>

    
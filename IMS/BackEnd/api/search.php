<?php

    include "connection.php";  

    // $action = $_GET['action'];
    $action = 'buy';
  
    switch($action){
        case 'buy':
            $game = $_GET['game'];
            $isbn = $_GET['isbn'];
            $console = $_GET['console'];

            getGame($isbn);

        break;
    }  

    function getGame($isbn){   
        global $pdo;

        $sql = "SELECT games.name As title, price, consoles.name AS console, brands.name AS brand FROM games 
                JOIN consoles On games.consoleID = consoles.consoleID
                JOIN brands ON consoles.brandID = brands.brandID
                WHERE barNum='$isbn'";

        $result = $pdo->query($sql);

        $json_array = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $json_array[] = $row;
        }

        $json = json_encode($json_array);

        echo $json;
    }

?>

    
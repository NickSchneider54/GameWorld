<?php

    include "connection.php";  

    $action = $_GET['action'];
  
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

        $sql = "SELECT gamenames.name As title, games.price, consoles.name AS console, brands.Name AS brand 
                FROM games
                LEFT JOIN gamenames ON games.gamenameID = gamenames.gameNameID
                LEFT JOIN consoles ON games.consoleID = consoles.consoleID
                LEFT JOIN brands ON games.brandID = brands.brandID
                WHERE games.barNum='$isbn'";

        $result = $pdo->query($sql);

        $json_array = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $json_array[] = $row;
        }

        $json = json_encode($json_array);

        echo $json;
    }

?>

    
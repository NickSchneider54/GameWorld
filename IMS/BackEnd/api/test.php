<?php

    include "connection.php";  

    // error_reporting(0);
    // ini_set('display_errors', 0);
    
    $week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $sales = array();
    $games = array();
    $consoles = array();
    $equipment = array();
    $misc = array();
    $categories = [0, 0, 0, 0];
    $totalSales = 0;
    $action = $_GET['action'];    
    
    switch($action){
        case 'sell':
            $upc = $_GET['upc'];
            getProduct($upc);
        break;

        case 'ticket':
            $function = $_GET['f'];
            if($function == 'sell'){
                createSellTicket();
            }
            else if($function == 'buy'){
                createBuyTicket();
            }
        break;

        case 'inventory':
            getAllProducts();
        break;

        case 'data':
            switch($_GET['f']){
                case 'games':
                    getGames();
                break;

                case 'gamesales':
                    getGames();
                    initSales();
                    getTopGames();
                break;

                case 'consoles':

                break;

                case 'categories':
                    getTotalCategorySales();
                break;

                case 'employees':

                break;

                case 'sales':
                    getTotalSales();
                break;

                case 'days':
                    initSales();
                    getTopOrderDays();
                break;
            }
    }  

    function initSales(){
        global $week;
        global $games;
        global $sales;

        switch($_GET['f']){
            case 'days':
                for($i = 0; $i < sizeof($week); $i++){
                    array_push($sales, 0);
                }
            break;

            case 'gamesales':
                for($i = 0; $i < sizeof($games); $i++){
                    array_push($sales, 0);
                }
            break;
        }
    }

    function getGames(){
        global $pdo;
        global $games;

        $sql = "SELECT name FROM games";

        $query = $pdo->prepare($sql);
        $query->execute();

        $result = $query->fetchAll();
        for($i = 0; $i < sizeof($result); $i++){
            $games[$i] = $result[$i]['name'];
        }

        if($_GET['f'] == 'games'){
            $json = json_encode($games);
            echo $json;
        }
    }

    function getAllProducts(){
        global $pdo;
        $inventory = array();

        $sql = "SELECT * FROM products";

        $query = $pdo->prepare($sql);        
        $query->execute();

        while($row = $query->fetchAll(PDO::FETCH_ASSOC)){
            $inventory = $row;
        }

        $json = json_encode($inventory);

        echo $json;
    }

    function getProduct($upc){   
        global $pdo;

        $sql = "SELECT * FROM products WHERE productID = '$upc'";

        $result = $pdo->query($sql);
        
        if($_GET['action'] == 'sell'){
            $json_array = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $json_array[] = $row;
            }

            $json = json_encode($json_array);
            echo $json;
        }
        else{
            $result->execute();
            return $result->fetch();
        }
    }

    function createSellTicket(){      
        if(isset($_COOKIE['shoppingCart']) || isset($_GET['cart'])){

            global $pdo;

            $users = getUserByUsername();
            $user = $users[0];
            $customer = 1;
            $type = 'sale';
            $date = date("Y-m-d");
            
            $sql = "INSERT INTO tickets (customerID, userID, ticketType, orderDate) VALUES(?, ?, ?, ?)";
            $query = $pdo->prepare($sql);
            $query->bindValue(1, $customer);
            $query->bindValue(2, $user);
            $query->bindValue(3, $type);
            $query->bindValue(4, $date);
            
            $query->execute();

            $cart = json_decode($_GET['cart'], true);
            
            foreach($cart as $inner){
                if(is_array($inner)){
                    foreach($inner as $product){
                        if(is_array($product)){
                            foreach($product as $item){
                                setcookie("productID", $item['productID']);                                
                                $tickets = getCurrentTicket();
                                foreach($tickets as $array){
                                    if(is_array($array)){
                                        createTicketItem($array['ticketID'], $item['productID']);
                                    break;
                                    }
                                }           
                            }
                        }
                    }
                }
            }
        }
        $message = true;
        $json = $message;
        echo json_encode($json);
    }    

    function createTicketItem($ticket, $item){
        global $pdo;

        
        $product = getProduct($item);

        $name = $product['name'];
        $qty = 1;
        
        $sql = "INSERT INTO ticketitems (productID, name, ticketID, quantity) VALUES(?, ?, ?, ?)";

        $query = $pdo->prepare($sql);    

        $query->bindValue(1, $item);
        $query->bindValue(2, $name);
        $query->bindValue(3, $ticket);
        $query->bindValue(4, $qty);
        
        $query->execute();        

        updateInventory($item);
    }

    function getCurrentTicket(){
        global $pdo;

        $sql = "SELECT ticketID FROM tickets ORDER BY ticketID DESC LIMIT 1";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    
    function getUserByUsername(){
        global $pdo;

        $user = $_GET['user'];

        $sql = "SELECT userID FROM users WHERE username = '$user'";
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetch();
    }

    function updateInventory($id){
        if($_GET['f'] == 'sell'){
            deductFromStock($id);
        }
    }

    function deductFromStock($id){
        global $pdo;

        $sql = "UPDATE products SET stock = stock - 1 WHERE productID = $id AND stock > 0";

        $query = $pdo->prepare($sql);
        $query->execute();
    }

    function getTopGames(){
        global $pdo;
        global $sales;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getTicketItems($ticket['ticketID']);
        }

        $json = json_encode($sales);    
        echo $json;  

    }

    function getAllTicketIDs(){
        global $pdo;

        $currentDay = date('Y-m-d');
        $weekAgo = date('Y-m-d', strtotime('-7 days'));
        $monthAgo = date('Y-m-d', strtotime('-30 days'));

        if(isset($_GET['range'])){
            if($_GET['range'] == 'Weekly'){
                $sql = "SELECT ticketID FROM tickets WHERE orderDate BETWEEN '$weekAgo' AND '$currentDay'";

                $query = $pdo->prepare($sql);
                $query->execute();

                return $query->fetchAll();
            }
            else{
                $sql = $sql = "SELECT ticketID FROM tickets WHERE orderDate BETWEEN '$monthAgo' AND '$currentDay'";
                
                $query = $pdo->prepare($sql);
                $query->execute();
    
                return $query->fetchAll();
            } 
        }
               
    }

    function getTopOrderDays(){
        global $pdo;
        global $sales;
        global $week;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getOrderDay($ticket['ticketID']);
        }

        $json = json_encode($sales);    
        echo $json;    
    }

    function getOrderDay($ticket){
        global $pdo;
        global $week;
        global $sales;        

        $sql = "SELECT orderDate FROM tickets WHERE ticketID = $ticket";
        $query = $pdo->prepare($sql);
        $query->execute();
        
        $order = $query->fetch();

        $dayofweek = date('l', strtotime($order['orderDate']));

        for($i = 0; $i < sizeof($week); $i++){
            if($dayofweek == $week[$i]){
                $orderDay = $dayofweek;
                $sales[$i] += 1;
                return $orderDay;
                break;
            }
        }
    }

    function getTicketItems($ticket){
        global $pdo;
        global $games;
        global $sales;

        if($_GET['f'] == 'sales'){
            $sql = "SELECT productID FROM ticketitems WHERE ticketID = $ticket";
            $query = $pdo->prepare($sql);
            $query->execute();
            
            $orders = $query->fetchAll(); 

            foreach($orders as $order){
                getProductPrice($order['productID']);
            }
        }
        else{
            $sql = "SELECT name FROM ticketitems WHERE ticketID = $ticket";
            $query = $pdo->prepare($sql);
            $query->execute();
            
            $orders = $query->fetchAll();

            foreach($orders as $order){
                for($i = 0; $i < sizeof($games); $i++){
                    if($order['name'] == $games[$i]){
                        $sales[$i] += 1;
                        break;
                    }
                }
            }
        } 
    }

    function getTotalCategorySales(){
        global $pdo;
        global $categories;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getCategory($ticket['ticketID']);
        }
        
        $json = json_encode($categories);
        
        echo $json;
    }

    function getCategory($ticket){    
        global $pdo;    
        global $categories;
        
        $items = getTicketItem($ticket);  
        $gameIDs = getAllGameIDs();

        $consoleIDs = getAllConsoleIDs();

        $equipmentIDs = getAllEquipmentIDs();

        $miscIDs = getAllAccessoryIDs();

        for($i = 0; $i < sizeof($gameIDs) + 1; $i++){
            if($items[$i]['productID'] == $gameIDs[$i]['gameID']){
                $categories[0] += 1;
            }
        }
        for($i = 0; $i < sizeof($consoleIDs) + 1; $i++){
            if($items[$i]['productID'] == $consoleIDs[$i]['consoleID']){
                $categories[1] += 1;
            }
        }
        for($i = 0; $i < sizeof($equipmentIDs) + 1; $i++){
            if($items[$i]['productID'] == $equipmentIDs[$i]['equipmentID']){
                $categories[2] += 1;
            }
        }
        for($i = 0; $i < sizeof($miscIDs) + 1; $i++){
            if($items[$i]['productID'] == $miscIDs[$i]['accessoryID']){
                $categories[3] += 1;
            }
        }        
    }

    function getTicketItem($ticket){
        global $pdo;

        $sql = "SELECT productID FROM ticketitems WHERE ticketID = $ticket";
        $query = $pdo->prepare($sql);
        $query->execute();
        
        return $query->fetchAll();
    }

    function getAllGameIDs(){
        global $pdo;

        $sql = "SELECT gameID FROM games";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllConsoleIDs(){
        global $pdo;

        $sql = "SELECT consoleID FROM consoles";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllEquipmentIDs(){
        global $pdo;

        $sql = "SELECT equipmentID FROM equipment";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllAccessoryIDs(){
        global $pdo;

        $sql = "SELECT accessoryID FROM accessories";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getTotalSales(){
        global $pdo;
        global $totalSales;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getTicketItems($ticket['ticketID']);
        }

        $json = json_encode($totalSales);
        
        echo $json;
    }

    function getProductPrice($product){
        global $pdo;
        global $totalSales;
        $sql = "SELECT price FROM products WHERE productID = '$product'";

        $query = $pdo->prepare($sql);
        $query->execute();

        $itemPrice = $query->fetch();
        $totalSales += $itemPrice['price'];
    }

?>

    
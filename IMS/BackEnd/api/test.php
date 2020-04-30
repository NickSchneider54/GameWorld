<?php

    include "connection.php";  

    error_reporting(0);
    ini_set('display_errors', 0);
    
    
    $week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $sales = array();
    $games = array();
    $consoles = array();
    $equipment = array();
    $misc = array();
    $users = array();
    $product = array();
    $categories = [0, 0, 0, 0];
    $totalSales = 0;
    $action = $_GET['action'];    
    
    switch($action){
        case 'sell':
            $upc = $_GET['upc'];
            getProduct($upc);
        break;

        case 'ticket':
            createTicket();
        break;

        case 'inventory':
            getAllProducts();
        break;

        case 'update':
            editInventoryItem();
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
                    getTopConsoles();
                break;

                case 'categories':
                    getTotalCategorySales();
                break;

                case 'employees':
                    getUserSales();
                break;

                case 'sales':
                    getTotalSales();
                break;

                case 'days':
                    initSales();
                    getTopOrderDays();
                break;

                case 'topgames':
                    getAllTimeGames();
                break;

                case 'topconsoles':
                    getAllTimeConsoles();
                break;

                case 'topequip':
                    getAllTimeEquipment();
                break;

                case 'topmisc':
                    getAllTimeMisc();
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

    function initUsers(){
        
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

    function createTicket(){      
        if(isset($_GET['cart'])){

            global $pdo;

            $users = getUserByUsername();
            $user = $users[0];
            $customer = 1;            
            $date = date("Y-m-d");

            if($_GET['f'] == 'sell'){
                $type = 'sale';
            }
            if($_GET['f'] == 'buy'){
                $type = 'buy';
            }
            
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

        if($_GET['f'] == 'buy'){
            updateInventory($item);
        }
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
        else{
            $sql = "SELECT ticketID FROM tickets";

                $query = $pdo->prepare($sql);
                $query->execute();

                return $query->fetchAll();
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
        global $product;

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

    function getAllSoldGames($id){
        global $pdo;

        $sql = "SELECT gameID, name FROM games WHERE gameID = $id";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllSoldConsoles($id){
        global $pdo;

        $sql = "SELECT consoleID, name FROM consoles WHERE consoleID = $id";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllSoldEquipment($id){
        global $pdo;

        $sql = "SELECT equipmentID, name FROM equipment WHERE equipmentID = $id";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    function getAllSoldMisc($id){
        global $pdo;

        $sql = "SELECT productID, name FROM products WHERE productID = $id";

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

    function getUserSales(){
        global $pdo;
        global $users;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getUserID($ticket['ticketID']);
        }

        $json = json_encode($users);

        echo $json;
    }

    function getUserID($ticket){
        global $pdo;
        global $users;
        global $totalSales;

        $sql = "SELECT userID FROM tickets WHERE ticketID = $ticket AND ticketType = 'sale'";

        $query = $pdo->prepare($sql);
        $query->execute();

        $results = $query->fetchAll();

        $user = $results[0]['userID'];
        $userInfo = getUserByID($user);
        $username = $userInfo['username'];

        if(sizeOf($users) > 0){
            for($i = 0; $i < sizeOf($users); $i++){
                if($username == $users[$i]->user){
                    $users[$i]->sales += 1;
                    break;
                }
                else if($i == sizeof($users) - 1 && $username != null){      
                    array_push($users, (object)["user"=>$username, "sales"=>1]);
                    break;
                }
            }
        }
        else{
            array_push($users, (object)["user"=>$username, "sales"=>1]);
        }        
    }

    function getUserByID($id){
        global $pdo;

        $sql = "SELECT username FROM users WHERE userID = '$id'";

        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetch();
    }

    function getTicketItemInfo($ticket){
        global $pdo;

        $sql = "SELECT productID, name FROM ticketitems WHERE ticketID = $ticket";

        $query = $pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll();
    }

    function getTopConsoles(){
        global $pdo;
        global $consoles;
        global $product;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getConsoleSales($ticket['ticketID']);
        }     

        $json = json_encode($consoles);

        echo $json;
    }

    function getConsoleSales($ticket){
        global $pdo;
        global $consoles;

        $order = getTicketItemInfo($ticket);

        foreach($order as $item){
            $result = getAllSoldConsoles($item['productID']);
            
            foreach($result as $console){
                if(sizeOf($consoles) > 0){
                    for($i = 0; $i < sizeOf($consoles); $i++){
                        if($console['consoleID'] == $consoles[$i]->upc){
                            $consoles[$i]->sales += 1;
                            break;
                        }
                        else if($i == sizeof($consoles) - 1){      
                            array_push($consoles, (object)["upc"=>$console['consoleID'], "name"=>$console['name'], "sales"=>1]);
                            break;
                        }
                    }
                }
                else{
                    array_push($consoles, (object)["upc"=>$console['consoleID'], "name"=>$console['name'], "sales"=>1]);
                }
            }            
        }        
    }

    function getAllTimeGames(){
        global $pdo;
        global $games;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getGameSales($ticket['ticketID']);
        }     

        $json = json_encode($games);

        echo $json;
    }

    function getGameSales($ticket){
        global $pdo;
        global $games;
        
        $order = getTicketItemInfo($ticket);

        foreach($order as $item){
            $game = getAllSoldGames($item['productID']);            
            if($game){
                if(sizeOf($games) > 0){
                    for($i = 0; $i < sizeOf($games); $i++){    
                        if($game[0]['gameID'] == $games[$i]->upc){
                            $games[$i]->sales += 1;
                            break;
                        }
                        else if($i == sizeof($games) - 1){      
                            array_push($games, (object)["upc"=>$game[0]['gameID'], "name"=>$game[0]['name'], "sales"=>1]);
                            break;
                        }
                    }
                }
                else{
                    array_push($games, (object)["upc"=>$game[0]['gameID'], "name"=>$game[0]['name'], "sales"=>1]);
                }
            } 
        }          
    }

    function getAllTimeEquipment(){
        global $pdo;
        global $equipment;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getEquipmentSales($ticket['ticketID']);
        }     

        $json = json_encode($equipment);

        echo $json;
    }

    function getEquipmentSales($ticket){
        global $pdo;
        global $equipment;
        
        $order = getTicketItemInfo($ticket);

        foreach($order as $item){
            $equip = getAllSoldEquipment($item['productID']);            
            if($equip){
                if(sizeOf($equipment) > 0){
                    for($i = 0; $i < sizeOf($equipment); $i++){    
                        if($equip[0]['equipmentID'] == $equipment[$i]->upc){
                            $equipment[$i]->sales += 1;
                            break;
                        }
                        else if($i == sizeof($equipment) - 1){      
                            array_push($equipment, (object)["upc"=>$equip[0]['equipmentID'], "name"=>$equip[0]['name'], "sales"=>1]);
                            break;
                        }
                    }
                }
                else{
                    array_push($equipment, (object)["upc"=>$equip[0]['equipmentID'], "name"=>$equip[0]['name'], "sales"=>1]);
                }
            } 
        }          
    }

    function getAllTimeMisc(){
        global $pdo;
        global $misc;

        $tickets = getAllTicketIDs();

        foreach($tickets as $ticket){
            getGameSales($ticket['ticketID']);
        }     

        $json = json_encode($misc);

        echo $json;
    }

    function getMiscSales($ticket){
        global $pdo;
        global $misc;
        
        $order = getTicketItemInfo($ticket);

        foreach($order as $item){
            $product = getAllSoldGames($item['productID']);            
            if($product){
                if(sizeOf($misc) > 0){
                    for($i = 0; $i < sizeOf($misc); $i++){    
                        if($product[0]['productID'] == $misc[$i]->upc){
                            $misc[$i]->sales += 1;
                            break;
                        }
                        else if($i == sizeof($misc) - 1){      
                            array_push($misc, (object)["upc"=>$product[0]['miscID'], "product"=>$product[0]['name'], "sales"=>1]);
                            break;
                        }
                    }
                }
                else{
                    array_push($misc, (object)["upc"=>$product[0]['miscID'], "name"=>$product[0]['name'], "sales"=>1]);
                }
            } 
        }          
    }


    function editInventoryItem(){
        global $pdo;

        if(isset($_GET['product'])){
            $product = json_decode($_GET['product']);           

            $sql = "UPDATE (name, description, price, used, stock) VALUES(?, ?, ?, ?, ?) WHERE productID=$product->id";
            $query = $pdo->prepare($sql);
            $query->bindvalue(1, $product->name);
            $query->bindvalue(2, $product->description);
            $query->bindvalue(3, $product->price);
            $query->bindvalue(4, $product->used);
            $query->bindvalue(5, $product->stock);

            $query->execute();

            $message = "updated";
            
            $json = json_encode($message);

            echo $json;

        }
    }

?>

    
<?php

    include "connection.php";      
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
    }  

    function getProduct($upc){   
        global $pdo;

        $sql = "SELECT * FROM products WHERE productID = '$upc'";

        $result = $pdo->query($sql);
        $json_array = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $json_array[] = $row;
        }

        $json = json_encode($json_array);
        echo $json;

        return $result->fetch(PDO::FETCH_ASSOC);
    }

    function createSellTicket(){      
        if(isset($_COOKIE['shoppingCart']) || isset($_GET['cart'])){

            global $pdo;

            $users = getUserByUsername();
            $user = $users[0];
            $customer = 1;
            $type = 'sale';
            $date = date("Y-m-d");

            echo("</br>user: $user</br>");

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
                                print_r($item);
                                setcookie("productID", $item['productID']);
                                echo("</br>");
                                echo($_COOKIE['productID']);
                                echo("</br>");
                                $tickets = getCurrentTicket();
                                print_r($tickets);
                                foreach($tickets as $array){
                                    if(is_array($array)){
                                        print_r($array['ticketID']);
                                        createTicketItem($array['ticketID'], $item['productID']);
                                    break;
                                    }
                                }                                
                                echo("</br>");
                            }
                        }
                    }
                }
            }
        }
        $message = true;
        $json_array[] = $message;
        echo json_encode($json_array);
    }    

    function createTicketItem($ticket, $item){
        global $pdo;

        echo("</br>Ticket: $ticket</br>Item: $item</br>");

        $product = getProduct($item);

        $name = $product['name'];

        $sql = "INSERT INTO ticketitems (productID, ticketID, quantity) VALUES(?, ?, ?, ?)";

        $query = $pdo->prepare($sql);
        $query->bindValue(1, $item);
        $query->bindValue(2, $ticket);
        $query->bindValue(3, $name);
        $query->bindValue(4, 1);
        
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
        echo("</br>User: $user</br>");

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

?>

    
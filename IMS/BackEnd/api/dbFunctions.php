<?php
include "connection.php";
//connect is the dns

//Pass it a table name and return all records
function GetAll($stableName){
    global $connect;
    $sql = "SELECT * from $stableName";
    $pdostate = $connect->query($sql);
    $array = $pdostate->fetchAll();
    return $array;
}
//*******************Only use for table that have used*******************
function GetAllUsed($stableName){
    global $connect;
    $sql = "SELECT * from $stableName WHERE Used = 1";
    $pdostate = $connect->query($sql);
    $array = $pdostate->fetchAll();
    return $array;
}
function GetAllNew($stableName){
    global $connect;
    $sql = "SELECT * from $stableName WHERE Used =0";
    $pdostate = $connect->query($sql);
    $array = $pdostate->fetchAll();
    return $array;
}
//*************************************************************************
function Delete($stableName,$sID,$NameID){
    global $connect;
    $sqlDelete = "DELETE FROM $stableName WHERE $NameID = $delID";
    $pdos = $connect->query($sqlDelete);
}
//Customers******************************************
function GetCustomerByCustID($sID){
    global $connect;
    $sql ="SELECT * FROM customer WHERE customerID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
//Brands*************************************
function GetBrand($sID){
    global $connect;
    $sql ="SELECT * FROM brands WHERE brandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
//Consoles*****************************************
function GetConsoles($sID){
    global $connect;
    $sql ="SELECT * FROM consoles WHERE consoleID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}

function GetConsolesByBrandID($sID){
    global $connect;
    $sql ="SELECT * FROM brand WHERE brandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
//Equipment***********************************
function GetEquipmentByID($sID){
    global $connect;
    $sql ="SELECT * FROM equipment WHERE equipmentID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}function GetEquipmentByConsoleID($sID){
    global $connect;
    $sql ="SELECT * FROM equipment WHERE consoleID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetEquipmentByBrandID($sID){
    global $connect;
    $sql ="SELECT * FROM equipment WHERE BrandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetEquipmentByTypeID($sID){
    global $connect;
    $sql ="SELECT * FROM equipment WHERE typeID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetEquipmentTypeByID($sID){
    global $connect;
    $sql ="SELECT * FROM equipmenttype WHERE eqTypeID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetEquipmentTypeByGameID($sID){
    global $connect;
    $sql ="SELECT * FROM equipmenttype WHERE gameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}

//GameName***********************************
function GetGameNameID($sID){
    global $connect;
    $sql ="SELECT * FROM gamenames WHERE gameNameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetGameNameByID($sID){
    global $connect;
    $sql ="SELECT * FROM gamenames WHERE gameNameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
//Games***********************************
function GetGamesByGameID($sID){
    global $connect;
    $sql ="SELECT * FROM games WHERE gameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetGamesByConsoleID($sID){
    global $connect;
    $sql ="SELECT * FROM games WHERE consoleID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetGamesByNameID($sID){
    global $connect;
    $sql ="SELECT * FROM games WHERE gamenameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetGamesByBrandID($sID){
    global $connect;
    $sql ="SELECT * FROM games WHERE gameID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
//SoldItems***********************************
function GetSoldItemByID($sID){
    global $connect;
    $sql ="SELECT * FROM solditems WHERE soldItemsID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetSoldItemByTicketID($sID){
    global $connect;
    $sql ="SELECT * FROM solditems WHERE ticketID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetSoldItemByEquipmentID($sID){
    global $connect;
    $sql ="SELECT * FROM solditems WHERE equipmentID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetSoldItemByGamesID($sID){
    global $connect;
    $sql ="SELECT * FROM solditems WHERE gamesID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetSoldItemBySpecialID($sID){
    global $connect;
    $sql ="SELECT * FROM solditems WHERE specialID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
//Speical************************************
function GetSpecialByID($sID){
    global $connect;
    $sql ="SELECT * FROM special WHERE specialID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
//Ticket*****************************
function GetTicketByID($sID){
    global $connect;
    $sql ="SELECT * FROM ticket WHERE ticketID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetTicketByCustomerID($sID){
    global $connect;
    $sql ="SELECT * FROM ticket WHERE customerID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetTicketByUserID($sID){
    global $connect;
    $sql ="SELECT * FROM ticket WHERE userID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

    
}
//Users*******************************************
function GetUserByID($sID){
    global $connect;
    $sql ="SELECT * FROM users WHERE userID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetUserByLevel($sID){
    global $connect;
    $sql ="SELECT * FROM users WHERE level =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}


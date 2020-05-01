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
    $sqlDelete = "DELETE FROM $stableName WHERE $NameID = $sID";
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
function GetBrandByName($sName){
    global $connect;
    $sql ="SELECT * FROM brands WHERE name like $sName";
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
    $sql ="SELECT * FROM consoles WHERE brandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetConsolesByGenID($sID){
    global $connect;
    $sql ="SELECT * FROM consoles WHERE generationID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}

function GetConsolesByName($sName){
    global $connect;
    $sql ="SELECT * FROM consoles WHERE name like $sName";
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
function GetEquipmentByName($sName){
    global $connect;
    $sql ="SELECT * FROM equipmenttype WHERE name like$sName";
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
function GetGamesByName($sName){
    global $connect;
    $sql ="SELECT * FROM games WHERE name like $sName";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetGamesByDate($sDate){
    global $connect;
    $sql ="SELECT * FROM games WHERE releaseDate like $sDate";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();

}
function GetGamesByGenre($sGenre){
    global $connect;
    $sql ="SELECT * FROM games WHERE genre like $sGenre";
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
//Generations 
function GetGenByID($sID){
    global $connect;
    $sql ="SELECT * FROM consolegenerations WHERE generationID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();
}
function GetGenByName($sName){
    global $connect;
    $sql ="SELECT * FROM consolegenerations WHERE name like$sName";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();
}
//Accessories
function GetAccessByID($sID){
    global $connect;
    $sql ="SELECT * FROM accessories WHERE accessoryID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();
}

function GetAccessByConsole($sConsoleID){
    global $connect;
    $sql ="SELECT * FROM accessories WHERE consoleID =$sConsoleID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();
}
function GetAccessByDesc($sDesc){
    global $connect;
    $sql ="SELECT * FROM accessories WHERE description =$sDesc";
    $pdostate = $connect->query($sql);
    return $pdostate->fetchAll();
}
//search functions 
function SearchEquipment($sID="",$sConsole="",$sName="",$sType=""){
    if(!empty($sID)){
        return GetEquipmentByID($sID);

    }
    if(!empty($sName)){
        $aryEquipmentName = GetEquipmentByName($sName);
        if(empty($sConsole)&&empty($sType)){
            return $aryEquipmentName;
        }
    }
    if(!empty($sConsole)){
       $aryConsoles= GetConsolesByName($sConsole);
       $aryEquipmentConsoles =[];
        foreach( $aryConsoles as$aryConsole ){
            $aryEquipmentConsoles = array_unique(array_merge(GetEquipmentByConsoleID($aryConsole['equipmentID']),$aryEquipmentConsoles));
        }
        if(empty($sName) && empty($sType)){  
            return $aryEquipmentConsoles;
        }
    }
    if(!empty($aryEquipmentName) &&! empty($aryEquipmentConsoles)){
        return array_unique(array_merge($aryEquipmentName,$aryEquipmentConsoles));
    }
}

function SearchConsoles($sID="",$sName ="",$sGen="",$sBrand=""){
 
    if(!empty($sID)){
        return GetConsoles($sID);

    }
    if(!empty($sName)){
        $aryConsoleName = GetConsolesByName($sName);
        if(empty($sGen)&&empty($sBrand)){
            return $aryConsoleName;
        }
    }
    if(!empty($sGen)){
        $aryGens = GetGenByName($sGen);
        $aryConsolesGen =[];
        foreach($aryGens as$aryGen  ){
            $aryConsolesGen = array_unique(array_merge(GetConsolesByGenID($aryGen['generationid']),$aryConsolesGen));
        }
       if(empty($sName)&&empty($sBrand)){
            return $aryConsolesGen;
        }
    }
    if(!empty($sBrand)){
        $aryBrands = GetBrandByName($sBrand);
        $aryConsolesBrand =[];
        foreach($aryBrands as$aryBrand  ){
            $aryConsolesBrand = array_unique(array_merge(GetConsolesByBrandID($aryBrand['brandid']),$aryConsolesBrand));
        }
       if(empty($sName)&&empty($sBrand)){
            return $aryConsolesBrand;
        }
    }
    if(!empty($aryConsolesName)&&!empty($aryConsolesGen)){
        if(empty($aryConsolesBrand)){
            return array_unique(array_merge($aryConsoleName,$aryConsolesGen));
        }
        else{
            $aryConsoles =array_unique(array_merge($aryConsoleName,$aryConsolesGen));
            return array_unique(array_merge($aryConsoles,$aryConsolesBrand));
        }
    }
}
function SearchAccessories($sID="",$sConsole="",$sDesc=""){
    if(!empty($sID)){
        return GetAccessByID($sID);
    }
    if(!empty($sConsole)){
        $aryConsoles= GetConsolesByName($sConsole);
        $aryAccessConsoles =[];
        foreach($aryConsoles as $aryConsole ){
            $aryAccessConsoles = array_unique(array_merge(GetAccessByConsole($aryConsole['accessoryID']),$aryAccessConsoles));
        }
        if(empty($sDesc)){  
            return $aryAccessConsoles;
        }
    }
    if(!empty($sDesc)){
        $aryAccessDesc = [];
        $aryAccessDesc = GetAccessByDesc($sDesc);
        if(empty($sConsole)){
            return $aryAccessDesc;
        }
    }
    if(!empty($aryAccessConsoles)&&!empty($aryAccessDesc)){
        return array_unique(array_merge($aryAccessDesc,$aryAccessConsoles));
    }
}
function SearchGames($sID="",$sConsole="",$sName="",$sDate="",$sGenre=""){
    $aryGames=[];
    if(!empty($sID)){
        return GetGamesByGameID($sID);
    }
    if(!empty($sConsole)){
        $aryConsoles= GetConsolesByName($sConsole);
        $aryGameConsoles =[];
        foreach($aryConsoles as $aryConsole ){
            $aryGameConsoles = array_unique(array_merge(GetGamesByConsoleID($aryConsole['consoleID']),$aryGameConsoles));
        }
        if(empty($sName)&&empty($sDate)&&empty($sGenre)){  
            return $aryGameConsoles;
        }
        else{
            $aryGames =array_unique(array_merge($aryGames,$aryGameConsoles));
        }
    }
    if(!empty($sName)){
        $aryGameName = GetGamesByName($sName);
        if(empty($sConsole)&&empty($sDate)&&empty($sGenre)){  
            return $aryGameName;
        }
        else{
            $aryGames =array_unique(array_merge($aryGames,$aryGameName));
        }
    }
    if(!empty($sDate)){
        $aryGameDate = GetGamesByDate($sDate);
        if(empty($sConsole)&&empty($sName)&&empty($sGenre)){  
            return $aryGameDate;
        }
        else{
            $aryGames =array_unique(array_merge($aryGames,$aryGameDate));
        }
    }
    if(!empty($sGenre)){
        $aryGameGenre = GetGamesByGenre($sGenre);
        if(empty($sConsole)&&empty($sName)&&empty($sDate)){  
            return $aryGameGenre;
        }
        else{
            $aryGames =array_unique(array_merge($aryGames,$aryGameGenre));
        }
    }
    if(!empty($aryGames)){
        return $aryGames;
    }
    
   
}
function SearchGens($sID="",$sName=""){
    if(!empty($sID)){
        return GetGenByID($sID);
    }
    if(!empty($sName)){
        return GetGenByName($sName);
    }
}
function SearchBrands($sID="",$sName=""){
    if(!empty($sID)){
        return GetBrand($sID);
    }
    if(!empty($sName)){
        return GetBrandByName($sName);
    }
}


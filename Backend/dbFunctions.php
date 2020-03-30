<?php
include "database.php";
//connect is the dns

//Pass it a table name and return all records
function GetAll($stableName){
global $connect;
$sql="SELECT *from $stableName";
$pdostate = $connect->query($sql);
$array= $pdostate->fetchAll();
return$array
}
function Delete($stableName,$sID){
    global $connect;
    $sqlDelete ="DELETE FROM $stableName WHERE post_ID = $delID";
    $pdos=$connect->query($sqlDelete);
}
function GetBrand($sID){
    global $connect;
    $sql ="SELECT * FROM brands WHERE brandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}
function GetBrand($sID){
    global $connect;
    $sql ="SELECT * FROM brands WHERE brandID =$sID";
    $pdostate = $connect->query($sql);
    return $pdostate->fetch();

}

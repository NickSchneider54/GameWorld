<?php

    try{
        $pdo = new PDO('mysql:host=localhost;dbname=gameworld', 'root');
    } 
    catch(PDOException $e){
        exit('Database error.');
    }
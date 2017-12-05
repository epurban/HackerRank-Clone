<?php
include "connect.php";

if (isset($_POST['function'])) {
    if ($_POST['function'] === "register") {
        echo insert_user($db);
    }
    
    else if ($_POST['function'] === "verification") {
        echo verify_user($db);
    }
}
//inserts new user information into the database
function insert_user($db)
{
    $query = "INSERT INTO Users (usernames, firstname, lastname, email, passs)
    VALUES ('" . $_POST["usernames"] . "','" . $_POST["firstname"] . "','" . $_POST["lastname"] . "','" . $_POST["email"] . "','" . $_POST["passs"] . "')";
    $db->query($query);
}
//Check if user exists in database already 
function verify_user($username, ,$passs, $db)
{
    $query = "select count(*) as pass FROM Users WHERE usernames = '$username' and passs = '$passs'";
    return $db->query($query)->fetch_assoc()['pass'];
}
//returns how many stars the user has 
function get_stars($username, $db)
{
    $query = "select stars as stars FROM Users WHERE username = '$username'";
    return $db->query($query)->fetch_assoc()['stars'];
}
//returns what level the user is on
function get_level($username, $db)
{
    $query = "select level as level FROM Users WHERE username = '$username'";
    return $db->query($query)->fetch_assoc()['level'];
}
//updaes the stars and level of the user after the activity was completed.
function update_user($stars, $level, $username,$db)
{
    $query = "UPDATE Users SET stars = '$stars', level = '$level' WHERE username = '$username'";
    echo $query;
    $db->query($query);
}

function total($db)
{
    $query = "SELECT COUNT(*) as count FROM Users";
    return $db->query($query)->fetch_assoc()['count'];
}


$db->close();

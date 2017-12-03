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

function insert_user($db)
{
    $query = "INSERT INTO Users (usernames, firstname, lastname, email, passs)
    VALUES ('" . $_POST["usernames"] . "','" . $_POST["firstname"] . "','" . $_POST["lastname"] . "','" . $_POST["email"] . "','" . $_POST["passs"] . "')";
    $db->query($query);
}

function verify_user($username, ,$passs, $db)
{
    $query = "select count(*) as pass FROM Users WHERE usernames = '$username' and passs = '$passs'";
    return $db->query($query)->fetch_assoc()['pass'];
}

function get_stars($username, $db)
{
    $query = "select stars as stars FROM Users WHERE username = '$username'";
    return $db->query($query)->fetch_assoc()['stars'];
}

function get_level($username, $db)
{
    $query = "select level as level FROM Users WHERE username = '$username'";
    return $db->query($query)->fetch_assoc()['level'];
}

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

function debt($ssn, $db)
{
    $query = "SELECT money as money FROM Users WHERE ssn = '$ssn'";
    return $db->query($query)->fetch_assoc()['money'];
}

$db->close();

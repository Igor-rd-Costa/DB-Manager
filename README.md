# DB-Manager

## Setup

The server will try to connect to the Admin's database when you enter the site, 
if it does not find the database it will create it together with a user who has permission to edid said database.<br>
By default it will create a user called `Admin` and a database called `db_manager_admin`,
you can change this and other connection options by changing the values of the `CONFIG_INFO` class inside `config.php`.

## Currently Supported Features

* Login and Registration
* Table Visualization and Creation

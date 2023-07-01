# DB-Manager

## Setup

The server will try to connect to the Admin's database when you enter the site, 
if it does not find the database it will create it together with a user who has permission to edid said database.<br>
By default it will create a user called `Admin` and a database called `db_manager_admin`,
you can change this and other connection options by changing the values of the `CONFIG` class inside `config.php`.

### Software used for development
* PHP 8.2.4;
* Apache 2.4.56;
* MariaDB 10.4.28.

## Currently Supported Features

* Login and registration;
* Creation and visualization of tables;
* Insertion of columns and table data;
* Removal of tables, columns and table data;
* Rename tables and alter the structure of the columns.

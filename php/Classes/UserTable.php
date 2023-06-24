<?php

include_once "TableColumn.php";

class Table 
{
public string $DatabaseName;
public string $TableName;
public int $Index;
public int $Rows;
public string $PrimaryKey = "";
public string $Engine;
public string $Collation;
public int $Size; // in KiB
public string $CreationDate;
public ?string $LastUpdateDate;
public ?string $Comment;
public array $Columns;
public array $TableData;
public array $ColumnNames;  


public function __construct(mysqli $connection, string $databaseName, string $table_name, int $index)
{
    $this->Index = $index;
    $this->DatabaseName = $databaseName;
    $this->TableName = $table_name;
    $this->UpdateData($connection);
    $this->UpdateTableStructure($connection);
    $this->UpdateColumnStructure($connection);
}

public function Update($connection) {
    $this->UpdateData($connection);
    $this->UpdateTableStructure($connection);
    $this->UpdateColumnStructure($connection);
}
    
public function DisplayTableCard()
{
    // Fix displaying of high char count table names
    print 
    "<div class='table' tablename='". $this->TableName . "'>".
    "<div id='title'>" . STR_FirstToUpper($this->TableName) . "</div>" . 
    "<div id='content'>
        <ul>
            <li>" . $this->Rows . " Entries</li>
            <li>Engine: $this->Engine</li>
            <li>Collation: $this->Collation</li>
            <li>Size: $this->Size KiB</li>
        </ul>
    </div>" .
    "</div>";
}

public function DisplayTableListItem()
{
    // Fix displaying of high char count table names 
    print
    "<div class='list-item-wrapper' tablename='$this->TableName'>
        <div class='list-item'> 
            <span class='listTblName'>$this->TableName</span> 
        </div>
        <div class='tblOptionsWrapper'>
            <div id='drop-table'>
                <img class='removeIcon' src='../img/Remove.png' title='Remove'></img>
                <span>Remove</span>
            </div>
        </div>
    </div>";
}

public function DisplayTable()
{
    $totalFields = sizeof($this->ColumnNames);
    $fieldCount = 0;
    print 
    "<table id='tabledisplay'>
        <tr class='tbl-header-row'>";
        if($this->Rows > 0) print "<th></th>";
    foreach ($this->ColumnNames as $field) {
        $thstyle = "";
        $spanStyle = "";
        if($fieldCount == ($totalFields - 1)) $thstyle = "style='border-right: none;'";
        if(!$this->Columns[$field]->Comment) $spanStyle = "style='grid-column: 1 / 3;'";

        print "<th class='tbl-header' $thstyle>";
        print "<div><span class='column-name' $spanStyle>$field</span>";
        if ($this->Columns[$field]->Comment) {
            print "<img class='commentIconImg' src='../img/Comment.png'></img></div>";
        }
        print "</th>";
        $fieldCount++;
    }
    print "</tr>";
    $fieldCount = 0;
    if($this->Rows > 0) {
        foreach ($this->TableData as $info) {
            print "<tr class='tbl-content-row'>
                    <td class='tblEditOptions'>
                        <div class='tblOptionsWrapper'>
                            <img id='delete-row' class='removeIcon' src='../img/Remove.png' title='Remove'></img>
                        </div>
                    </td>";
            foreach ($this->ColumnNames as $field) {
                $style = ""; 
                if ($fieldCount == ($totalFields -1)) $style = "style='border-right: none;'";  
                print "<td class='tblData' $style>" . $info[$field] . "</td>";
                $fieldCount++;
            }
        $fieldCount = 0;
        }
    }
    else {
        print 
        "<tr class='tbl-empty-msg-row'>
            <td style='border-right: none;'> Table is empty! </td>
        </tr>"; 
    }
    print "</table>";
}

public function DisplayStructure() {
    $totalFields = sizeof($this->ColumnNames);
    $fieldCount = 0;
    $thstyle = "";
    print
    "<table id='tabledisplay'>
        <tr class='tbl-header-row'>
            <th></th>
            <th class='tbl-header'>#</th>
            <th class='tbl-header'>Name</th>
            <th class='tbl-header'>Type</th>
            <th class='tbl-header'>Collation</th>
            <th class='tbl-header'>Attributes</th>
            <th class='tbl-header'>Null</th>
            <th class='tbl-header'>Default</th>
            <th class='tbl-header'>Comments</th>
            <th class='tbl-header'>Extra</th>
        </tr>";        
        foreach ($this->Columns as $Column) {
            $Null = "No";
            if($Column->Nullable) $Null = "Yes";
        print
        "<tr class='tbl-content-row'>
            <td class='tblEditOptions'>
                <div class='tblOptionsWrapper'>
                    <img id='edit-column' class='editIcon' src='../img/Edit.png' title='Change'></img>
                    <img id='drop-column' class='removeIcon' src='../img/Remove.png' title='Drop'></img>
                </div>
            </td>
            <td class='tblData'>$Column->Index</td>
            <td class='tblData column-name'>$Column->Name";
            if ($Column->Key == "PRI") print "<img class='primary-key' src='../img/PrimaryKey.png' title='Primary Key'></img>";
            print "</td>
            <td class='tblData'>$Column->Type</td>
            <td class='tblData'>$Column->Collation</td>
            <td class='tblData'></td>
            <td class='tblData'>$Null</td>
            <td class='tblData'>$Column->Default</td>
            <td class='tblData' style='width: 15rem; word-break: break-word;'>$Column->Comment</td>
            <td class='tblData'>".strtoupper($Column->Extra)."</td>
        </tr>";
        }
    print "</table>";
}

private function UpdateData(mysqli $connection) {
    $this->Rows = 0;
    unset($this->TableData);
    $result = SQL_Query($connection, "SELECT * FROM `$this->TableName`;");
    while($row = $result->fetch_assoc())
    {
        $this->TableData[] = $row;
        $this->Rows++;
    }
}

private function UpdateTableStructure(mysqli $connection) {
    $tableStructure = SQL_Query($connection, "SELECT ENGINE, TABLE_SCHEMA, TABLE_COLLATION, DATA_LENGTH, CREATE_TIME, UPDATE_TIME, TABLE_COMMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '$this->TableName';");
    $tableStructure = $tableStructure->fetch_assoc();
    $this->Engine = $tableStructure["ENGINE"];
    $this->DatabaseName = $tableStructure["TABLE_SCHEMA"];
    $this->Collation = $tableStructure["TABLE_COLLATION"];
    $this->Size = $tableStructure["DATA_LENGTH"] / 1024;
    $this->CreationDate = $tableStructure["CREATE_TIME"];
    $this->LastUpdateDate = $tableStructure["UPDATE_TIME"];
    $this->Comment = $tableStructure["TABLE_COMMENT"];
}

private function UpdateColumnStructure(mysqli $connection) {
    $columnStructure = SQL_Query($connection, "SELECT COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, COLUMN_TYPE, DATA_TYPE, NUMERIC_PRECISION, CHARACTER_MAXIMUM_LENGTH, CHARACTER_SET_NAME, COLLATION_NAME, COLUMN_KEY, EXTRA, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '$this->DatabaseName' AND TABLE_NAME = '$this->TableName';");
    $columnData = array();
    unset($this->ColumnNames);
    while($data = $columnStructure->fetch_assoc()) {
        $columnData[] = $data;
        if (!$data["COLUMN_DEFAULT"]) $data["COLUMN_DEFAULT"] = "None";
        $this->Columns[$data["COLUMN_NAME"]] = new Column($data["COLUMN_NAME"], $data["ORDINAL_POSITION"], $data["COLUMN_DEFAULT"], $data["IS_NULLABLE"], $data["COLUMN_TYPE"], $data["DATA_TYPE"], $data["NUMERIC_PRECISION"], $data["CHARACTER_MAXIMUM_LENGTH"], $data["CHARACTER_SET_NAME"], $data["COLLATION_NAME"], $data["COLUMN_KEY"], $data["EXTRA"], $data["COLUMN_COMMENT"]);
        $this->ColumnNames[] = $data["COLUMN_NAME"];
        if ($this->Columns[$data["COLUMN_NAME"]]->Key == "PRI") $this->PrimaryKey = $data["COLUMN_NAME"];
    }
}
}
?>
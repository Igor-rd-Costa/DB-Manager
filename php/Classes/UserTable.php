<?php
class Table 
{
public int $Index;
public string $TableName;
public int $Rows;
public $TableData;    //make private
public $TableStructure; //make private
public array $ColumnNames;
public array $Test;
public array $Test2;

public function __construct($connection, string $table_name, int $index)
{
    $this->Index = $index;
    $this->Rows = 0;
    $this->TableName = $table_name;
    $gettableinfo = $connection->prepare("SELECT * FROM `$table_name`;");
    $gettableinfo->execute();
    $result = $gettableinfo->get_result();
    while($row = $result->fetch_assoc())
    {
        $this->TableData[] = $row;
        $this->Rows++;
    }
    
    $getColumnInfo = $connection->prepare("DESCRIBE $this->TableName");
    $getColumnInfo->execute();
    $result = $getColumnInfo->get_result();
    $resultArray = array();
    while($data = $result->fetch_assoc()) {
        $resultArray[] = $data;
    }
    $ArrayKeys = $resultArray[0];
    $ArrayKeys = array_keys($ArrayKeys);
    $this->Test = $resultArray;
    foreach ($resultArray as $result) {
        foreach ($ArrayKeys as $key) {
            $this->TableStructure[$result["Field"]][$key] = $result[$key];
        }
    }
    $this->ColumnNames = array_keys($this->TableStructure);
}

public function Update($connection) {
    $rows = 0;
    $gettableinfo = $connection->prepare("SELECT * FROM `$this->TableName`;");
    $gettableinfo->execute();
    $result = $gettableinfo->get_result();
    $TableData = array();
    while($row = $result->fetch_assoc())
    {
        $TableData[] = $row;
        $rows++;
    }
    $this->TableData = $TableData;
    
    $getColumnInfo = $connection->prepare("DESCRIBE $this->TableName");
    $getColumnInfo->execute();
    $result = $getColumnInfo->get_result();
    $resultArray = array();
    $resultArray = $result->fetch_assoc();
    $ArrayKeys = array_keys($resultArray);
    $this->Test = $resultArray;
    /* 
    foreach ($resultArray as $result) {
        foreach ($ArrayKeys as $key) {
            $this->TableColumns[$key][] = $result[$key];
        }
    } */

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
            <li>Type</li>
            <li>Collation</li>
            <li>Size</li>
        </ul>
    </div>" .
    "</div>";
}

public function DisplayTableListItem()
{
    // Fix displaying of high char count table names 
    print
    "<div class='list-item-wrapper' tablename='". $this->TableName ."'>".
    "<div class='list-item'>". $this->TableName ."</div>".
    "</div>";
}

public function DisplayTable()
{
    $totalFields = sizeof(array_keys($this->ColumnNames));
    $fieldCount = 0;
    print 
    "<table id='tabledisplay'>
        <tr class='tbl-header-row'>";
    foreach ($this->ColumnNames as $field) {
        $style = "";
        if($fieldCount == ($totalFields - 1)) $style = "style='border-right: none;'";
        print "<th class='tbl-header' $style>";
        print $field . "</th>";
        $fieldCount++;
    }
    print "</tr>";
    $fieldCount = 0;
    if($this->Rows > 0) {
        foreach ($this->TableData as $info) {
            print "<tr class='tbl-content-row'>";     
            foreach ($this->ColumnNames as $field) {
                $style = ""; 
                if ($fieldCount == ($totalFields -1)) $style = "style='border-right: none;'";  
                print "<td $style>" . $info[$field] . "</td>";
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
}
?>
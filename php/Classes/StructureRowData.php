<?php 
class StructureRowData {
    public string $Name;
    public string $Type;
    public int $Length;
    public string $Default;
    public string $Attributes;
    public bool $Null;
    public string $Index;
    public bool $AutoIncrement;
    public string $Comment;

    function __construct(string $name, string $type, int $length, string $default, string $attributes, bool $null, string $index, bool $autoIncrement, string $comment)
    {
        $this->Name = $name;
        $this->Type = $type;
        $this->Length = $length;
        $this->Default = $default;
        $this->Attributes = $attributes;
        $this->Null = $null;
        $this->Index = $index;
        $this->AutoIncrement = $autoIncrement;
        $this->Comment = $comment;
    }
}
?>
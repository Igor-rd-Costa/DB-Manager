<?php
class Column {
    public string $Name;
    public int $Index;
    public ?string $Default;
    public bool $Nullable;
    public string $Type;
    public string $DataType;
    public ?int $NumericPrecision;
    public ?string $CharMaxLength;
    public ?string $CharSet;
    public ?string $Collation;
    public string $Key;
    public string $Extra;
    public string $Comment;

    public function __construct(string $Name, int $OrdinalPos, ?string $Default, string $Nullable, string $Type, string $DataType, ?int $NumPrecision, ?string $CharMaxLength, ?string $CharSet, ?string $Collation, string $Key, string $Extra, string $Comment)
    {
        $this->Name = $Name;
        $this->Index = $OrdinalPos;
        $this->Default = $Default;
        if ($Nullable == "NO") $this->Nullable = false;
        else $this->Nullable = true;
        $this->Type = $Type;
        $this->DataType = $DataType;
        $this->NumericPrecision = $NumPrecision;
        $this->CharMaxLength = $CharMaxLength;
        $this->CharSet = $CharSet;
        $this->Collation = $Collation;
        $this->Key = $Key;
        $this->Extra = $Extra;
        $this->Comment = $Comment;
    }
}
?>
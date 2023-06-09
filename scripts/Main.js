class ColumnEntryRequest 
{
    Entry_Name;
    Entry_Type;
    Entry_Default;
    Entry_Collation;
    Entry_Attributes;
    Entry_Null;
    Entry_Index;
    Entry_AI;
    Entry_Comments;

    constructor(Rows)
    {

        
        this.Entry_Name = Rows.getElementsByClassName("Entry_Name")[0].value;
        let Type = Rows.getElementsByClassName("Entry_Type")[0];
        let LenVal = Rows.getElementsByClassName("Entry_LenVal")[0];

        if(LenVal.value)
        {
            this.Entry_Type = Type.value + "("+LenVal.value+")";
        }
        
        
        this.Entry_Default = Rows.getElementsByClassName("Entry_Default")[0].value;
        this.Entry_Collation = Rows.getElementsByClassName("Entry_Collation")[0].value;
        this.Entry_Attributes = Rows.getElementsByClassName("Entry_Attributes")[0].value;
        this.Entry_Null = Rows.getElementsByClassName("Entry_Null")[0].checked;
        this.Entry_Index = Rows.getElementsByClassName("Entry_Index")[0].value;
        this.Entry_AI = Rows.getElementsByClassName("Entry_AI")[0].checked;
        this.Entry_Comments = Rows.getElementsByClassName("Entry_Comments")[0].value;
    }
}

window.addEventListener('resize', () => {
    const ListWrapper = document.getElementById("list-wrapper");
    ResizeForm("table-structure");
    ResizeForm("add-entry");
    if(ListWrapper) {
        const ListItemWrappers = document.getElementsByClassName("list-item-wrapper");
        const TableList = document.getElementById("list-wrapper");    
        const ListItemHeight = parseInt(getComputedStyle(ListItemWrappers[0]).height);
        const TableListHeight = parseInt(getComputedStyle(TableList).height);
        if((ListItemHeight * ListItemWrappers.length) < TableListHeight) {
            ListItemWrappers[ListItemWrappers.length - 1].style.borderBottom = "var(--DefaultBorder)";
        }
        else {
            ListItemWrappers[ListItemWrappers.length - 1].style.borderBottom = "";
        }
    }
})

let TableComments;
document.addEventListener('DOMContentLoaded', () => {
    const Main = document.getElementById("tablewrapper");
    
    document.addEventListener('click', DocOnClick);
    document.addEventListener('mousedown', DocOnMouseDown);
    document.addEventListener('mouseup', DocOnMouseUp);
    
    Main.addEventListener('click', MainOnClick);
    Main.addEventListener('mouseover', MainOnMouseOver);
    Main.addEventListener('mouseout', MainOnMouseOut);
})
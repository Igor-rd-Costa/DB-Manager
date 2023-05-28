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
    const Main = document.getElementById("tablewrapper");
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

document.addEventListener('DOMContentLoaded', () => {
    let profileOptionsDisplay = false;
    const Header = document.getElementById("header");
    const TableWrapper = document.getElementById("tablewrapper");
    const ShowTableList = document.getElementById('tbl-list-display');
    const AddTableElement = document.getElementById('addTable');
    
    TableWrapper.addEventListener('click', (event) => {
        const Target = event.target;
        const TargetTable = Target.closest(".table"); 
        if(TargetTable && TargetTable === AddTableElement) { // Show table creation form
            document.body.style = 'pointer-events: none';
            document.getElementById('pr-options').style.display = "none";
            profileOptionsDisplay = false;
            document.getElementById('menu-title').innerHTML = "Create Table";
            document.getElementById("form").style.display = "block";
            document.getElementById("form").style.height = "fit-content";
            document.getElementById("create-table").style.display = "";
            document.getElementById("add-columns").style.display = "none";
        }
        if (ShowTableList && TargetTable === ShowTableList) { // Show list with all the user's tables
            LoadTableList();
        }
        if (TargetTable && TargetTable != AddTableElement && TargetTable != ShowTableList) { //Show chosen table 
            LoadTable(TargetTable.getAttribute("tablename"), "main");
        }
        if (Target.closest("#back-icon")) {
                const Destination = Target.closest("#back-icon").getAttribute("backto");
                switch (Destination)
            {
                case "main": window.location.href = "http://localhost/BancodeDados/pages/main.php"; 
                    break;
                case "table-list": LoadTableList();
                    break;
                default: LoadTable(Destination, "main");
            }
        }
        if(Target.closest(".add-icon-wrapper")) {
            switch (Target.closest(".add-icon-wrapper").getAttribute("id"))
            {
                case "add-table": {
                    document.body.style = 'pointer-events: none';
                    document.getElementById('pr-options').style.display = "none";
                    profileOptionsDisplay = false;
                    document.getElementById('menu-title').innerHTML = "Create Table";
                    document.getElementById("form").style.display = "block";
                    document.getElementById("form").style.height = "fit-content";
                    document.getElementById("create-table").style.display = "grid";
                    document.getElementById("add-columns").style.display = "none";
                } break;
                case "add-columns": {
                    document.body.style = 'pointer-events: none';
                    document.getElementById('pr-options').style.display = "none";
                    profileOptionsDisplay = false;
                    document.getElementById('menu-title').innerHTML = "Add Columns";
                    document.getElementById("form").style.display = "block";
                    document.getElementById("form").style.height = "fit-content";
                    document.getElementById("create-table").style.display = "none";
                    document.getElementById("add-columns").style.display = "grid";
                } break;
            }
        }
        if(Target.closest(".options-li")) {
            const Option = Target.closest(".options-li");
            switch (Option.id) {
                case "tbl-new-entry": { LoadTableEntryForm();
                } break;
                case "tbl-add-column": {
                    console.log("Add Column");
                } break;
            }
        }
        if (Target.closest(".list-item-wrapper"))
        {
            let table = Target.closest(".list-item-wrapper");
            LoadTable(table.getAttribute("tablename"), "table-list");
        }

    
    })

    TableWrapper.addEventListener('change', (event) => {
        const Target = event.target;

        if(Target.name == "Entry_AI" && Target.checked) {
            const Row = Target.closest(".tableStructureRow");
            Row.getElementsByClassName("Entry_Index")[0].selectedIndex = 1; //PRIMARY
        }
        if(Target.name == "Entry_Default") {
            if (Target.selectedIndex == 1) { //NULL
                const Row = Target.closest(".tableStructureRow");
                Row.getElementsByClassName("Entry_Null")[0].checked = true;
            }
        }

    })
    
    //profile events
    document.addEventListener('click', (event) => {
        const Target = event.target;
        const Profile = Target.closest("#profilewrapper");
        const TblMoreOptions = Target.closest("#tbl-options");
        if(Profile) {
            ToggleOptionMenuDisplay("pr-options");
        }
        else if (TblMoreOptions) {
            ToggleOptionMenuDisplay("tbl-option-list");
        }
        else {
            CloseAllOptionMenus();
        }
    })
})
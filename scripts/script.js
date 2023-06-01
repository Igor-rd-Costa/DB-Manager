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
            document.getElementById("create-table").style.display = "grid";
            document.getElementById("add-columns").style.display = "";
        }
        if (ShowTableList && TargetTable === ShowTableList) { // Show list with all the user's tables
            LoadTableList();
        }
        if (TargetTable && TargetTable != AddTableElement && TargetTable != ShowTableList) { //Show chosen table 
            LoadTable(TargetTable.getAttribute("tablename"), "main");
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
                    document.getElementById("add-columns").style.display = "";
                    document.getElementById("insert-columns").style.display = "";
                    document.getElementById("create-table").style.display = "grid";
                } break;
                case "add-columns": {
                    document.body.style = 'pointer-events: none';
                    document.getElementById('pr-options').style.display = "none";
                    profileOptionsDisplay = false;
                    document.getElementById('menu-title').innerHTML = "Add Columns";
                    document.getElementById("form").style.display = "block";
                    document.getElementById("form").style.height = "fit-content";
                    document.getElementById("create-table").style.display = "";
                    document.getElementById("insert-columns").style.display = "";
                    document.getElementById("add-columns").style.display = "grid";
                } break;
            }
        }
        if(Target.closest(".options-li")) {
            const Option = Target.closest(".options-li");
            switch (Option.id) {
                case "tbl-new-entry": { 
                    LoadTableEntryForm();
                } break;
                case "tbl-add-column": { 
                    document.body.style = 'pointer-events: none';
                    document.getElementById('pr-options').style.display = "none";
                    document.getElementById('tbl-option-list').style.display = "none";
                    profileOptionsDisplay = false;
                    document.getElementById('menu-title').innerHTML = "Insert Column"; 
                    document.getElementById("form").style.display = "block";
                    document.getElementById("form").style.height = "fit-content";
                    document.getElementById("create-table").style.display = "";
                    document.getElementById("add-columns").style.display = "";
                    document.getElementById("insert-columns").style.display = "grid";

                    const TableHeaders = document.getElementsByClassName("tbl-header-row")[0].children;
                    let ColumnNames = [];
                    for (let x = 0; x < TableHeaders.length; x++) {
                        ColumnNames[x] = TableHeaders[x].querySelector("span").innerHTML;
                    }
                    let OptionElement;
                    document.getElementById("table-columns").innerHTML = "";
                    ColumnNames.forEach(name => {
                        OptionElement = document.createElement("option");
                        OptionElement.innerHTML = name;
                        document.getElementById("table-columns").appendChild(OptionElement);
                    })
                } break;
            } 
        }
        if (Target.closest(".list-item-wrapper"))
        {
            let table = Target.closest(".list-item-wrapper");
            LoadTable(table.getAttribute("tablename"), "table-list");
        }
    })

    TableWrapper.addEventListener('mouseover', (event) => {
        const Target = event.target;
        const CommentIcon = Target.closest(".commentIconImg"); 
        if (CommentIcon) {
            const CommentBox = document.getElementById("comment-box");
            let offSetX = CommentIcon.offsetLeft / 16;
            let offSetY = CommentIcon.offsetTop / 16;
            let TargetWidth = parseInt(getComputedStyle(CommentIcon).width) / 16;
            let TargetHeight = parseInt(getComputedStyle(CommentIcon).height) / 16;
            CommentBox.style.display = "grid";
            CommentBox.style.left = (offSetX + TargetWidth) + "rem";
            CommentBox.style.top = (offSetY + TargetHeight) + "rem";
            const columnName = Target.closest(".tbl-header").querySelector("span").innerHTML;
            CommentBox.innerHTML = "<span>" + TableComments[columnName] + "</span>";
        }
    })
    TableWrapper.addEventListener('mouseout', (event) => {
        const Target = event.target;
        const CommentIcon = Target.closest(".commentIconImg"); 
        if (CommentIcon) {
            const CommentBox = document.getElementById("comment-box");
            CommentBox.style.display = "";
            CommentBox.innerHTML = "";
            CommentBox.style.top = "";
            CommentBox.style.left = "";
        }
    })

    TableWrapper.addEventListener('change', (event) => {
        const Target = event.target;

        if(Target.name == "Entry_AI" && Target.checked) {
            const Row = Target.closest(".tableStructureRow");
            Row.getElementsByClassName("Entry_Index")[0].selectedIndex = 1; //PRIMARY
        }
        if(Target.name == "Entry_Default") {
            console.log(Target.selectedIndex);
            if (Target.selectedIndex == 1) { //NULL
                const Row = Target.closest(".tableStructureRow");
                Row.getElementsByClassName("Entry_Null")[0].checked = true;
            }
        }
        if(Target.name == "columnInsertOption") {
            console.log(Target);
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
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
    const ShowTableList = document.getElementById('tbl-list-display');
    const AddTableElement = document.getElementById('addTable');
    const Header = document.getElementById("header");
    const Main = document.getElementById("tablewrapper");
    
    Main.addEventListener('click', HandleMainClick);

    Main.addEventListener('mouseover', (event) => {
        const Target = event.target;
        const CommentIcon = Target.closest(".commentIconImg");
        const TableOptions = Target.closest(".tblEditOptions");
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
        if(TableOptions) {
            const Row = Target.closest(".tbl-content-row");
            const RemoveIcon = Target.closest(".removeIcon");
            switch(Target) {
                case RemoveIcon: {
                    Row.style.color = "rgb(151, 98, 216)";
                }
            }
        }
    })
    Main.addEventListener('mouseout', (event) => {
        const Target = event.target;
        const CommentIcon = Target.closest(".commentIconImg");
        const TableOptions = Target.closest(".tblEditOptions");
        if (CommentIcon) {
            HideCommentBox();
        }
        if(TableOptions) {
            const Row = Target.closest(".tbl-content-row");
            const RemoveIcon = Target.closest(".removeIcon");
            switch(Target) {
                case RemoveIcon: {
                    Row.style.color = "";
                }
            }
        }
    })

    Main.addEventListener('change', (event) => {
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
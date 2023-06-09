function MainOnClick(e) {
    const Table = e.target.closest(".table");
    const TableDisplayWrapper = e.target.closest("#table-display-wrapper");
    const TableListWrapper = e.target.closest("#list-wrapper");
    
    const ShowTableList = document.getElementById('tbl-list-display');
    const AddTableElement = document.getElementById('addTable');
    const AddIcon = e.target.closest(".add-icon-wrapper");
    const DeleteIcon = e.target.closest(".removeIcon");

    if (Table) {
        switch (Table) {
            case AddTableElement: { ShowForm(FORM.CreateTable);
            } break;
            case ShowTableList: { LoadTableList();
            } break;
            default: { LoadTable(Table.getAttribute("tablename"), "main");
            } break;
        }
        return;
    }
    if (TableDisplayWrapper) {
        const DisplayTableMenu = e.target.closest("#display-table-menu");  
        const TableOptions = e.target.closest(".options-li");
        if (DisplayTableMenu) {
            const Option = e.target.closest("div");        
            const SelectedOpt = DisplayTableMenu.querySelector(".opt-selected");
            function SwapSelectedOption() {
                    SelectedOpt.classList.remove("opt-selected");
                    Option.classList.add("opt-selected");
            }
            if(Option != SelectedOpt) {
                switch (Option.id) {
                    case "tbl-browse-opt": {
                        SwapSelectedOption();
                        LoadTableBrowse();
                    } break;
                    case "tbl-structure-opt": {
                        SwapSelectedOption();
                        LoadTableStructure();
                    } break;
                }    
            }
        }
        else if (TableOptions) {
            switch (TableOptions.id) {
                case "tbl-new-entry": { ShowForm(FORM.InsertEntry);
                } break;
                case "tbl-add-column": { ShowForm(FORM.InsertColumn);
                } break;
                case "drop-table": { 
                    const Click = new Event('click', {'bubbles': true});
                    DropTable().then(() => {
                        document.getElementById("back-icon").dispatchEvent(Click);
                    })
                } break;
            }
        }
        else if (DeleteIcon) {
            const Row = e.target.closest(".tbl-content-row");
            switch (DeleteIcon.id) {
                case "delete-row": {
                    const DataElements = Row.getElementsByClassName("tblData");
                    let Data = [];
                    for (let x = 0; x < DataElements.length; x++) {
                        Data[x] = DataElements[x].innerHTML;
                    }
                    DeleteTableRow(Data);
                } break;
                case "drop-column": {
                    const ColumnName = Row.querySelector(".column-name").innerHTML;
                    DropTableColumn(ColumnName).then(() => {
                        LoadTableStructure();
                    })
                } break;
            }
        }
        return;
    }
    if (TableListWrapper) {
        const TableListItem = e.target.closest(".list-item-wrapper");  
        if (TableListItem) {
            const DropTableIcon = e.target.closest("#drop-table");
            if (DropTableIcon) {
                DropTable(TableListItem.querySelector(".listTblName").innerHTML).then(() => {
                    LoadTableList();
                })
            }
            else LoadTable(TableListItem.getAttribute("tablename"), "table-list");
        }
        return;
    }
    else if (AddIcon) {
        switch (AddIcon.id) {
            case "add-table": { ShowForm(FORM.CreateTable);
            } break;
            case "add-columns": { ShowForm(FORM.AddColumns);
            } break;
        }
    }
}

function MainOnMouseOver(e) {
    const Target = e.target;
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
            } break;
        }
    }
}

function MainOnMouseOut(e) {
    const Target = e.target;
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
}
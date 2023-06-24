function MainOnClick(e) {
    const Table = e.target.closest(".table");
    const TableDisplayWrapper = e.target.closest("#table-display-wrapper");
    const TableListWrapper = e.target.closest("#list-wrapper");
    
    const ShowTableList = document.getElementById('tbl-list-display');
    const AddTableElement = document.getElementById('addTable');
    const AddIcon = e.target.closest(".add-icon-wrapper");
    const DeleteIcon = e.target.closest(".removeIcon");
    const EditIcon = e.target.closest(".editIcon");

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
            if(Option != SelectedOpt) {
                switch (Option.id) {
                    case "tbl-browse-opt": {
                        LoadTableBrowse();
                    } break;
                    case "tbl-structure-opt": {
                        LoadTableStructure();
                    } break;
                }    
            }
        }
        else if (TableOptions) {
            switch (TableOptions.id) {
                case "tbl-new-entry": { ShowForm(FORM.InsertEntry); } break;
                case "tbl-add-column": { ShowForm(FORM.InsertColumn); } break;
                case "rename-table": { 
                    const dblClickEvent = new Event('dblclick', { 'bubbles': true });
                    const TableMenu = e.target.closest("#table-menu");
                    const Title = TableMenu.querySelector("#title");
                    Title.dispatchEvent(dblClickEvent);

                } break;
                case "drop-table": { 
                    const Click = new Event('click', {'bubbles': true});
                    DropTable().then(() => {
                        document.getElementById("back-icon").dispatchEvent(Click);
                    })
                } break;
            }
        }
        else if (EditIcon) {
            const Row = e.target.closest(".tbl-content-row");
            switch (EditIcon.id) {
                case "edit-column": {
                    LoadTableStructureForm(TableStructureFormMode.AlterColumn, Row.querySelector(".column-name").innerText, 1);
                }
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
                    const ColumnName = Row.querySelector(".column-name").innerText;
                    DropTableColumn(ColumnName).then(() => {
                        LoadTableStructure();
                    })
                } break;
            }
        }
        return;
    }
    else if (TableListWrapper) {
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

function MainOnDblClick(e) {
    const Target = e.target;
    const Main = document.getElementById("tablewrapper");
    if (Main.classList.contains("displayTable") && Target.id == "title") {
        displayedTableName = Target.innerHTML;
        Target.contentEditable = true;
        Target.focus();
        Target.addEventListener('keydown', TblTitleOnKeyDown);
        Target.addEventListener('focusout', TblTitleOnFocusOut);
        document.getElementById("tbl-options").style.pointerEvents = "none";
        document.getSelection().setPosition(Target, 1);
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

function TblTitleOnFocusOut(e) {
    const Target = e.target;
    document.getElementById("tbl-options").style.pointerEvents = "all";
    Target.removeEventListener('focusout', TblTitleOnFocusOut);
    const Main = document.getElementById("tablewrapper");
    if (Main.classList.contains("displayTable") && Target.id == "title") {
        if ((Target.innerHTML != displayedTableName) && (Target.innerHTML != "<br>")) {
            ShowConfirmationPopUp("Rename table "+displayedTableName+" to "+Target.innerHTML+"?").then(() => {
                RenameTable(Target.innerHTML.replace(' ', ''));
            })
            .catch(() => {
                Target.contentEditable = false;
                Target.innerHTML = displayedTableName;
            })
            .finally(() => { Target.removeEventListener('keydown', TblTitleOnKeyDown); })
        }
        else {
            Target.contentEditable = false;
            Target.innerHTML = displayedTableName;
        }
    }
}

function TblTitleOnKeyDown(e) {
    const Target = e.target;
    if (e.keyCode === 13) { // Enter
        e.preventDefault(); 
        let focusOut = new Event('focusout', {'bubbles': true});
        Target.dispatchEvent(focusOut);
    }
}
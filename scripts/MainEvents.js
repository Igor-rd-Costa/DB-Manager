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
                    const Title = TableMenu.querySelector("#tbl-title");
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
                        LoadTable('', 'main');
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
        const columnName = Target.closest(".tbl-header").querySelector("span").innerText;
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

function MainOnDblClick(e) {
    const Target = e.target;
    const Main = document.getElementById("tablewrapper");
    if (Target.classList.contains("content-editable")) {
        EditTargetName = Target.innerText;
        Target.contentEditable = true;
        Target.focus();
        Main.addEventListener("focusout", MainOnFocusOut);
        Main.addEventListener('keydown', MainOnKeyDown);
        document.getElementById("tbl-options").style.pointerEvents = "none";
        document.getSelection().setPosition(Target, 1);
        if (Target.nextSibling && Target.nextSibling.nodeName === "IMG" && Target.nextSibling.classList.contains("commentIconImg")) {
            Target.nextSibling.style.pointerEvents = "none";
        }
        
    }
}


function MainOnKeyDown(e) {
    const Target = e.target;
    if (e.keyCode === 13) { // Enter
        if (Target.classList.contains("content-editable")) {
            e.preventDefault(); 
            Target.blur();
        }
    }
}

async function MainOnFocusOut(e) {
    const Target = e.target;
    if (Target.classList.contains("content-editable")) {
        document.getElementById("tbl-options").style.pointerEvents = "all";
        const Main = document.getElementById("tablewrapper");
        Main.removeEventListener('focusout', MainOnFocusOut);
        Main.removeEventListener('keydown', MainOnKeyDown);
        let WarningMsg = "";
        let CallFunction; 
        switch (Target.id) {
            case "tbl-title": { WarningMsg = "Rename table "+EditTargetName+" to "+Target.innerText+"?"; CallFunction = RenameTable; } break;
            case "column-name": { WarningMsg = "Rename column "+EditTargetName+" to "+Target.innerText+"?"; CallFunction = RenameColumn; } break;
        }
        if ((Target.innerText != EditTargetName) && (Target.innerText != "\n") && (Target.innerText != "")) {
            if (Target.id != "table-data") {
                ShowConfirmationPopUp(WarningMsg).then(() => {
                    CallFunction(Target.innerText.replace(' ', ''), EditTargetName);
                    if (Target.id === "column-name") {
                        TableComments[Target.innerText.replace(' ', '')] = TableComments[EditTargetName];
                        delete TableComments[EditTargetName];
                    }
                })
                .catch(() => {
                    Target.contentEditable = false;
                    Target.innerHTML = EditTargetName;
                })
                .finally(() => {
                    if (Target.nextSibling && Target.nextSibling.nodeName === "IMG" && Target.nextSibling.classList.contains("commentIconImg")) {
                        Target.nextSibling.style.pointerEvents = "all";
                    }
                })
            }
            else {
                GetPrimaryKey().then((PrimKey) => {
                    const TableHeaders = Array.from(document.getElementsByClassName("tbl-header-row")[0].querySelectorAll(".tbl-header span"));
                    const Headers = new Array; 
                    TableHeaders.forEach(element => {
                        Headers.push(element.innerText);
                    })
                    const Row = Array.from(Target.closest(".tbl-content-row").querySelectorAll(".tblData"));
                    const changeIndex = Row.indexOf(Target.closest(".tblData"));
                    const ColumnName = document.getElementById("tabledisplay").querySelector(".tbl-header-row").querySelectorAll(".tbl-header")[changeIndex].querySelector("span").innerText; 
                    UpdateTableData(Target.innerText, ColumnName, Row[Headers.indexOf(PrimKey)].innerText).catch(()=>{
                        Target.contentEditable = false;
                        Target.innerHTML = EditTargetName;
                    })
                })
                .catch((error) => {
                    alert(error);
                })
            }
        }
        else {
            Target.contentEditable = false;
            Target.innerHTML = EditTargetName;
            if (Target.nextSibling && Target.nextSibling.nodeName === "IMG" && Target.nextSibling.classList.contains("commentIconImg")) {
                Target.nextSibling.style.pointerEvents = "all";
            }
        }
        

    }
}

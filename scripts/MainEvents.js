function HandleMainClick(e) {
    const ShowTableList = document.getElementById('tbl-list-display');
    const AddTableElement = document.getElementById('addTable');
    const Table = e.target.closest(".table");
    const AddIcon = e.target.closest(".add-icon-wrapper");
    const TableOptions = e.target.closest(".options-li");
    
    const TableListItem = e.target.closest(".list-item-wrapper");
    
    const DisplayTableMenu = e.target.closest("#display-table-menu");    
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
    }
    else if (AddIcon) {
        switch (AddIcon.id) {
            case "add-table": { ShowForm(FORM.CreateTable);
            } break;
            case "add-columns": { ShowForm(FORM.AddColumns);
            } break;
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
    else if (TableListItem) {
        const DropTableIcon = e.target.closest("#drop-table");
        if (DropTableIcon) {
            DropTable(TableListItem.querySelector(".listTblName").innerHTML).then(() => {
                LoadTableList();
            })
        }
        else LoadTable(TableListItem.getAttribute("tablename"), "table-list");
    }
    else if (DisplayTableMenu) {
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
}
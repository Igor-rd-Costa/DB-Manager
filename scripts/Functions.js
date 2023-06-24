function AnimateElement(element, from, to, duration, direction = 'normal', timing = 'linear')
{
    const animation = element.animate([from, to], {
        duration: duration,
        iterations: 1,
        fill: 'forwards',
        direction: direction,
        easing: timing
    });
    return animation;
}

function ToggleOptionMenuDisplay(menuID) {
    const OptionMenu = document.getElementById(menuID);
    const MenuDisplay = getComputedStyle(OptionMenu).display;
    if(MenuDisplay == "none") {
        OptionMenu.style.display = "block";
    }
    else {
        OptionMenu.style.display = "";
    }
}

function CloseAllOptionMenus() {
    const Menus = document.getElementsByClassName("options-ul");
    for (let x = 0; x < Menus.length; x++) {
        if(getComputedStyle(Menus[x]).display != "none") {
            Menus[x].style.display = "";
        }
    }
}

function ResizeForm(FormID, FormHeaderClass = "default-menu") {
    const Main = document.getElementById("tablewrapper");
    const Form = document.getElementById(FormID);
    if(Form) {
        const FormHeader = document.getElementsByClassName(FormHeaderClass)[0];
        const MainHeight = parseFloat(getComputedStyle(Main).height);
        const FormHeaderHight = parseFloat(getComputedStyle(FormHeader).height);
        const RowGap = parseFloat(getComputedStyle(Main).rowGap);
        let result = MainHeight - FormHeaderHight - RowGap;
        result = result / 16;
        Form.style.maxHeight = result + "rem";
    }
}

function LoadTableList()
{
    let LoadTableListRequest = new XMLHttpRequest();
    
    LoadTableListRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            const Main = document.getElementById('tablewrapper'); 
            Main.innerHTML = this.response;
            Main.style.gridTemplateColumns = "1fr";
            Main.style.gridTemplateRows = "2rem 1fr";
            Main.style.rowGap = "calc(var(--DefaultBorderWidth) * 2)";

            
            const ListItemWrappers = document.getElementsByClassName("list-item-wrapper");
            const TableList = document.getElementById("list-wrapper");
            const ListItemHeight = parseInt(getComputedStyle(ListItemWrappers[0]).height);
            const TableListHeight = parseInt(getComputedStyle(TableList).height);
            if((ListItemHeight * ListItemWrappers.length) < TableListHeight) {
                ListItemWrappers[ListItemWrappers.length - 1].style.borderBottom = "var(--DefaultBorder)";
            }
        }
    }
    LoadTableListRequest.open('POST', '../php/Async/LoadTableList.php', true);
    LoadTableListRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    LoadTableListRequest.send("LoadTables=true");
}

function LoadTable(TableName, Origin)
{
    let LoadTableRequest = new XMLHttpRequest();
    LoadTableRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            const Main = document.getElementById('tablewrapper');
            let response = this.responseText.split("$@#$");
            if(response[1]) TableComments = JSON.parse(response[1]);
            Main.innerHTML = response[0];
            Main.className = "displayTable";
            Main.addEventListener('dblclick', MainOnDblClick);

            document.getElementById('back-icon').setAttribute("backto", Origin);
        }
    }
    LoadTableRequest.open('POST', '../php/Async/DisplayTable.php', true);
    LoadTableRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    LoadTableRequest.send('TableName=' + TableName);
}

function LoadTableBrowse() {
    const loadTableBrowseRequest = new XMLHttpRequest();
    loadTableBrowseRequest.onreadystatechange=function(){
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tbl-display-content").innerHTML = this.responseText;
            document.getElementById("tbl-structure-opt").classList.remove("opt-selected");
            document.getElementById("tbl-browse-opt").classList.add("opt-selected");
        }
    }
    loadTableBrowseRequest.open('POST', '../php/Async/TableDisplay.php', true);
    loadTableBrowseRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loadTableBrowseRequest.send('Request=Browse');
}

function LoadTableStructure() {
    const loadTableStructureRequest = new XMLHttpRequest();
    loadTableStructureRequest.onreadystatechange=function(){
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tbl-display-content").innerHTML = this.responseText;
            document.getElementById("tbl-browse-opt").classList.remove("opt-selected");
            document.getElementById("tbl-structure-opt").classList.add("opt-selected");
        }
    }
    loadTableStructureRequest.open('POST', '../php/Async/TableDisplay.php', true);
    loadTableStructureRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loadTableStructureRequest.send('Request=Structure');
}

class TableStructureFormMode {
    static NewTable = 0;
    static AddColumn = 1;
    static AlterColumn = 2;
}

function LoadTableStructureForm(FormMode, TargetName, NumberOfColumns = 1, InsertOption = "") {
    // TargetName = Name of the Table or Column, depending on Mode
    if (FormMode === TableStructureFormMode.AddColumn){
        TargetName = document.getElementById("table-columns").value;
    }
    if (NumberOfColumns < 1) NumberOfColumns = 1;

    
    const tblStructureFormRequest = new XMLHttpRequest();
    tblStructureFormRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText.includes("[Request Error]")) {
                alert(this.responseText.split("[Request Error]")[1]);
            }
            else {
                const Main = document.getElementById('tablewrapper');
                document.getElementById("form").style = "display: none;";
                
                document.body.style = "pointer-events: all;";
                Main.innerHTML = this.response;
                Main.className = "tableStructureForm";
                if(FormMode === TableStructureFormMode.NewTable) {
                    document.getElementById("Table_Name").value = TargetName;
                }
                else if (FormMode === TableStructureFormMode.AlterColumn) {
                    GetColumnInfo(TargetName).then((columnInfo) => {
                        columnInfo = JSON.parse(columnInfo);
                        const Table = document.getElementById("structure-table");
                        const Row = Table.querySelector(".tableStructureRow");
                        const RowChilds = Row.children;
                        for (x = 0; x < RowChilds.length; x++) {
                            let Input = RowChilds[x].firstElementChild;
                            switch (Input.name) {
                                case "Entry_Name": {
                                    Input.value = columnInfo.Name;
                                } break;
                                case "Entry_Type": {
                                    switch (columnInfo.DataType) {
                                        case "int": Input.selectedIndex = 0; break;
                                        case "varchar": Input.selectedIndex = 1; break;
                                    }
                                } break;
                                case "Entry_LenVal": {
                                    Input.value = columnInfo.Type.split('(')[1].split(')')[0];
                                } break;
                                case "Entry_Default": {
                                    switch (columnInfo.Default) {
                                        case "None": Input.selectedIndex = 0; break;
                                        case "NULL": Input.selectedIndex = 1; break;
                                    }
                                } break;
                                case "Entry_Attributes": {
                                    if(columnInfo.Collation && columnInfo.Collation.includes("_bin")) Input.selectedIndex = 1;
                                    else if (columnInfo.Type.includes('unsigned')) {
                                        if (columnInfo.Type.includes('zerofill')) Input.selectedIndex = 3;
                                        else Input.selectedIndex = 2;
                                    } 
                                } break;
                                case "Entry_Null": {
                                    if (columnInfo.Nullable) Input.checked = true;
                                } break;
                                case "Entry_Index": {
                                    if (columnInfo.Key === "PRI") Input.selectedIndex = 1;
                                } break;
                                case "Entry_AI": {
                                    if (columnInfo.Extra === "auto_increment") Input.checked = true;
                                } break;
                                case "Entry_Comments": {
                                    Input.value = columnInfo.Comment;
                                } break;
                            }
                        }
                    })
                }
                ResizeForm("table-structure");
                document.getElementById("table-structure").addEventListener('submit', TableStructureOnSubmit);
                document.getElementById("table-structure").addEventListener('change', TableStructureOnChange);
            }
        }
    }
    tblStructureFormRequest.open('POST', '../php/Async/TableStructureForm.php', true);
    tblStructureFormRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    if (FormMode === TableStructureFormMode.NewTable) { // Create new table
        tblStructureFormRequest.send('FormMode='+FormMode+'&TableName=' + TargetName + '&NumberOfColumns=' + NumberOfColumns);
    }
    else if (FormMode === TableStructureFormMode.AddColumn) { // Insert Column
        tblStructureFormRequest.send('FormMode='+FormMode+'&NumberOfColumns=' + NumberOfColumns + '&InsertOption=' + InsertOption + '&ColumnName=' + TargetName);
    }
    else if (FormMode === TableStructureFormMode.AlterColumn) { // Alter Column
        tblStructureFormRequest.send('FormMode='+FormMode+'&NumberOfColumns=' + NumberOfColumns + '&ColumnName=' + TargetName);
    }
}

function GetColumnInfo(TargetName) {
    return new Promise((resolve) => {

        const columnInfoRequest = new XMLHttpRequest();
        columnInfoRequest.onreadystatechange=function (){
            if(this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        }
        columnInfoRequest.open('POST', '../php/Async/Queries.php');
        columnInfoRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        columnInfoRequest.send("ColumnName="+TargetName);
    })
}

function GenerateStructureTableRow() {
    const TableRow = document.getElementsByClassName("tableStructureRow")[0].cloneNode(true);
    const TableData = TableRow.children;
    for(let x = 0; x < TableData.length; x++) {
        let Element = TableData[x].firstElementChild;
        switch (Element.name) {
            case "Entry_Name": Element.value = "";
            break;
            case "Entry_Type": Element.value = "INT";
            break;
            case "Entry_LenVal": Element.value = "";
            break;
            case "Entry_Default": Element.value = "None";
            break;
            case "Entry_Attributes": Element.value = "";
            break;
            case "Entry_Null": Element.checked = false;
            break;
            case "Entry_Index": Element.value = "---";
            break;
            case "Entry_AI": Element.checked = false;
            break;
            case "Entry_Comments": Element.value = "";
            break;
        }
    }
    return TableRow;
}

function DeleteTableRow(Data) {
    ShowConfirmationPopUp("Remove row from table?")
        .then(() => {
            jsonData = JSON.stringify(Data);
            const deleteRowRequest = new XMLHttpRequest();
            deleteRowRequest.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText) {
                        alert(this.responseText);
                    }
                    else {
                        LoadTableBrowse();
                    }
                }
            }
            deleteRowRequest.open('POST', '../php/Async/DeleteRow.php', true);
            deleteRowRequest.setRequestHeader('Content-Type', 'application/json');
            deleteRowRequest.send(jsonData);
        })
        .catch(() => {
            
        })
}

function DropTableColumn(ColumnName) {
    return new Promise((resolve) => {
        ShowConfirmationPopUp("This action is permanent!<br>Drop column " + ColumnName  + "?")
        .then(() => {
            const dropColumnRequest = new XMLHttpRequest();
            dropColumnRequest.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText) alert(this.responseText);
                    resolve();
                }
            }
            dropColumnRequest.open('POST', '../php/Async/DropColumn.php', true);
            dropColumnRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            dropColumnRequest.send("ColumnName="+ColumnName);
        })
        .catch(() => {
            
        })
    })
}

function DropTable(TableName = "") {
    return new Promise((resolve) => {
        ShowConfirmationPopUp("This action is permanent!<br>Destroy table?")
        .then(() => {
            const dropTableRequest = new XMLHttpRequest();
            dropTableRequest.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText) {
                        alert(this.responseText);
                    }
                    resolve();
                }
            }
            dropTableRequest.open('POST', '../php/Async/DropTable.php', true);
            dropTableRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            dropTableRequest.send('TableName='+TableName);
        })
        .catch(() => {
            
        })    
    })
}

function RenameTable(newName) {
    const renameRequest = new XMLHttpRequest();
    renameRequest.onreadystatechange=function () {
        if(this.readyState === 4 && this.status === 200) {
            if (this.responseText) {
                alert(this.responseText);
            }
        }        
    }
    renameRequest.open('POST', '../php/Async/EditQueries.php', true);
    renameRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    renameRequest.send("RenameTable="+newName);
}

function ShowConfirmationPopUp(ConfirmationMessage) {
    return new Promise((confirm, deny) => {
        const PopUp = document.getElementById("confirmation-popup");

        PopUp.style.display = "grid";
        PopUp.querySelector("span").innerHTML = ConfirmationMessage;
        PopUp.querySelector("#confirm-popup").focus();
        PopUp.addEventListener('click', (event) => {
            const Target = event.target;
            if(Target.id == "confirm-popup") {
                confirm();
                PopUp.removeEventListener('click', (event));
                PopUp.style.display = "none";
                PopUp.querySelector("span").innerHTML = "";
            }
            if (Target.id == "deny-popup") {
                deny();
                PopUp.removeEventListener('click', (event));
                PopUp.style.display = "none";
                PopUp.querySelector("span").innerHTML = "";
            }
        })
    })
}

function HideCommentBox() {
    const CommentBox = document.getElementById("comment-box");
    CommentBox.style.display = "";
    CommentBox.innerHTML = "";
    CommentBox.style.top = "";
    CommentBox.style.left = "";
}

function RequestLogin(username, password)
{
    let loginRequest = new XMLHttpRequest();
    loginRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            if(this.responseText)
            {
                document.getElementById("error-msg").innerHTML = this.responseText;
            }
            else
            {
                document.getElementById("error-msg").innerHTML = "";
                window.location.href = "pages/main.php";
            }
        }
    }
    loginRequest.open('POST', 'php/Async/Login.php', true);
    loginRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginRequest.send('usernameLogin=' + username + '&passwordLogin=' + password);
}

function RequestRegister(firstname, lastname, email, username, password)
{
    let registerRequest = new XMLHttpRequest();
    registerRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            if(this.responseText)
            {
                document.getElementById('reg-error-msg').innerHTML = this.responseText; 
            }
            else
            {
                document.getElementById("reg-error-msg").innerHTML = "";
                window.location.href = "pages/main.php";
            }
        }
    }
    registerRequest.open('POST', 'php/Async/Register.php', true);
    registerRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    registerRequest.send('REG_FirstName=' + firstname + '&REG_LastName=' + lastname + '&REG_Email=' + email + '&REG_Username=' + username + '&REG_Password=' + password);
}
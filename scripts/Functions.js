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
        }
    }
    loadTableStructureRequest.open('POST', '../php/Async/TableDisplay.php', true);
    loadTableStructureRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loadTableStructureRequest.send('Request=Structure');
}

function LoadTableStructureForm(TargetName, NumberOfColumns, Mode, InsertOption = "")
{
    // TargetName = Name of the Table or Column, depending on Mode
    // Mode 0 = Structure Form for a new table, 1 = Structure Form to add columns to an existing table
    if (Mode === 1){
        TargetName = document.getElementById("table-columns").value;
    }
    
    let tblStructureFormRequest = new XMLHttpRequest();
    tblStructureFormRequest.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            if(this.responseText.includes("[Request Error]")) {
                alert(this.responseText.split("[Request Error]")[1]);
            }
            else {
                const Main = document.getElementById('tablewrapper');
                document.getElementById("form").style = "display: none;";
                
                document.body.style = "pointer-events: all;";
                Main.innerHTML = this.response;
                Main.className = "tableStructureForm";
                if(Mode === 0) {
                    document.getElementById("Table_Name").value = TargetName;
                }
                
                ResizeForm("table-structure");
                document.getElementById("table-structure").addEventListener('submit', TableStructureOnSubmit);
                document.getElementById("table-structure").addEventListener('change', TableStructureOnChange);
            }
        }
    }
    tblStructureFormRequest.open('POST', '../php/Async/TableStructureForm.php', true);
    tblStructureFormRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (Mode === 0) { // Create new table
        tblStructureFormRequest.send('TableName=' + TargetName + '&NumberOfColumns=' + NumberOfColumns);
    }
    if (Mode === 1) { // Insert Column
        tblStructureFormRequest.send('NumberOfColumns=' + NumberOfColumns + "&InsertOption=" + InsertOption + "&ColumnName=" + TargetName);
    }
}

function GenerateStructureTableRow() {
    const TableRow = document.getElementsByClassName("tableStructureRow")[0].cloneNode(true);
    const TableData = TableRow.children;
    TableData.length
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

function ShowConfirmationPopUp(ConfirmationMessage) {
    return new Promise((confirm, deny) => {
        const PopUp = document.getElementById("confirmation-popup");

        PopUp.style.display = "grid";
        PopUp.querySelector("span").innerHTML = ConfirmationMessage;
        
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
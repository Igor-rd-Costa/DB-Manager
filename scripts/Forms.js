class FORM {
    static Login = 0;
    static Register = 1;
    static CreateTable = 2;
    static AddColumns = 3;
    static InsertColumn = 4;
    static InsertEntry = 5;
}

class StructureRowData {
    Name;
    Type;
    Length;
    Default;
    Attributes;
    Null;
    Index;
    AutoIncrement;
    Comment;
};

class NewEntryRowData {
    Name;
    Type;
    Null;
    Data;
};

document.addEventListener('DOMContentLoaded', () => {
    const Forms = document.getElementById("form");
    Forms.addEventListener('click', FormsOnClick);
})

function ShowForm(form) {
    switch (form) {
        case FORM.Login: {
            document.getElementById('login').style.display = "grid";
            document.getElementById('register').style.display = "";
            document.getElementById('form').style.display = 'block';
            document.getElementById('menu-title').innerHTML = "Login";
            document.getElementById("back-icon").style.display = "";
            document.body.style.pointerEvents = "none";
            document.getElementById("login").addEventListener('submit', LoginOnSubmit);
        } break;
        case FORM.Register: {
            document.getElementById("back-icon").style.display = "grid";
            document.getElementById("menu-title").innerHTML = "Register";
            document.getElementById("login").style.display = "none";
            document.getElementById("register").style.display = "grid";
            document.getElementById("button-register").style.borderBottomWidth = "";
            document.getElementById("button-register").style.borderRightWidth = "";
            document.getElementById("register").addEventListener('submit', RegisterOnSubmit);
        } break;
        case FORM.CreateTable: {
            document.body.style = 'pointer-events: none';
            document.getElementById('pr-options').style.display = "none";
            document.getElementById('menu-title').innerHTML = "Create Table";
            document.getElementById("form").style.display = "block";
            document.getElementById("form").style.height = "fit-content";
            document.getElementById("create-table").style.display = "grid";
            document.getElementById("add-columns").style.display = "";
            document.getElementById("create-table").addEventListener('submit', CreateTableOnSubmit);
        } break;
        case FORM.AddColumns: {
            document.body.style = 'pointer-events: none';
            document.getElementById('pr-options').style.display = "none";
            document.getElementById('menu-title').innerHTML = "Add Columns";
            document.getElementById("form").style.display = "block";
            document.getElementById("form").style.height = "fit-content";
            document.getElementById("create-table").style.display = "";
            document.getElementById("insert-columns").style.display = "";
            document.getElementById("add-columns").style.display = "grid";
            document.getElementById("add-columns").addEventListener('submit', AddColumnsOnSubmit);    
        } break;
        case FORM.InsertColumn: {
            document.body.style = 'pointer-events: none';
            document.getElementById('pr-options').style.display = "none";
            document.getElementById('tbl-option-list').style.display = "none";
            document.getElementById('menu-title').innerHTML = "Insert Column"; 
            document.getElementById("form").style.display = "block";
            document.getElementById("form").style.height = "fit-content";
            document.getElementById("create-table").style.display = "";
            document.getElementById("add-columns").style.display = "";
            document.getElementById("insert-columns").style.display = "grid";
            document.getElementById("insert-columns").addEventListener('submit', InsertColumnsOnSubmit);
            document.getElementById("insert-columns").addEventListener('change', InsertColumnsOnChange);


            const TableColumnsSelect = document.getElementById("table-columns");
            document.getElementById("table-columns").innerHTML = "";
            let OptionElement;
            const ColumnNames = document.getElementsByClassName("column-name");
            for (let x = 0; x < ColumnNames.length; x++) {
                OptionElement = document.createElement("option");
                OptionElement.innerHTML = ColumnNames[x].innerHTML;
                TableColumnsSelect.appendChild(OptionElement);
            }
        } break;
        case FORM.InsertEntry: {
            const TableEntryRequest = new XMLHttpRequest();
            TableEntryRequest.onreadystatechange=function(){
                if(this.readyState === 4 && this.status === 200) {
                    HideCommentBox();
                    const Main = document.getElementById("tablewrapper");
                    Main.innerHTML = this.responseText;
                    Main.style = "";
                    Main.className = "addEntryForm";
                    document.getElementById("add-entry-table").addEventListener('focusout', FormsOnFocusOut);
                    ResizeForm("add-entry");
                    document.getElementById("add-entry").addEventListener('submit', AddEntryOnSubmit);

                }
            }
            TableEntryRequest.open('POST', 'php/Async/AddEntryForm.php', true);
            TableEntryRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            TableEntryRequest.send();
        } break;
    }
}

function GetFieldFromRow(Row, elementClass) {
    const Element = Row.getElementsByClassName(elementClass)[0];
    if (Element) return Element;
    else return null; 
}

function FormsOnClick(e) {
    const CloseForm = e.target.closest("#close-menu");
    if(CloseForm) {
        document.getElementById("form").style = 'display:none';
        document.body.style = 'pointer-events: all;';
    }
}

function FormsOnFocusOut(e) {
    const Target = e.target;
    const EntryFormRow = Target.closest(".newEntryRow");
    if(EntryFormRow) {
        const NullField = EntryFormRow.getElementsByClassName("addEntryNull")[0].firstElementChild;
        if(NullField) {
            if(Target.value.replaceAll(" ", "") != "") {
                NullField.checked = false;
            }
            else {
                Target.value = "";
                NullField.checked = true;
            }
        }
    }
}

function LoginOnSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    RequestLogin(username, password);
}

function RegisterOnSubmit(e) {
    e.preventDefault();
    const firstname = document.getElementById('reg-firstname').value;
    const lastname = document.getElementById('reg-lastname').value;
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    RequestRegister(firstname, lastname, email, username, password);
}

function CreateTableOnSubmit(e) {
    e.preventDefault();
    const tablename = document.getElementById('table-name').value;
    let NumberOfColumns = document.getElementById('column-amount').value;
    LoadTableStructureForm(TableStructureFormMode.NewTable, tablename, NumberOfColumns);
}

function AddColumnsOnSubmit(e) {    
    e.preventDefault();
    let NumberOfColumns = document.getElementById("columns").value;
    if (NumberOfColumns < 1) NumberOfColumns = 1;
    const StructureTable = document.getElementById("structure-table");
    for(x = 0; x < NumberOfColumns; x++) {
        StructureTable.firstElementChild.appendChild(GenerateStructureTableRow());
    }
    document.getElementById("form").style = 'display:none';
    document.body.style = 'pointer-events: all;';
}

function AddEntryOnSubmit(e) {
    e.preventDefault();
    const Rows = document.getElementsByClassName("newEntryRow");
    let Data = new Array(Rows.length);
    let ErrorMsg = "";
    
    for (let x = 0; x < Rows.length; x++) {
        Data[x] = new NewEntryRowData;
        let Null = GetFieldFromRow(Rows[x], "addEntryNull").firstElementChild;
        if(Null == null || Null.checked == false) {
            Null = false;
        }
        else {
            Null = true;
        }
        let EntryData = GetFieldFromRow(Rows[x], "addEntryData").firstElementChild.value;
        if(EntryData.replaceAll(" ", "") === "") EntryData = "";


        Data[x].Name = GetFieldFromRow(Rows[x], "addEntryName").firstElementChild.innerHTML;
        Data[x].Type = GetFieldFromRow(Rows[x], "addEntryType").firstElementChild.innerHTML;
        Data[x].Null = Null;
        Data[x].Data = EntryData;
    }
    if(ErrorMsg != "") {
        alert(ErrorMsg);
    }
    else {
        const jsonData = JSON.stringify(Data);
        let newEntryRequest = new XMLHttpRequest();
        newEntryRequest.onreadystatechange=function(){
            if(this.readyState == 4 && this.status == 200) {
                if(this.response != " ") {
                    alert(this.response);
                }
                else {
                    LoadTable("", "main");
                    ShowMessagePopUp(MessageType.Info, "Entry successfully added to table.");
                }
            }
        }
        newEntryRequest.open('POST', 'php/Async/AddEntry.php', true);
        newEntryRequest.setRequestHeader('Content-Type', 'application/json');
        newEntryRequest.send(jsonData);
    }
}

function InsertColumnsOnSubmit(e) {
    e.preventDefault();
    const InsertColumnForm = document.getElementById("insert-columns");
    const ColumnAmount = InsertColumnForm.querySelector("#amount-of-columns").value;
    const InsertOptions = InsertColumnForm.querySelector("#insert-option").selectedIndex;
    const SelectedColumn = InsertColumnForm.querySelector("#table-columns");
    let ColumnName = "";
    let InsertOption = "";
    if(!SelectedColumn.disabled) {
        ColumnName = SelectedColumn.value; 
    }
    switch(InsertOptions){
        case 0 : InsertOption = "LAST";
            break;
        case 1: InsertOption = "FIRST";
            break;
        case 2: InsertOption = "AFTER";
            break;
    }
    LoadTableStructureForm(TableStructureFormMode.AddColumn,  "", ColumnAmount, InsertOption);
}

function InsertColumnsOnChange(e) {
    const Target = e.target;
    const InsertColumnForm = Target.closest("#insert-columns");
    if(InsertColumnForm && Target.id == "insert-option") {
        const ColumnSelector = InsertColumnForm.querySelector("#table-columns");
        switch (Target.selectedIndex) {
            case 0: { // Last
                ColumnSelector.setAttribute("disabled", "");
            } break;
            case 1: { // First
                ColumnSelector.setAttribute("disabled", "");
            } break;
            case 2: { // After:
                ColumnSelector.removeAttribute("disabled");
            } break;
        }
    }
}

function TableStructureOnSubmit(e) {
    e.preventDefault();
    const Rows = document.getElementsByClassName("tableStructureRow");
    for (x = 0; x < Rows.length; x++) {
        let Name = GetFieldFromRow(Rows[x], "Entry_Name").value;

        if(Name.replaceAll(' ', '') == "")
        {
            alert("Please provide a valid name!");
            return;
        }
    }

    let Data = new Array(Rows.length);
    let ErrorMsg = "";

    for (x = 0; x < Rows.length; x++) {
        Data[x] = new StructureRowData;
        Data[x].Name = GetFieldFromRow(Rows[x], "Entry_Name").value;
        Data[x].Type = GetFieldFromRow(Rows[x], "Entry_Type").value;
        Data[x].Length = GetFieldFromRow(Rows[x], "Entry_LenVal").value;
        Data[x].Default = GetFieldFromRow(Rows[x], "Entry_Default").value;
        Data[x].Attributes = GetFieldFromRow(Rows[x], "Entry_Attributes").value;
        Data[x].Null = GetFieldFromRow(Rows[x], "Entry_Null").checked;
        let index = GetFieldFromRow(Rows[x], "Entry_Index");
        if (index != null) Data[x].Index = index.value; 
        Data[x].AutoIncrement = GetFieldFromRow(Rows[x], "Entry_AI").checked;
        Data[x].Comment = GetFieldFromRow(Rows[x], "Entry_Comments").value;

        if(Data[x].Type == "VARCHAR" && (Data[x].Length == "" || Data[x].Length == 0)) {
            ErrorMsg = "Please enter a valid Lenght!";
            break;
        }
    }
    if(ErrorMsg != "") {
        alert(ErrorMsg);
    }
    else {
        const Button = document.getElementById("table-structure").getElementsByClassName("form-button")[0];
        let jsonData = JSON.stringify(Data);
        
        if (Button.id === "create-table") {
            let TableName = document.getElementById("Table_Name").value;
            jsonData = '{"Data": ' + jsonData + ', "TableName": "' + TableName + '"}';
            let newTableRequest = new XMLHttpRequest();
            newTableRequest.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText) {
                        ShowMessagePopUp(MessageType.Error, this.responseText);
                    }
                    else {
                        LoadTable("", "main");
                        ShowMessagePopUp(MessageType.Info, "Created table " + TableName + ".", 400);
                    }
                }
            }
            newTableRequest.open('POST', 'php/Async/CreateTable.php', true);
            newTableRequest.setRequestHeader('Content-Type', 'application/json');
            newTableRequest.send(jsonData);
        }
        else if (Button.id === "insert-column") {
            const insertColumnRequest = new XMLHttpRequest();
            insertColumnRequest.onreadystatechange=function(){
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText) {
                        ShowMessagePopUp(MessageType.Error, this.responseText);
                    }
                    else {
                        LoadTable("", "main");
                        ShowMessagePopUp(MessageType.Info, "Column inserted.", 400);

                    }
                }
            }
            insertColumnRequest.open('POST', 'php/Async/InsertColumns.php', true);
            insertColumnRequest.setRequestHeader('Content-Type', 'application/json');
            insertColumnRequest.send(jsonData);
        }
        else if (Button.id === "alter-column") {
            const alterColumnsRequest = new XMLHttpRequest();
            alterColumnsRequest.onreadystatechange=function(){
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText) ShowMessagePopUp(MessageType.Error, this.responseText);
                    else {
                        LoadTable("", "main");
                        LoadTableStructure();
                        ShowMessagePopUp(MessageType.Info, "Column structure was altered with success.", 400);
                    }
                }
            }
            alterColumnsRequest.open('POST', 'php/Async/EditQueries.php', true);
            alterColumnsRequest.setRequestHeader('Content-Type', 'application/json');
            alterColumnsRequest.send(jsonData);
        }
    }
}

function TableStructureOnChange(e) {
    const Target = e.target;
    if(Target.name == "Entry_AI" && Target.checked) {
        const Row = Target.closest(".tableStructureRow");
        const EntryIndex = Row.getElementsByClassName("Entry_Index")[0]; //PRIMARY
        if (EntryIndex) EntryIndex.selectedIndex = 1;
    }
    if(Target.name == "Entry_Default") {
        if (Target.selectedIndex == 1) { //NULL
            const Row = Target.closest(".tableStructureRow");
            Row.getElementsByClassName("Entry_Null")[0].checked = true;
        }
    }
}
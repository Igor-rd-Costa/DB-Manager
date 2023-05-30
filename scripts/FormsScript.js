
document.addEventListener('DOMContentLoaded', () => {
const FormDiv = document.getElementById("form");
const LoginForm = document.getElementById("login");
const RegisterForm = document.getElementById("register");
const FormHeaderTitle = document.getElementById("menu-title");


document.addEventListener('click', (event) => {
    const Target = event.target;

    const CloseForm = Target.closest("#close-menu");
    if(CloseForm) {
        FormDiv.style = 'display:none';
        document.body.style = 'pointer-events: all;';
    }
    if (Target.closest("#back-icon")) {
        const Destination = Target.closest("#back-icon").getAttribute("backto");
        switch (Destination)
    {
        case "main": window.location.href = "../pages/main.php"; 
            break;
        case "table-list": LoadTableList();
            break;
        case "login": {
            document.getElementById("back-icon").style.display = "none";
            FormHeaderTitle.innerHTML = "Login";
            RegisterForm.style.display = "";
            LoginForm.style.display = "grid";
        } break;
        default: LoadTable(Destination, "main");
    }
}
})

document.addEventListener('mousedown', (event) => {
    const Target = event.target;
    const SubmitButton = Target.closest(".submit");
    if(SubmitButton) {
        SubmitButton.style.borderBottomWidth = "0.1rem";
        SubmitButton.style.borderRightWidth = "0.1rem";
        if(SubmitButton.id === "button-register") {
            document.getElementById("back-icon").style.display = "grid";
            FormHeaderTitle.innerHTML = "Register";
            LoginForm.style.display = "none";
            RegisterForm.style.display = "grid";
            SubmitButton.style.borderBottomWidth = "";
            SubmitButton.style.borderRightWidth = "";
        }
    }

})

document.addEventListener('mouseup', (event) => {
    const Target = event.target;
    const SubmitButton = Target.closest(".submit");

    if(SubmitButton) {
        SubmitButton.style.borderBottomWidth = "";
        SubmitButton.style.borderRightWidth = "";
    }
})
    
document.addEventListener('focusout', (event) => {
    const Target = event.target;
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
})    

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

function GetFieldFromRow(Row, elementClass) {
    return Row.getElementsByClassName(elementClass)[0];
}

document.addEventListener('submit', (event) => {
    switch (event.target.id) {
        case "login": {
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            event.preventDefault();
            REQUEST_Login(username, password);
        } break;
        case "register": {
            let firstname = document.getElementById('reg-firstname').value;
            let lastname = document.getElementById('reg-lastname').value;
            let email = document.getElementById('reg-email').value;
            let username = document.getElementById('reg-username').value;
            let password = document.getElementById('reg-password').value;
            event.preventDefault();
            REQUEST_Register(firstname, lastname, email, username, password);
        } break;
        case "create-table": {
            let tablename = document.getElementById('table-name').value;
            let NumberOfColumns = document.getElementById('column-amount').value;
            event.preventDefault();

            if(NumberOfColumns < 1) {
                alert("Please provide a valid number of columns!");
                break;
            }

            LoadTableStructureForm(tablename, NumberOfColumns);
        } break;
        case "add-columns": {
            const NumberOfColumns = document.getElementById("columns").value;
            const StructureTable = document.getElementById("structure-table");
            event.preventDefault();
            for(x = 0; x < NumberOfColumns; x++) {
                StructureTable.firstElementChild.appendChild(GenerateStructureTableRow());
            }
            FormDiv.style = 'display:none';
            document.body.style = 'pointer-events: all;';
                

        } break;
        case "add-entry": {
            event.preventDefault();
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
                        if(this.responseText) {
                            alert(this.responseText);
                        }
                        else {
                            LoadTable("", "main");
                        }
                    }
                }
                newEntryRequest.open('POST', '../php/Async/AddEntry.php', true);
                newEntryRequest.setRequestHeader('Content-Type', 'application/json');
                newEntryRequest.send(jsonData);
            }

        } break;
        case "table-structure": {
            event.preventDefault();
            let Rows = document.getElementsByClassName("tableStructureRow");
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
                Data[x].Index = GetFieldFromRow(Rows[x], "Entry_Index").value;
                Data[x].AutoIncrement = GetFieldFromRow(Rows[x], "Entry_AI").checked;
                Data[x].Comment = GetFieldFromRow(Rows[x], "Entry_Comments").value;

                if((Data[x].Type == "VARCHAR" || Data[x].Type == "VARBINARY" || Data[x].Type == "BIT") && (Data[x].Length == "" || Data[x].Length == 0)) {
                    ErrorMsg = "Please enter a valid Lenght!";
                    break;
                }
            }
            if(ErrorMsg != "") {
                alert(ErrorMsg);
            }
            else {
                let TableName = document.getElementById("Table_Name").value;
                let jsonData = JSON.stringify(Data);
                let newTableRequest = new XMLHttpRequest();
                jsonData = '{"Data": ' + jsonData + ', "TableName": "' + TableName + '"}';
                console.log(jsonData);
                newTableRequest.onreadystatechange=function(){
                    if(this.readyState == 4 && this.status == 200) {
                        if(this.responseText) {
                            alert(this.responseText);
                        }
                        else {
                            LoadTable("", "main")
                        }
                    }
                }
                newTableRequest.open('POST', '../php/Async/CreateTable.php', true);
                newTableRequest.setRequestHeader('Content-Type', 'application/json');
                newTableRequest.send(jsonData);
            }        
        } break;
    }
})

})
function DocOnClick(e) {
    const Target = e.target;
    const Profile = document.getElementById("profilewrapper");
    const TblMoreOptions = document.getElementById("tbl-options");
        
    if(Target.closest("#profilewrapper")) {
        ToggleOptionMenuDisplay("pr-options");
        if (document.getElementById("pr-options").style.display == "block") {
            Profile.style.backgroundColor = "var(--SelectBrightColor)";
            Profile.firstElementChild.style.textDecoration = "underline var(--ContrastColor)";
        }
        else {
            Profile.style.backgroundColor = "";
            Profile.firstElementChild.style.textDecoration = "";
        }
    }
    else if(Target.closest("#tbl-options")) {
        ToggleOptionMenuDisplay("tbl-option-list");
        if(document.getElementById("tbl-option-list").style.display == "block") {
            TblMoreOptions.style.backgroundColor = "var(--SelectBrightColor)";
        }
        else {
            TblMoreOptions.style.backgroundColor = "";
        }
    }
    else {
        CloseAllOptionMenus();
        if (Profile) {
            Profile.style.backgroundColor = "";
            Profile.firstElementChild.style.textDecoration = "";
        }
        if (TblMoreOptions) {
            TblMoreOptions.style.backgroundColor = "";
        }
        
    }

    if (Target.closest("#back-icon")) {
        const Destination = Target.closest("#back-icon").getAttribute("backto");
        switch (Destination) {
        case "main": window.location.href = "main.php"; 
            break;
        case "table-list": LoadTableList();
            break;
        case "login": {
            ShowForm(FORM.Login);
        } break;
        default: LoadTable(Destination, "main");
        }
    }
}

function DocOnMouseDown(e) {
    const SubmitButton = e.target.closest(".submit");
    if(SubmitButton) {
        SubmitButton.style.borderBottomWidth = "0.1rem";
        SubmitButton.style.borderRightWidth = "0.1rem";
        if(SubmitButton.id === "button-register") {
            ShowForm(FORM.Register);
        }
    }
}

function DocOnMouseUp(e) {
    const SubmitButton = e.target.closest(".submit");
    if(SubmitButton) {
        SubmitButton.style.borderBottomWidth = "";
        SubmitButton.style.borderRightWidth = "";
    }
}
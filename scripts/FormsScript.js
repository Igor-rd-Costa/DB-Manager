document.addEventListener('DOMContentLoaded', () => {
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/') + 1);
    const close_menu_element = document.getElementById('close-menu');
    close_menu_element.addEventListener('click', () => {
        document.getElementById('form').style = 'display:none';
        document.getElementById('header').style = 'pointer-events: all;';
        document.getElementById('menu-title').innerHTML = "";
        document.getElementById('formwrapper').innerHTML = "";
        
        switch(filename)
        {
            case "":
            document.getElementById('loginwrapper').style = 'pointer-events: all';
                
            break;
            case "main.php":
            document.getElementById('profilewrapper').style = 'pointer-events: all';
            document.getElementById('dbwrapper').style = 'pointer-events: all';
            for(x=0; x <= document.getElementsByClassName('database').length - 1; x++)
            {
            document.getElementsByClassName('database')[x].style = 'pointer-events: all;';
            };
            break;
        }        
        
    })
    
    close_menu_element.addEventListener('mouseover', () => {
         document.getElementById('x').style = 'color: var(--BorderColor); scale: 110%';
         document.getElementById('close-menu').style = 'background-image: radial-gradient(circle at center, rgb(221, 221, 221, 0.3), transparent)';
         
    })
    close_menu_element.addEventListener('mouseout', () => {
         document.getElementById('x').style = 'color: var(--PlusColor); scale: 100%';
         document.getElementById('close-menu').style = 'background-image: ';
    })

    document.getElementById('formwrapper').addEventListener('mousedown', (event) => {
        const target = event.target;
        if(target.tagName === "BUTTON")
        {
            target.style = 'border-bottom-width: 2px; border-right-width: 2px;';
        }
        if(target.id === "button-register")
        {
            LoadRegisterForm();
        }
    })

    document.getElementById('formwrapper').addEventListener('mouseup', (event) => {
        const target = event.target;
        if(target.tagName === "BUTTON")
        {
            target.style = 'border-bottom-width: 3px; border-right-width: 3px;';
        }
    })

    document.getElementById('formwrapper').addEventListener('mouseover', (event) => {
        const target = event.target;
        if(target.tagName === "BUTTON")
        {
            target.style = 'scale: 102%;';
        }
        
    })

    document.getElementById('formwrapper').addEventListener('mouseout', (event) => {
        const target = event.target;
        if(target.tagName === "BUTTON")
        {
            target.style = 'scale: 100%;';
        }
    })

    document.getElementById('formwrapper').addEventListener('focusin', (event) => {
        const target = event.target;
        if(target.tagName === "INPUT"){

            target.style = 'border-bottom: 3px solid var(--BorderColor); border-right: 3px solid var(--BorderColor); border-top: none; border-left: none, margin-bottom: 0px';
        }

        
    })
    
    document.getElementById('formwrapper').addEventListener('focusout', (event) => {
        const target = event.target;
            if(target.tagName === "INPUT"){
            target.style = 'border-bottom: 3px solid transparent; border-right: 3px solid transparent; border-top: none; border-left: none, margin-bottom: 0px';
            }
        })
        
    document.getElementById('formwrapper').addEventListener('submit', (event) => {
        let TargetID = event.target.id;
        if(TargetID === "login")
        {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        event.preventDefault();
        REQUEST_Login(username, password);
        }
        else if(TargetID === "register")
        {
            let firstname = document.getElementById('firstname').value;
            let lastname = document.getElementById('lastname').value;
            let email = document.getElementById('email').value;
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            event.preventDefault();
            REQUEST_Register(firstname, lastname, email, username, password);
        }
    })
})
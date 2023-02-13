function AnimateElement(element, from, to, duration, direction = 'normal', timing = 'linear')
    {
        const animation = element.animate([
            from,
            to
        ], {
            duration: duration,
            iterations: 1,
            fill: 'forwards',
            direction: direction,
            easing: timing

        });
        return animation;
    }

function LoadRegisterForm()
{
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById('menu-title').innerHTML = "Register";
            document.getElementById('formwrapper').innerHTML = this.response;
        }
    }
    xmlhttp.open('GET', 'asyncRequests.php?request=Register', true);
    xmlhttp.send();
};

function LoadLoginForm(error)
{
    document.getElementById('form').style = 'display: block';

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById('menu-title').innerHTML = "Login";
           
            document.getElementById('formwrapper').innerHTML = this.response;
            if(error)
            {
                document.getElementById("error-wrapper").innerHTML = error;
            }
        }
    }
    xmlhttp.open('GET', 'asyncRequests.php?request=Login', true);
    xmlhttp.send();
}


function LoadDatabaseAdderForm()
{

    document.getElementById('form').style = 'display: block';

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById('menu-title').innerHTML = "Create Database";
            document.getElementById('formwrapper').innerHTML = this.response;
        }
    }
    xmlhttp.open('GET', '../asyncRequests.php?request=CreateDB', true);
    xmlhttp.send();
}

function REQUEST_Login(username, password)
{
    var xmlhttplogin = new XMLHttpRequest();
    xmlhttplogin.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            if(!this.responseText)
            {
                document.getElementById("error-wrapper").innerHTML = "Password or Username incorrect, please check the information provided and try again.";
            }
            else
            {
                window.location.href = "http://localhost/BancodeDados/pages/main.php";
            }
        }
    }
    xmlhttplogin.open('POST', 'asyncRequests.php?request=LoginRequest', true);
    xmlhttplogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttplogin.send('usernameLogin=' + username + '&passwordLogin=' + password);
}

function REQUEST_Register(firstname, lastname, email, username, password)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            if(!this.responseText)
            {
               console.log("Registration Failed");
            }
            else
            {
                REQUEST_Login(username, password);
            }
        }
    }
    xmlhttp.open('POST', 'asyncRequests.php?request=RegisterRequest', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send('REG_FirstName=' + firstname + '&REG_LastName=' + lastname + '&REG_Email=' + email + '&REG_Username=' + username + '&REG_Password=' + password);
}

function REQUEST_CreateTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
        
        }
    }
    xmlhttp.open('POST', 'asyncRequests.php?request=CreateTable', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
}

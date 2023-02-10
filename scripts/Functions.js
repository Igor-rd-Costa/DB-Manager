
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
    xmlhttp.open('GET', 'test.php?request=Register', true);
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
    xmlhttp.open('GET', 'test.php?request=Login', true);
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
    xmlhttp.open('GET', '../test.php?request=CreateDB', true);
    xmlhttp.send();
}






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


function SendLoginRequest(username, password)
{
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function(){
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
    xmlhttp.open('POST', 'test.php?request=LoginRequest', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send('usernameLogin='+username+'&passwordLogin='+password);
}

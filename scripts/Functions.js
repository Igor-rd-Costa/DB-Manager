
function LoadRegisterForm()
{
    console.log("Hello");
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

function LoadLoginForm()
{
    document.getElementById('form').style = 'display: block';

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById('menu-title').innerHTML = "Login";
            document.getElementById('formwrapper').innerHTML = this.response;
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

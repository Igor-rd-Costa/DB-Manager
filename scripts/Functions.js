
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
    
    document.getElementById("form").addEventListener('mouseover', (event) => {

        const username = document.getElementById('username'); 
        const password = document.getElementById('password');
        
        username.addEventListener('focus', () => {
            username.style = 'border-bottom: 3px solid var(--BorderColor); border-right: 3px solid var(--BorderColor); border-top: transparent; border-left: transparent, margin-bottom: 0px';
        })
        username.addEventListener('blur', () => {
            username.style = 'border: none;';
        })
        
        password.addEventListener('focus', () => {
            password.style = 'border-bottom: 3px solid var(--BorderColor); border-right: 3px solid var(--BorderColor); border-top: transparent; border-left: transparent';
        })
        password.addEventListener('blur', () => {
            password.style = 'border: none;';
        })
        
        const selected = document.getElementsByClassName('submit');
        for(x=0; x < selected.length; x++)
        {
            
            const selectedElement = selected[x];
            selectedElement.addEventListener('mousedown', () => {
                selected.style = 'border-bottom-width: 2px; border-right-width: 2px; scale: 102%;';
            })
            selectedElement.addEventListener('mouseover', () => {
                selectedElement.style = 'scale: 102%;';
            })
            selectedElement.addEventListener('mouseout', () => {
                selectedElement.style = 'scale: 100%;';
            })
        }
        const register = document.getElementById('register');
        register.addEventListener('mousedown', () => {
            register.style = 'border-bottom-width: 2px; border-right-width: 2px;';
        })
        register.addEventListener('mouseup', () => {
            register.style = 'border-bottom-width: 3px; border-right-width: 3px;';
        })
        
    })
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

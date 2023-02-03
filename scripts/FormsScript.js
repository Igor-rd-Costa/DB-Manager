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
    
})
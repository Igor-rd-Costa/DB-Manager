document.addEventListener('DOMContentLoaded', () => {
    let display = false;
    //Database Adder events
    const addDB_element = document.getElementById('addDB');
    addDB_element.addEventListener('click', () => {
        document.getElementById('dbwrapper').style = 'pointer-events: none';
        document.getElementById('profilewrapper').style = 'pointer-events: none';
        document.getElementById('pr-options').style = 'display: none';
        display = false;
        LoadDatabaseAdderForm();
    })

    addDB_element.addEventListener('mouseover', () => {
        addDB_element.style = 'background-color: rgb(121, 49, 121); scale: 106%';

        document.getElementById('horz-line').style = 'background-color: var(--BorderColor); border: 1px solid var(--BorderColor)';
        document.getElementById('vert-line').style = 'background-color: var(--BorderColor); border: 1px solid var(--BorderColor)';
    })

    addDB_element.addEventListener('mouseout', () => {
        addDB_element.style = 'background-color: transparent; scale: 100%';

        document.getElementById('horz-line').style = 'background-color: var(--PlusColor); border: 1px solid var(--PlusColor)';
        document.getElementById('vert-line').style = 'background-color: var(--PlusColor); border: 1px solid var(--PlusColor)';
    })

    //Database displayer events

    /* for(x = 1; x <= 7; x++)
    {
        var DatabaseID = "database" + x;
        const selected = document.getElementById(DatabaseID);
        selected.addEventListener('mouseover', () => {
            selected.style = 'background-color: rgb(121, 49, 121); scale: 106%';
        })
        selected.addEventListener('mouseout', () => {
            selected.style = 'background-color: transparent; scale: 100%';
        })
    } */
    
    

    //profile events

    document.getElementById('user-img').addEventListener('click', () => {
        
        if(!display)
        {
        document.getElementById('pr-options').style = 'display: block;';
        display = true;
        }
        else
        {
        document.getElementById('pr-options').style = 'display: none;';
        display = false;
        }
    })
})




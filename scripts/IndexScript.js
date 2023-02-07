
document.addEventListener('DOMContentLoaded', () => {
//login events
    const loginwrapper = document.getElementById('loginwrapper');
    const loginimg = document.getElementById('login-img'); 

    loginwrapper.addEventListener('mouseover', () => {
        loginimg.style = 'scale: 105%';
    })
    
    loginwrapper.addEventListener('mouseout', () => {
        loginimg.style = 'scale: 100%';
    })

    loginwrapper.addEventListener('click', () => {
        LoadLoginForm();
        document.getElementById('header').style = 'pointer-events:none;';
        loginimg.style = 'pointer-events: none;';
        
    })

// Front page animations

    let maintextwrapper = document.getElementById('main-text-wrapper');
    let secondarytextwrapper = document.getElementById('secondary-text-wrapper');
    let subtext = document.getElementById('sub-main-text');
    let subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
    let hoveranimation;
    let wheelanimation;
    let mainelement_currentsize = 1;
    let secelement_currentsize = 0;
    document.body.addEventListener('wheel', (event) => {
        if(event.deltaY > 0)
        {
            // Mouse down: Decreases main texts' size and increases secondary texts';
            if(mainelement_currentsize > 0)
            {
                switch(true)
                {
                case mainelement_currentsize == 1: {
                wheelanimation = AnimateElement(subtext, { left: subtext_position }, { left: '543px' }, 200);
                        wheelanimation.addEventListener('finish', () => {
                            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                        })
                        AnimateElement(maintextwrapper, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 10);
                }  
                case mainelement_currentsize < 0.8: {
                    AnimateElement(maintextwrapper, { opacity: mainelement_currentsize }, { opacity: mainelement_currentsize + 0.1 });
                }
                case secelement_currentsize <= 1: {
                    AnimateElement(secondarytextwrapper, { scale: secelement_currentsize }, { scale: secelement_currentsize + 0.05 });
                    AnimateElement(secondarytextwrapper, { opacity: secelement_currentsize }, { opacity: secelement_currentsize + 0.1 });
                    secelement_currentsize = secelement_currentsize + 0.05; 
                }
                }
                AnimateElement(maintextwrapper, { transform: 'scale(' + mainelement_currentsize + ')' }, { transform: 'scale(' + (mainelement_currentsize - 0.05) + ')' });
                    mainelement_currentsize = mainelement_currentsize - 0.05;
            }
        }
        else
        {
            // Mouse down: Increases main texts' size and decreases secondary texts';
            if (mainelement_currentsize < 1)
            {
                switch(true)
                {
                    case mainelement_currentsize >= 0.95: {
                        wheelanimation = AnimateElement(subtext, { left: '543px' }, { left: '0px' }, 200);
                        wheelanimation.addEventListener('finish', () => {
                        subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                        })
                    }
                    case mainelement_currentsize < 0.8: {
                        AnimateElement(maintextwrapper, { opacity: mainelement_currentsize }, { opacity: mainelement_currentsize + 0.1 });
                    }
                    case secelement_currentsize > 0: {
                        AnimateElement(secondarytextwrapper, { scale: secelement_currentsize }, { scale: secelement_currentsize - 0.05 });
                        AnimateElement(secondarytextwrapper, { opacity: secelement_currentsize }, { opacity: secelement_currentsize + 0.1 });
                        secelement_currentsize = secelement_currentsize - 0.05;
                    }
                }
                AnimateElement(maintextwrapper, { transform: 'scale(' + mainelement_currentsize + ')' }, { transform: 'scale(' + (mainelement_currentsize + 0.05) + ')' });
                mainelement_currentsize = mainelement_currentsize + 0.05;
            }
        
        }
    })
document.body.addEventListener('mouseover', (event) => {
    let target = event.target;
    if(target.id === 'secondary-text' && secelement_currentsize >= 1)
    {
            AnimateElement(secondarytextwrapper, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 10);
            AnimateElement(secondarytextwrapper, { scale: 1 }, { scale: 1.2 });
    }
    if(target.id === "main-text" && mainelement_currentsize == 1)
    {
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: '543px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
        })
        AnimateElement(maintextwrapper, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 250);
    }
})
document.body.addEventListener('mouseout', (event) => {
    let target = event.target;
    if(target.id === 'secondary-text' && secelement_currentsize >= 1)
    {
        AnimateElement(secondarytextwrapper, { color: 'white' }, { color: 'rgb(230, 230, 230)' }, 10);
        AnimateElement(secondarytextwrapper, { scale: 1.2 }, { scale: 1 });
    }
    if(target.id === "main-text" && mainelement_currentsize == 1)
    {
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: '0px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
        })
        AnimateElement(maintextwrapper, { color: 'white'}, { color: 'rgb(230, 230, 230)'}, 250);
    }

})
})

function createElement(element, content, attr, attrvalue)
{   
    const newelement = document.createElement(element);
    if(content)
    {
    const textcontent = document.createTextNode(content);
    newelement.appendChild(textcontent);
    }
    if(attr)
    {
        const attribute = document.createAttribute(attr);
        attribute.value = attrvalue;
        newelement.setAttributeNode(attribute);

    }
    return newelement;

}
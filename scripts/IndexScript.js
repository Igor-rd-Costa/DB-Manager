
document.addEventListener('DOMContentLoaded', () => {
     //login events
    const loginwrapper = document.getElementById('loginwrapper');
    const loginimg = document.getElementById('login-img'); 

    loginwrapper.addEventListener('mouseover', () => {
        loginimg.style = 'scale: 105%';
        loginwrapper.style = 'background-image: radial-gradient(circle at center, rgb(221, 221, 221, 0.5) 5%, transparent 95%)';
    })

    loginwrapper.addEventListener('mouseout', () => {
        loginimg.style = 'scale: 100%';
        loginwrapper.style = 'background-image: ';
    })

    loginwrapper.addEventListener('click', () => {
        LoadLoginForm();
        document.getElementById('header').style = 'pointer-events:none;';
        loginimg.style = 'pointer-events: none;';
    })


let textwrapper = document.getElementById('main-text-wrapper');
let maintext = document.getElementById('main-text');
let subtext = document.getElementById('sub-main-text');
let hoveranimation;
let wheelanimation;
let wheel = true;
let subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
maintext.addEventListener('mouseover', () => {
    if (sizeone == 1) 
    {
        wheel = false;
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: '543px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
            wheel = true;
        })
        AnimateElement(textwrapper, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 250);
    }
});

maintext.addEventListener('mouseout', () => {
    if (sizeone == 1)
    {
        wheel = false;
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: '0px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            wheel = true;
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
        })
        AnimateElement(textwrapper, { color: 'white'}, { color: 'rgb(230, 230, 230)'}, 250);
    }
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

let sizeone = 1;
let sizetwo = 0;
let secondarytext = document.getElementById('secondary-text-wrapper');
document.body.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && wheel)
    {
        if(sizeone > 0)
        {
            if ( sizeone == 1)
            {
                wheelanimation = AnimateElement(subtext, { left: subtext_position }, { left: '543px' }, 200);
                wheelanimation.addEventListener('finish', () => {
                    subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                })
                AnimateElement(textwrapper, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 10);
            }
            AnimateElement(textwrapper, { transform: 'scale(' + sizeone + ')' }, { transform: 'scale(' + (sizeone - 0.04) + ')' });
            sizeone = sizeone - 0.04;
            if (sizetwo < 1)
            {
                AnimateElement(secondarytext, { scale: sizetwo }, { scale: sizetwo + 0.05 });
                sizetwo = sizetwo + 0.05; 
            }
            if (sizeone < 0.8)
            {
                AnimateElement(textwrapper, { opacity: sizeone }, { opacity: sizeone - 0.1 });
            }
            if (sizeone <= 0)
            {
                document.getElementById('main-text-wrapper').style = 'display: none';
            }
        }
    }
    else if (event.deltaY < 0 && wheel)
    {
        if (sizeone < 1)
        {
            if (sizeone >= 0)
            {
                document.getElementById('main-text-wrapper').style = 'display: block';
            }
            AnimateElement(textwrapper, { transform: 'scale(' + sizeone + ')' }, { transform: 'scale(' + (sizeone + 0.04) + ')' });
            sizeone = sizeone + 0.04;
            if (sizeone == 1)
            {
                wheelanimation = AnimateElement(subtext, { left: '543px' }, { left: '0px' }, 200);
                wheelanimation.addEventListener('finish', () => {
                    subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                })
                AnimateElement(textwrapper, { color: 'white' }, { color: 'rgb(230, 230, 230)' }, 10);
            }
            if (sizetwo >= 0)
            {
                AnimateElement(secondarytext, { scale: sizetwo }, { scale: sizetwo - 0.05 });
                sizetwo = sizetwo - 0.05;
                
            }
            if (sizeone < 0.8)
            {
                AnimateElement(textwrapper, { opacity: sizeone }, { opacity: sizeone + 0.1 });
            }
        }
    }
    let sizetwotwo;
    secondarytext.addEventListener('mouseover', () => {
        sizetwotwo = sizetwo;
        if( sizetwotwo >= 1)
        {
            AnimateElement(secondarytext, { color: 'rgb(230, 230, 230)' }, { color: 'white' }, 10);
            AnimateElement(secondarytext, { scale: sizetwotwo }, { scale: sizetwotwo + 0.2 });
            sizetwotwo = sizetwotwo + 0.2;
        }
        })
        secondarytext.addEventListener('mouseout', () => {
            if(sizetwotwo >= 1)
            {
                AnimateElement(secondarytext, { color: 'white' }, { color: 'rgb(230, 230, 230)' }, 10);
                AnimateElement(secondarytext, { scale: sizetwotwo }, { scale: sizetwotwo - 0.2 });
                sizetwotwo = sizetwotwo - 0.2;
            }
        })
})
})
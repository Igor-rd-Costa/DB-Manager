
document.addEventListener('DOMContentLoaded', () => {
//login events
    const LoginWrapper = document.getElementById('loginwrapper');
    const loginimg = document.getElementById('login-img');
    
    document.addEventListener('mouseover', (event) => {
        const Target = event.target;
        const LoginWrapper = Target.closest("#loginwrapper");


        if(LoginWrapper) {
            LoginWrapper.style.backgroundColor = "var(--SelectColor)";
        }
    })

    document.addEventListener('mouseout', (event) => {
        const Target = event.target;
        const LoginWrapper = Target.closest("#loginwrapper");


        if(LoginWrapper) {
            LoginWrapper.style.backgroundColor = "";
        }
    })

    LoginWrapper.addEventListener('mouseout', () => {
        loginimg.style = 'scale: 100%';
    })

    LoginWrapper.addEventListener('click', () => {
        document.getElementById('login').style = "display: grid;";
        document.getElementById('register').style = "display: none;";
        document.getElementById('form').style.display = 'block';
        document.getElementById('menu-title').innerHTML = "Login";
        document.body.style = 'pointer-events:none;';
        
    })

// Front page animations

    let maintextwrapper = document.getElementById('main-text-wrapper');
    let secondarytextwrapper = document.getElementById('secondary-text-wrapper');
    let subtext = document.getElementById('sub-main-text');
    let sectextmoveamount = parseInt(getComputedStyle(maintextwrapper).width) - parseInt(getComputedStyle(subtext).width);
    let subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
    let hoveranimation;
    let wheelanimation;
    let mainelement_currentsize = 1;
    let secelement_currentsize = 0;
    document.body.addEventListener('wheel', (event) => {
        if(event.deltaY > 0)
        {
            // Mouse down: Decreases main texts' size and increases secondary texts' size;
            if(mainelement_currentsize > 0)
            {
                switch(true)
                {
                case mainelement_currentsize == 1: {
                wheelanimation = AnimateElement(subtext, { left: subtext_position }, { left: sectextmoveamount+"px" }, 200);
                        wheelanimation.addEventListener('finish', () => {
                            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                        })
                        AnimateElement(maintextwrapper, { color: 'var(--ContrastColor)' }, { color: 'rgb(227, 174, 252)' }, 10);
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
            // Mouse up: Increases main texts' size and decreases secondary texts' size;
            if (mainelement_currentsize < 1)
            {
                switch(true)
                {
                    case mainelement_currentsize >= 0.95: {
                        wheelanimation = AnimateElement(subtext, { left: sectextmoveamount+"px" }, { left: '0px' }, 200);
                        wheelanimation.addEventListener('finish', () => {
                        subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
                        })
                        AnimateElement(maintextwrapper, { color: 'rgb(227, 174, 252)' }, { color: 'var(--ContrastColor)' }, 10);
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
    if(target.id === "main-text" && mainelement_currentsize == 1)
    {
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: sectextmoveamount+"px" }, 50);
        hoveranimation.addEventListener('finish', () => {
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
        })
        AnimateElement(maintextwrapper, { color: 'var(--ContrastColor)' }, { color: 'rgb(227, 174, 252)' }, 250);
    }
    if(target.id === "secondary-text" && secelement_currentsize >= 1)
    {
            AnimateElement(secondarytextwrapper, { color: 'var(--ContrastColor)' }, { color: 'rgb(227, 174, 252)' }, 10);
            AnimateElement(secondarytextwrapper, { scale: 1 }, { scale: 1.2 });
    }
})
document.body.addEventListener('mouseout', (event) => {
    let target = event.target;
    if(target.id === "main-text" && mainelement_currentsize == 1)
    {
        hoveranimation = AnimateElement(subtext, { left: subtext_position }, { left: '0px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            subtext_position = window.getComputedStyle(subtext, null).getPropertyValue('left');
        })
        AnimateElement(maintextwrapper, { color: 'rgb(227, 174, 252)' }, { color: 'var(--ContrastColor)' }, 250);
    }
    if(target.id === "secondary-text" && secelement_currentsize >= 1)
    {
        AnimateElement(secondarytextwrapper, { color: 'rgb(227, 174, 252)' }, { color: 'var(--ContrastColor)' }, 10);
        AnimateElement(secondarytextwrapper, { scale: 1.2 }, { scale: 1 });
    }
})
})
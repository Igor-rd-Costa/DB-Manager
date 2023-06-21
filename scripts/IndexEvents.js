function HeaderOnClick(e) {
    const LoginWrapper = e.target.closest('#loginwrapper');
    if (LoginWrapper) ShowForm(FORM.Login);
}


let mainElementCurrentSize = 1;
let secElementCurrentSize = 0;
let subTextPosition = 0;

function IndexMainOnWheel(e) {
    const mainTextWrapper = document.getElementById('main-text-wrapper');
    const secTextWrapper = document.getElementById('secondary-text-wrapper');
    const subText = document.getElementById('sub-main-text');
    let secTextMoveAmount = parseInt(getComputedStyle(mainTextWrapper).width) - parseInt(getComputedStyle(subText).width);
    if(e.deltaY > 0) { // Mouse down: Decreases main texts' size and increases secondary texts' size;
        if(mainElementCurrentSize > 0)
        {    
            switch(true) { //no "break;" is intentinal
                case mainElementCurrentSize == 1: {
                    wheelAnimation = AnimateElement(subText, { left: subTextPosition }, { left: secTextMoveAmount+"px" }, 200);
                    wheelAnimation.addEventListener('finish', () => {
                        subTextPosition = getComputedStyle(subText).left;
                    })
                }
                case mainElementCurrentSize < 0.8: {
                    AnimateElement(mainTextWrapper, { opacity: mainElementCurrentSize }, { opacity: mainElementCurrentSize - 0.1 });
                }
                case secElementCurrentSize <= 1: {
                    AnimateElement(secTextWrapper, { scale: secElementCurrentSize }, { scale: secElementCurrentSize + 0.1 });
                    AnimateElement(secTextWrapper, { opacity: secElementCurrentSize }, { opacity: secElementCurrentSize + 0.1 });
                    secElementCurrentSize = secElementCurrentSize + 0.1; 
                }
            }
            AnimateElement(mainTextWrapper, { transform: 'scale(' + mainElementCurrentSize + ')' }, { transform: 'scale(' + (mainElementCurrentSize - 0.1) + ')' });
            mainElementCurrentSize = mainElementCurrentSize - 0.1;
        }
    }
    else { // Mouse up: Increases main texts' size and decreases secondary texts' size;
        if (mainElementCurrentSize < 1) {
            switch(true) { //no "break;" is intentinal
                case mainElementCurrentSize >= 0.9: {
                    wheelAnimation = AnimateElement(subText, { left: secTextMoveAmount+"px" }, { left: '0px' }, 200);
                    wheelAnimation.addEventListener('finish', () => {
                    subTextPosition = getComputedStyle(subText).left;
                    })
                }
                case mainElementCurrentSize < 0.8: {
                    AnimateElement(mainTextWrapper, { opacity: mainElementCurrentSize }, { opacity: mainElementCurrentSize + 0.1 });
                }
                case secElementCurrentSize > 0: {
                    AnimateElement(secTextWrapper, { scale: secElementCurrentSize }, { scale: secElementCurrentSize - 0.1 });
                    AnimateElement(secTextWrapper, { opacity: secElementCurrentSize }, { opacity: secElementCurrentSize + 0.1 });
                    secElementCurrentSize = secElementCurrentSize - 0.1;
                }
            }
            AnimateElement(mainTextWrapper, { transform: 'scale(' + mainElementCurrentSize + ')' }, { transform: 'scale(' + (mainElementCurrentSize + 0.1) + ')' });
            mainElementCurrentSize = mainElementCurrentSize + 0.1;
        }
    }
}

function IndexMainOnMouseOver(e) {
    const Target = e.target;
    const mainTextWrapper = document.getElementById('main-text-wrapper');
    const secTextWrapper = document.getElementById('secondary-text-wrapper');
    const subText = document.getElementById('sub-main-text');
    let secTextMoveAmount = parseInt(getComputedStyle(mainTextWrapper).width) - parseInt(getComputedStyle(subText).width);
    if(Target.id === "main-text" && mainElementCurrentSize == 1) {
        const hoveranimation = AnimateElement(subText, { left: subTextPosition }, { left: secTextMoveAmount+"px" }, 50);
        hoveranimation.addEventListener('finish', () => {
            subTextPosition = getComputedStyle(subText).left;
        })
    }
    if(secElementCurrentSize >= 1 && Target.closest("#secondary-text-wrapper")) {
        AnimateElement(secTextWrapper, { transform: "scale(1)" }, { transform: "scale(1.1)" });
    }
}

function IndexMainOnMouseOut(e) {
    const Target = e.target;
    const secTextWrapper = document.getElementById('secondary-text-wrapper');
    const subText = document.getElementById('sub-main-text');
    if(Target.id === "main-text" && mainElementCurrentSize == 1) {
        const hoveranimation = AnimateElement(subText, { left: subTextPosition }, { left: '0px' }, 50);
        hoveranimation.addEventListener('finish', () => {
            subTextPosition = getComputedStyle(subText).left;
        })
    }
    if(secElementCurrentSize >= 1 && Target.closest("#secondary-text-wrapper")) {
        AnimateElement(secTextWrapper, { transform: "scale(1.1)" }, { transform: "scale(1)" });
    }
}
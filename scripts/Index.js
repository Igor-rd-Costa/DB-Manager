
document.addEventListener('DOMContentLoaded', () => {
    const Main = document.getElementById("main");
    const Header = document.getElementById("header");
    
    document.addEventListener('click', DocOnClick);
    document.addEventListener('mousedown', DocOnMouseDown);
    document.addEventListener('mouseup', DocOnMouseUp);

    Header.addEventListener('click', HeaderOnClick);

    Main.addEventListener('wheel', IndexMainOnWheel);
    Main.addEventListener('mouseover', IndexMainOnMouseOver);
    Main.addEventListener('mouseout', IndexMainOnMouseOut);
})
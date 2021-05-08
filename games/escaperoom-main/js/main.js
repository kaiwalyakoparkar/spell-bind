function move(event){
    let X = event.clientX || event.touches[0].clientX
    let Y = event.clientY || event.touches[0].clientY
    document.documentElement.style.setProperty('--X', X +'px');
    document.documentElement.style.setProperty('--Y', Y +'px');
}
document.addEventListener('mousemove', move);
document.addEventListener('touchpad', move);

// select button


var buttons = document.querySelectorAll(".drum");
console.log(buttons);
for(var i=0;i<buttons.length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (event){
        var buttonInnerHTML = this.innerHTML;
        console.log(buttonInnerHTML);
        makeSound(buttonInnerHTML);
        buttonAnimations(buttonInnerHTML);
    });
}

function makeSound(key){
    var audio;

    switch(key){
        case 'w':
            audio = new Audio('./sounds/tom-1.mp3');
            audio.play();
            break;

        case 'a':
            audio = new Audio('./sounds/tom-2.mp3');
            audio.play();
            break;
        case 's':
            audio = new Audio('./sounds/tom-3.mp3');
            audio.play();
            break;

        case 'd':
            audio = new Audio('./sounds/tom-4.mp3');
            audio.play();
            break;
        case 'j':
            audio = new Audio('./sounds/snare.mp3');
            audio.play();
            break;

        case 'k':
            audio = new Audio('./sounds/crash.mp3');
            audio.play();
            break;

        case 'l':
            audio = new Audio('./sounds/kick-bass.mp3');
            audio.play();
            break;

        default:
    }
}


document.addEventListener("keypress", function(event){
    makeSound(event.key);
    buttonAnimations(event.key);
});

function buttonAnimations(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function (){
        activeButton.classList.remove("pressed");
    }, 100);
    
}
// If you need call this function please read the code-line 29
// And you need: import audioEffects from ...
import sound from '../metaMedia/buttonSound.mp3'


var soundEmbed = null;
var isChrome = !!window.chrome;
    
function soundPlayChrome(which)
{
    if (soundEmbed)
        document.body.removeChild(soundEmbed);
        soundEmbed = document.createElement("embed");
        soundEmbed.setAttribute("src", which);
        soundEmbed.setAttribute("hidden", true);
        soundEmbed.setAttribute("autostart", true);
        soundEmbed.setAttribute("loop", true);
        document.body.appendChild(soundEmbed);
}

function soundPlay(which)
{
    if (soundEmbed)
        document.head.removeChild(soundEmbed);
        soundEmbed = document.createElement("embed");
        soundEmbed.setAttribute("src", which);
        soundEmbed.setAttribute("hidden", true);
        soundEmbed.setAttribute("autostart", true);
        soundEmbed.setAttribute("loop", true);
        document.head.appendChild(soundEmbed);
}


function ButtonSound(){
    if (isChrome){
        {soundPlayChrome(sound)}
    }
    else{
        {soundPlay(sound)}
    }
    
    if (isChrome){
        {soundPlayChrome("null")}
    }
    else{
        {soundPlay("null")}
    }
}

export default ButtonSound
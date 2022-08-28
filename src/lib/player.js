import Url from '../assets/audio/click.wav'
const player = new Audio();

export const play = () => {

    player.src = Url;

    player.play();
}
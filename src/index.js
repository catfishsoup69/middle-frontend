import './assets/styles/style.scss';
import cards from './assets/data/cards';
import pauseImg from './assets/img/icons/pause.svg';

const player = document.getElementById('player');
const playerList = player.querySelector('.player__wrap');
const playerVolume = player.querySelector('.player__volume');
let playerAudio = player.querySelector('.player__audio');
let sound = '';
let audioIsPlaying = false;

function addAudioCards(card) {
  const button = document.createElement('button');
  button.classList.add('player__item');
  button.style.backgroundImage = `url(${card.picture})`;
  button.setAttribute('id', card.id);
  button.innerHTML = `<img class='player__item-icon' src='${card.icon}' alt='player icon'>`;
  playerList.append(button);
}

function findCard(cardId) {
  return cards.find((card) => card.id === cardId);
}

function playAudio(e) {
  playerAudio.play();
  e.target.querySelector('.player__item-icon').src = pauseImg;
  audioIsPlaying = true;
}

function pauseAudio(e, card) {
  playerAudio.pause();
  e.target.querySelector('.player__item-icon').src = card.icon;
  audioIsPlaying = false;
}

cards.forEach(addAudioCards);

playerList.addEventListener('click', async (e) => {
  const card = findCard(e.target.id);
  const cardSound = await import(`./assets/audio/${card.sound}.mp3`);

  document.querySelector('body').style.backgroundImage = `url(${card.picture})`;

  if (!playerAudio) {
    const audio = new Audio();
    const audioAttrs = {
      id: 'player-audio',
      type: 'audio/mp3',
    };
    Object.keys(audioAttrs).forEach((attr) => {
      audio.setAttribute(attr, audioAttrs[attr]);
    });
    player.appendChild(audio);
    playerAudio = audio;
  }

  if (sound !== card.sound) {
    player.querySelectorAll(`.player__item:not(#${e.target.id})`).forEach((item) => {
      const icon = item.querySelector('.player__item-icon');
      icon.src = findCard(item.id).icon;
    });
    playerAudio.volume = playerVolume.value * 0.01;
    playerAudio.src = cardSound.default;
    playAudio(e);
    sound = card.sound;
  } else if (audioIsPlaying) {
    pauseAudio(e, card);
  } else {
    playAudio(e);
  }
});

playerVolume.addEventListener('input', () => {
  if (playerAudio) {
    playerAudio.volume = playerVolume.value * 0.01;
  }
});

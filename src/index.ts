import './assets/styles/style.scss';
import { cards } from './assets/data/cards';
import pauseImg from './assets/img/icons/pause.svg';
import { ICard } from './types';

const player = document.getElementById('player')! as HTMLDivElement;
const playerList = player.querySelector('.player__wrap')! as HTMLDivElement;
const playerVolume = player.querySelector('.player__volume')! as HTMLInputElement;
let playerAudio = player.querySelector('.player__audio') as HTMLAudioElement | null;
let sound: string = '';
let audioIsPlaying: boolean = false;

function addAudioCards(card: ICard): void {
  const button: HTMLButtonElement = document.createElement('button');
  button.classList.add('player__item');
  button.style.backgroundImage = `url(${card.picture})`;
  button.setAttribute('id', card.id);
  button.innerHTML = `<img class='player__item-icon' src='${card.icon}' alt='player icon'>`;
  playerList.append(button);
}

function findCard(cardId: string): ICard | undefined {
  return cards.find((card: ICard): boolean => card.id === cardId);
}

function playAudio(target: HTMLElement): void {
  playerAudio?.play();
  const cardIcon = target.querySelector('.player__item-icon') as HTMLImageElement;
  cardIcon.src = pauseImg;
  audioIsPlaying = true;
}

function pauseAudio(target: HTMLElement, card: ICard): void {
  playerAudio?.pause();
  const pauseIcon = target.querySelector('.player__item-icon') as HTMLImageElement;
  pauseIcon.src = card.icon;
  audioIsPlaying = false;
}

cards.forEach(addAudioCards);

playerList.addEventListener('click', async (e: Event): Promise<void> => {
  const target = e.target as HTMLElement | null;
  if (!target) {
    return;
  }

  const card: ICard | undefined = findCard(target.id);

  if (typeof card === 'undefined') {
    return;
  }

  const cardSound = await import(`./assets/audio/${card.sound}.mp3`);

  document.querySelector('body')!.style.backgroundImage = `url(${card.picture})`;

  if (!playerAudio) {
    playerAudio = document.createElement('audio');
    const audioAttrs: { [key: string]: string } = {
      id: 'player-audio',
      type: 'audio/mp3',
      class: 'player__audio',
    };
    Object.keys(audioAttrs).forEach((attr: string): void => {
      playerAudio?.setAttribute(attr, audioAttrs[attr]);
    });
    player.appendChild(playerAudio);
  }

  if (sound !== card.sound) {
    player.querySelectorAll(`.player__item:not(#${target.id})`).forEach((item: Element): void => {
      const icon = item.querySelector('.player__item-icon')! as HTMLImageElement;
      const itemCard: ICard | undefined = findCard(item.id);

      if (typeof itemCard === 'undefined') {
        return;
      }

      icon.src = itemCard.icon;
    });
    playerAudio.volume = +playerVolume.value * 0.01;
    playerAudio.src = cardSound.default;
    playAudio(target);
    sound = card.sound;
  } else if (audioIsPlaying) {
    pauseAudio(target, card);
  } else {
    playAudio(target);
  }
});

playerVolume.addEventListener('input', (): void => {
  if (playerAudio) {
    playerAudio.volume = +playerVolume.value * 0.01;
  }
});

import rainyBg from '../img/rainy-bg.jpg';
import winterBg from '../img/winter-bg.jpg';
import summerBg from '../img/summer-bg.jpg';
import rainyIcon from '../img/icons/cloud-rain.svg';
import winterIcon from '../img/icons/cloud-snow.svg';
import summerIcon from '../img/icons/sun.svg';
import { ICard, TCards } from '../../types';

const summerCard: ICard = {
  id: 'summer-card',
  picture: summerBg,
  icon: summerIcon,
  sound: 'summer',
};

const rainCard: ICard = {
  id: 'rain-card',
  picture: rainyBg,
  icon: rainyIcon,
  sound: 'rain',
};

const winterCard: ICard = {
  id: 'winter-card',
  picture: winterBg,
  icon: winterIcon,
  sound: 'winter',
};

export const cards: TCards = [summerCard, rainCard, winterCard];

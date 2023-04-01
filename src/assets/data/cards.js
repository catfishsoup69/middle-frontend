import rainyBg from '../img/rainy-bg.jpg';
import winterBg from '../img/winter-bg.jpg';
import summerBg from '../img/summer-bg.jpg';
import rainyIcon from '../img/icons/cloud-rain.svg';
import winterIcon from '../img/icons/cloud-snow.svg';
import summerIcon from '../img/icons/sun.svg';

export default [
  {
    id: 'summer-card',
    picture: summerBg,
    icon: summerIcon,
    sound: 'summer',
  },
  {
    id: 'rain-card',
    picture: rainyBg,
    icon: rainyIcon,
    sound: 'rain',
  },
  {
    id: 'winter-card',
    picture: winterBg,
    icon: winterIcon,
    sound: 'winter',
  },
];

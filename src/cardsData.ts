import statsPrevCardImg from './images/designs/stats-card-preview.jpg';
import adviceGenerator from './images/designs/advice-generator.jpg';
import jobListing from './images/designs/job-listing.jpg';
import rpsGameImg from './images/designs/rps-game.jpg';
import tipCalcImg from './images/designs/tip_calculator.jpg';


type CardData = {
    id: string | number,
    title: string,
    cardUrl: string,
    imgUrl?: string
};

export const data: CardData[] = [
    {
        id: '1',
        title: 'Stats Preview Card Component',
        cardUrl: '/statsCardPreview',
        imgUrl: statsPrevCardImg
    },
    {
        id: '2',
        title: 'Advice Generator',
        cardUrl: '/adviceGenerator',
        imgUrl: adviceGenerator
    },
    {
        id: '3',
        title: 'Job Listing',
        cardUrl: '/jobListing',
        imgUrl: jobListing
    },
    {
        id: '4',
        title: 'Rock, Paper and Scissor Game',
        cardUrl: '/rpsGamePage',
        imgUrl: rpsGameImg
    },
    {
        id: '5',
        title: 'Splitter',
        cardUrl: '/tipGenerator',
        imgUrl: tipCalcImg
    }
]
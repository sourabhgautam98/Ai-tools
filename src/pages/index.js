
import Carousel from '../components/Carousel/Carousel';

const data = [
  { 
    src: '/carouselImage/one.jpg', 
    alt: 'First slide',
    headline: 'Text To Speech',
    subheadline: 'Text-to-Speech (TTS) is a technology that converts written text into spoken words.',
    buttonText: 'Text To Speech',
    route: 'tools/textToSpeech', 
  },
  { 
    src: '/carouselImage/two.jpeg', 
    alt: 'Second slide',
    headline: 'Text To Image',
    subheadline: 'Text-to-Image (TTI) is a technology that converts written text descriptions into visual images.',
    buttonText: 'Text To Image',
    route: 'tools/textToImage', 
  },
  { 
    src: '/carouselImage/three.jpg', 
    alt: 'Third slide',
    headline: 'Background Removal',
    subheadline: 'Background Removal is a technology that isolates the subject of an image by removing its background.',
    buttonText: 'Background Removal',
    route: 'tools/backGroundRemover', 
  },
];

export default function Home() {
  return (
    <>
      <Carousel data={data}  /> 
    </>
  );
}
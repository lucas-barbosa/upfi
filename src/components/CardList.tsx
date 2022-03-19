import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards = [] }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');

  const handleSelectedImage = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  return (
    <>
      <SimpleGrid
        gap="40px"
        templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        {cards.length > 0 &&
          cards.map(card => (
            <Card data={card} key={card.id} viewImage={handleSelectedImage} />
          ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImage}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

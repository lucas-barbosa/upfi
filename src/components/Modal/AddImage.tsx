import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { FormAddImage } from '../Form/FormAddImage';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900" m={[8, 8, 8, 0]}>
        <ModalHeader fontSize="4xl" textAlign={['center', 'left']}>
          Nova imagem
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody px={[20, 30, 60]}>
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

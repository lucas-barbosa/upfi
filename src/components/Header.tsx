import { Box, Flex, Button, useDisclosure, Image } from '@chakra-ui/react';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          wrap="wrap"
          gridGap="10px"
          maxW={1120}
          mx="auto"
          px={20}
          py={6}
        >
          <Image src="logo.svg" h={10} />
          <Button onClick={() => onOpen()}>Adicionar imagem</Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}

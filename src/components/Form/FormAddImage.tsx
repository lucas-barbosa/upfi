import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type FormProps = {
  image: string;
  title: string;
  description: string;
};

type ImageProps = {
  url: string;
  title: string;
  description: string;
};

const acceptedImageFormatRegex = /(image\/(jpeg|png|gif))/;

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: {
        value: true,
        message: 'Arquivo obrigatório',
      },
      validate: {
        lessThan10MB: images =>
          images[0].size < 10 * 1024 * 1024 ||
          'O arquivo deve ser menor que 10MB',
        acceptedFormats: images =>
          acceptedImageFormatRegex.test(images[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: {
        value: true,
        message: 'Título obrigatório',
      },
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Mínimo de 2 caracteres',
      },
    },
    description: {
      required: {
        value: true,
        message: 'Mínimo de 2 caracteres.',
      },
      maxLength: {
        value: 65,
        message: 'Mínimo de 2 caracteres.',
      },
    },
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (payload: ImageProps) => {
      return api.post('/images', {
        url: payload.url,
        title: payload.title,
        description: payload.description,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm<FormProps>();

  const { errors } = formState;

  const onSubmit = async (data: FormProps): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
        });

        return;
      }

      await mutation.mutateAsync({
        title: data.title,
        description: data.description,
        url: imageUrl,
      });

      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success',
      });
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
      });
    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', { ...formValidations.image })}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', { ...formValidations.title })}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', { ...formValidations.description })}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}

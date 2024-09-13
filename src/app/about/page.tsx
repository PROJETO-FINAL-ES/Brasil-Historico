// pages/museum-map.js
"use client"
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { styled } from '@mui/system';

// Importando a fonte EB Garamond
import '@fontsource/eb-garamond';

// Definindo o estilo com animação diretamente no arquivo
const FadeInBox = styled(Box)(({ theme }) => ({
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  animation: 'fadeIn 1s ease-out',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));

const MuseumMap = dynamic(() => import('@/components/MuseumMap'), { ssr: false });

const MuseumMapPage = () => {
  return (
    <FadeInBox>
      <Typography
        variant="h3" // Tamanho menor para o texto
        gutterBottom
        sx={{
          fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
          color: '#d4af37', // Tom dourado
          textAlign: 'center',
          maxWidth: '80%', // Ajuste a largura máxima para melhorar a responsividade
        }}
      >
        Explore Museus próximos a você!
      </Typography>
      <Typography
        variant="h6" // Tamanho menor para o texto
        gutterBottom
        sx={{
          fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
          textAlign: 'justify',
          maxWidth: '70%', // Ajuste a largura máxima para melhorar a responsividade
        }}
      >
        Quer enriquecer seu conhecimento e mergulhar na história nacional? Explore museus próximos e descubra a riqueza cultural e histórica que sua região tem a oferecer!
      </Typography>

      <Box
        width="80%" // Ajuste a largura do mapa conforme necessário
        maxWidth="800px" // Define uma largura máxima
        height="400px" // Ajuste a altura do mapa conforme necessário
        mt={2}
      >
        <MuseumMap />
      </Box>
    </FadeInBox>
  );
};

export default MuseumMapPage;

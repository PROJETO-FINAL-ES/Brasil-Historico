"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// Define a fonte EB Garamond
import '@fontsource/eb-garamond';

export default function Visit() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    quantidade: '',
    horario: '',
  });

  const [total, setTotal] = useState(0);
  const precoTicket = 30;
  const [pagamentoSimulado, setPagamentoSimulado] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/assets/img/post-slide-5.jpg", caption: "Museu Histórico Jacinto de Sousa - Fachada" },
    { src: "/assets/img/post-slide-6.jpg", caption: "Acervo do Museu" },
    { src: "/assets/img/post-slide-7.jpg", caption: "Sala de Exposições" },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Alterne os slides a cada 3 segundos

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    if (name === 'quantidade') {
      setTotal(Number(value) * precoTicket);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, email, data, quantidade, horario } = formData;

    if (!nome || !email || !data || !quantidade || !horario) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const dataSelecionada = new Date(data);
    const hoje = new Date();
    const diaSemana = dataSelecionada.getDay();

    if (dataSelecionada < hoje || diaSemana === 1) {
      alert("A data selecionada deve ser posterior a hoje e não pode ser uma segunda-feira.");
      return;
    }

    setPagamentoSimulado(true);

    const mensagem = `\
      Olá, gostaria de confirmar o agendamento de visita ao Museu Histórico Jacinto de Sousa.
      \nNome: ${nome}
      \nE-mail: ${email}
      \nData: ${data}
      \nHorário: ${horario}
      \nQuantidade de Tickets: ${quantidade}
      \nTotal: R$ ${total}
    `;

    window.open(`https://wa.me/5581999999999?text=${encodeURIComponent(mensagem)}`, '_blank');

    // Limpar o formulário
    setFormData({
      nome: '',
      email: '',
      data: '',
      quantidade: '',
      horario: '',
    });
    setTotal(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ 
        fontFamily: 'EB Garamond, serif', // Aplica a tipografia EB Garamond
        animation: 'fadeIn 1s ease-in-out', // Animação de surgimento
        '@keyframes fadeIn': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }}
>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: '#d4af37', // Tom dourado
          textAlign: 'center',
          maxWidth: '80%',
          fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
          mb: 2,
        }}
      >
        Se interessou por algum museu? Agende agora sua visita
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
          textAlign: 'justify',
          maxWidth: '70%',
          mb: 3,
        }}
      >
Sabemos como é importante conhecer fatos históricos de âmbitos nacionais, mas entender a história local é igualmente crucial para uma apreciação mais rica e completa do nosso passado.
Por isso, esse sistema foi desenvolvido para facilitar o acesso e a exploração de patrimônios culturais e históricos, permitindo que mais pessoas se conectem com a rica tapeçaria do passado de suas comunidades.
      </Typography>

      {/* Carrossel de Slides */}
      <Box className="carousel" sx={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', overflow: 'hidden' }}>
        <Box className="carousel-slides" sx={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <Box key={index} className="carousel-slide" sx={{ minWidth: '100%', position: 'relative' }}>
              <Image src={slide.src} alt={`Museu Histórico Jacinto de Sousa ${index + 1}`} layout="fill" objectFit="cover" />
              <Box className="carousel-caption" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px' }}>
                {slide.caption}
              </Box>
            </Box>
          ))}
        </Box>
        <Button variant="contained" className="carousel-button prev" onClick={handlePrevSlide} sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', cursor: 'pointer', left: '10px' }}>❮</Button>
        <Button variant="contained" className="carousel-button next" onClick={handleNextSlide} sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', cursor: 'pointer', right: '10px' }}>❯</Button>
      </Box>

      {/* Formulário de agendamento */}
      <Box component="div" className="form-container" sx={{ padding: '20px', border: '2px solid #d4af37', borderRadius: '10px' }}>
  <Typography variant="h4" gutterBottom
    sx={{
      color: '#d4af37', // Tom dourado
      maxWidth: '80%',
      fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
      mb: 2,
    }}>
    Agende Sua Visita
  </Typography>
  <form onSubmit={handleSubmit} className="form">
    <FormControl fullWidth margin="normal">
      <TextField
        label="Nome Completo"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <TextField
        label="E-mail"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Data da Visita"
        type="date"
        name="data"
        value={formData.data}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: new Date().toISOString().split('T')[0] }}
      />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputLabel id="horario-label">Horário de Visita</InputLabel>
      <Select
        labelId="horario-label"
        name="horario"
        value={formData.horario}
        onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
        required
      >
        <MenuItem value="">Selecione o horário desejado</MenuItem>
        <MenuItem value="08:00">08:00</MenuItem>
        <MenuItem value="09:00">09:00</MenuItem>
        <MenuItem value="10:00">10:00</MenuItem>
        <MenuItem value="11:00">11:00</MenuItem>
        <MenuItem value="14:00">14:00</MenuItem>
        <MenuItem value="15:00">15:00</MenuItem>
        <MenuItem value="16:00">16:00</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Quantidade de Tickets"
        type="number"
        name="quantidade"
        value={formData.quantidade}
        onChange={handleChange}
        required
        InputProps={{ inputProps: { min: 1 } }}
      />
    </FormControl>
    <Typography variant="h6" gutterBottom>
      Total: R$ {total}
    </Typography>
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      sx={{
        backgroundColor: '#f2f2f2', // Cor cinza
        fontFamily: 'EB Garamond, serif', // Fonte EB Garamond
        color: '#d4af37', // Cor dourada
        '&:hover': {
          backgroundColor: '#000000', // Cor preta ao passar o mouse
          color: '#ffffff', // Cor branca ao passar o mouse
        },
        transition: 'background-color 0.3s ease, color 0.3s ease', // Suaviza a transição de cores
      }}
    >
      Confirmar Agendamento
    </Button>
  </form>
</Box>


      {/* Seção de pagamento simulado */}
      {pagamentoSimulado && (
        <Box className="payment-simulation" sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">
            Simulação de pagamento concluída com sucesso. Por favor, finalize sua compra via WhatsApp.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

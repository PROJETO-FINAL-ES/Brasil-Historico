'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextField, Button, Box, Typography } from '@mui/material';
import '@fontsource/eb-garamond';

export default function Visit() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    quantidade: '',
    horario: '',
    nomeMuseu: '', // Novo campo
  });

  const [total, setTotal] = useState(0);
  const precoTicket = 30;
  const [pagamentoSimulado, setPagamentoSimulado] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/assets/img/post-slide-5.jpg", caption: "Museu Imperial - Fachada, Petrópolis - RJ" },
    { src: "/assets/img/post-slide-6.jpg", caption: "Museu do Ceará - Fachada, Fortaleza - CE" },
    { src: "/assets/img/post-slide-7.jpg", caption: "Memorial IFCE - Fachada, Fortaleza - CE" },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'quantidade') {
      setTotal(Number(value) * precoTicket);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, email, data, quantidade, horario, nomeMuseu } = formData;

    if (!nome || !email || !data || !quantidade || !horario || !nomeMuseu) {
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
      \nNome do Museu: ${nomeMuseu}
      \nTotal: R$ ${total}
    `;

    window.open(`https://wa.me/5581999999999?text=${encodeURIComponent(mensagem)}`, '_blank');

    await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, data, quantidade, horario, nomeMuseu }),
    });

    setFormData({
      nome: '',
      email: '',
      data: '',
      quantidade: '',
      horario: '',
      nomeMuseu: '',
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
    <main id="main">
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ 
        fontFamily: 'EB Garamond, serif',
        animation: 'fadeIn 1s ease-in-out',
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
          color: '#d4af37',
          textAlign: 'center',
          maxWidth: '80%',
          fontFamily: 'EB Garamond, serif',
          mb: 2,
        }}
      >
        Se interessou por algum museu? Agende agora sua visita
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontFamily: 'EB Garamond, serif',
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
              <Image
                src={slide.src}
                alt={`Museu Histórico Jacinto de Sousa ${index + 1}`}
                width={600} // Define width
                height={400} // Define height
                layout="responsive" // Make it responsive
                objectFit="cover" // Cover the entire container
              />
              <Box className="carousel-caption" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px' }}>
                {slide.caption}
              </Box>
            </Box>
          ))}
        </Box>
        <Button variant="contained" className="carousel-button prev" onClick={handlePrevSlide} sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', cursor: 'pointer', left: '10px' }}>❮</Button>
        <Button variant="contained" className="carousel-button next" onClick={handleNextSlide} sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', cursor: 'pointer', right: '10px' }}>❯</Button>
      </Box>

      {/* Formulário */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Nome do Museu"
          name="nomeMuseu"
          value={formData.nomeMuseu}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          type="email"
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          type="date"
          label="Data"
          name="data"
          value={formData.data}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Quantidade de Pessoas"
          name="quantidade"
          type="number"
          value={formData.quantidade}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Horário"
          name="horario"
          value={formData.horario}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Total: R$ {total}
        </Typography>
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2, 
            backgroundColor: '#d4af37', 
            '&:hover': { 
              backgroundColor: '#000000' // Ajuste da cor ao passar o mouse 
            } 
          }}
>
  Agendar Visita
</Button>

      </Box>
    </Box>
    </main>
  );
}

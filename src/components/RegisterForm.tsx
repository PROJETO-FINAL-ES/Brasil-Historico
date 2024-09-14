"use client";
import { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Box, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RegisterForm = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        setError(null);

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setOpenSnackbar(true);
            setTimeout(() => {
                router.push('/'); // Redireciona para a página de login
            }, 2000); // Tempo para o Snackbar aparecer
        } else {
            setError(`Erro: ${data.message}`);
        }
    };

    return (
        <Container 
            disableGutters 
            maxWidth={false} 
            sx={{ 
                display: 'flex', 
                minHeight: '100vh', 
                height: '100vh', 
                padding: 0, 
                margin: 0, 
                backgroundColor: '#f2f2f2' // Cor de fundo da página
            }}
        >
            <Box 
                sx={{ 
                    position: 'relative', 
                    flex: 1, 
                    height: '100%', 
                    overflow: 'hidden' 
                }}
            >
                <Image
                    src="/assets/img/post-slide-9.jpg" // Caminho da imagem na pasta public
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }} // Certifica que a imagem ocupe todo o espaço disponível
                />
            </Box>
            <Box 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',  // Garante que o conteúdo use a altura total da tela
                    padding: 0,
                    margin: 0,
                }}
            >
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        marginBottom: 4 
                    }}
                >
                    <Image
                        src="/assets/img/brasil-historico.jpg" // Caminho da imagem "Brasil Histórico"
                        alt="Brasil Histórico"
                        width={100} // Largura da imagem
                        height={100} // Altura da imagem
                        style={{ borderRadius: '50%' }} // Estilo opcional para a imagem
                    />
                    <Typography variant="h4" sx={{ mt: 2, fontFamily: 'EB Garamond, serif', color: '#d4af37' }}>
                        Brasil Histórico
                    </Typography>
                </Box>
                <Card 
                    sx={{ 
                        width: '100%', 
                        maxWidth: 400, 
                        padding: 3, 
                        borderRadius: 2, 
                        boxShadow: 3 
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Cadastro
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            {error && <Typography color="error" align="center">{error}</Typography>}
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ 
                                    mt: 2, 
                                    backgroundColor: '#f2f2f2', 
                                    color: '#d4af37', 
                                    '&:hover': {
                                        backgroundColor: '#d4af37', 
                                        color: '#000'
                                    }
                                }}
                                fullWidth
                            >
                                Cadastrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000} // Tempo para o Snackbar desaparecer
                onClose={() => setOpenSnackbar(false)}
                TransitionProps={{ onEnter: () => document.querySelector('.MuiAlert')?.classList.add('fadeIn') }}
                sx={{ 
                    position: 'fixed',
                    bottom: 20, 
                    right: 20, 
                    transform: 'translateX(0)',
                }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    Usuário cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterForm;

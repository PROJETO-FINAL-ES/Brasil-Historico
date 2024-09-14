// pages/edit-profile.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, TextField, Typography, Card, CardContent } from '@mui/material'; // Importações corrigidas
import { styled } from '@mui/material/styles';

// Estilize o título usando a cor desejada
const StyledTitle = styled(Typography)({
    color: '#d4af37',
    fontFamily: '"EB Garamond", serif',
});

// Adicione a fonte EB Garamond via Google Fonts
const GlobalStyle = styled('style')`
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap');

    body {
        font-family: 'EB Garamond', serif;
    }
`;

const EditProfile = () => {
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        if (file) formData.append('file', file);
        formData.append('token', localStorage.getItem('token') || '');

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            router.push('/profile');
        } else {
            alert(`Erro: ${data.message}`);
        }
    };

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <GlobalStyle />
            <Card sx={{ maxWidth: 600, width: '100%', backgroundColor: '#f2f2f2' }}> {/* Cor de fundo do card */}
                <CardContent>
                    <StyledTitle variant="h4" gutterBottom>Editar Perfil</StyledTitle>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ backgroundColor: 'white' }}  
                        />
                        <TextField
                            label="Bio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            sx={{ backgroundColor: 'white' }}  
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ margin: '20px 0' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#000', color: '#fff', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            Salvar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EditProfile;

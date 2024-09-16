'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutButton from '@/components/LogoutButton';

// Estilize o título usando a cor desejada
const StyledTitle = styled(Typography)( {
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

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        bio: '',
        profilePicture: '' // URL da imagem de perfil
    });

    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    // Não há mais cabeçalhos de autenticação
                });

                if (!response.ok) {
                    const data = await response.json();
                    alert(`Erro: ${data.message}`);
                    return;
                }

                const data = await response.json();
                setUser(data);

            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao buscar perfil.');
            }
        };

        fetchProfile();
    }, [router]);

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <GlobalStyle />
            <Card sx={{ maxWidth: 600, width: '100%', backgroundColor: '#f2f2f2' }}>
                <CardContent>
                    <Typography variant="h1" gutterBottom component="div">
                        <StyledTitle>Perfil</StyledTitle>
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={3}>
                            <Avatar
                                src={user.profilePicture}
                                alt="Foto de perfil"
                                sx={{ width: 100, height: 100, margin: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography variant="h6" style={{ fontWeight: 600 }}>
                                Nome: {user.name}
                            </Typography>
                            <Typography variant="body1">Email: {user.email}</Typography>
                            <Typography variant="body1" paragraph>Bio: {user.bio}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                
<LogoutButton />
                
            </Card>
        </Container>
    );
};

export default Profile;

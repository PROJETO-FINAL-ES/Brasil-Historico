import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import Image from 'next/image';

// Dados dos membros
const members = [
    {
        name: 'João da Silva',
        role: 'Fundador',
        description: 'Estudante de História e Idealizador do projeto',
        photo: '/assets/img/member1.jpg',
    },
    {
        name: 'Maria Oliveira',
        role: 'Desenvolvedora',
        description: 'Programadora e apaixonada por disseminar o conhecimento sobre o Brasil.',
        photo: '/assets/img/member2.jpg',
    },
    {
        name: 'Carlos Pereira',
        role: 'Setor Financeiro',
        description: 'Responsável pelo setor de pagamentos para os agendamentos de visita',
        photo: '/assets/img/member3.jpg',
    },
    {
        name: 'Ana Souza',
        role: 'Assistente Administrativo',
        description: 'Responsável por organizar e agendar visitas aos museus, garantindo uma experiência memorável.',
        photo: '/assets/img/member4.jpg',
    },
];

const AboutUsPage: React.FC = () => {
    return (
        <main id="main">
        <div style={{ fontFamily: 'EB Garamond, serif', backgroundColor: '#fff', padding: '20px' }}>
            <Typography variant="h2" style={{ color: '#d4af37', textAlign: 'center', marginBottom: '20px' }}>
                Sobre Nós
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '40px' }}>
                Somos uma organização sem fins lucrativos dedicada a difundir a rica história do Brasil. Oferecemos
                a nossos visitantes a oportunidade de agendar visitas aos museus e descobrir locais históricos
                próximos. Nossa missão é preservar e promover o patrimônio cultural brasileiro.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {members.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card style={{ 
                            textAlign: 'center', 
                            borderRadius: '15px', 
                            backgroundColor: '#f2f2f2', 
                            padding: '20px', 
                            height: '100%' 
                        }}>
                            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: '50%', marginBottom: '10px' }}
                                />
                                <Typography variant="h6" style={{ color: '#d4af37', marginBottom: '10px' }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    {member.role}
                                </Typography>
                                <Typography variant="body2">
                                    {member.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
        </main>
    );
};

export default AboutUsPage;

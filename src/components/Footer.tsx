// src/components/Footer.tsx
import React from 'react';
import { Typography, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: '#d4af37', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Brasil Histórico
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '20px' }}>
                Todos os direitos reservados © {new Date().getFullYear()}
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Link href="https://facebook.com" target="_blank" rel="noopener" color="inherit">
                        <Facebook />
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="https://twitter.com" target="_blank" rel="noopener" color="inherit">
                        <Twitter />
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="https://instagram.com" target="_blank" rel="noopener" color="inherit">
                        <Instagram />
                    </Link>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;

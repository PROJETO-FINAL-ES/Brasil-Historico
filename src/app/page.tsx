// app/page.tsx
import { Container, Typography, Button } from '@mui/material';
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <LoginForm />
      <Typography variant="body1" gutterBottom>
        Não tem uma conta? <Link href="/register">Cadastre-se aqui</Link>
      </Typography>
    </Container>
  );
};

export default HomePage;

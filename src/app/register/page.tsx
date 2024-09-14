// app/register/page.tsx
import RegisterForm from '@/components/RegisterForm';
import { Container, Typography } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Cadastro</Typography>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;

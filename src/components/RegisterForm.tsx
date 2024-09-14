// components/RegisterForm.tsx
"use client"
import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
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
            alert('Usuário cadastrado com sucesso!');
            router.push('/'); // Redireciona para a página de login
        } else {
            setError(`Erro: ${data.message}`);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Cadastro</Typography>
            <form onSubmit={handleSubmit}>
                {error && <Typography color="error">{error}</Typography>}
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
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
        </Container>
    );
};

export default RegisterForm;

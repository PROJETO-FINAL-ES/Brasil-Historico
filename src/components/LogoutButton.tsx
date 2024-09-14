// components/LogoutButton.tsx
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // Redireciona para a página de login após o logout
            router.push('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <Button 
            variant="contained" 
            onClick={handleLogout}
            sx={{ 
                backgroundColor: '#d4af37', 
                color: '#000', 
                '&:hover': {
                    backgroundColor: '#f2f2f2', 
                    color: '#d4af37'
                }
            }}
        >
            Sair
        </Button>
    );
};

export default LogoutButton;

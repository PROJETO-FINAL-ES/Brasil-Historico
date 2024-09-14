// src/app/profile/page.tsx
import { getSession } from 'next-auth/react'; // ou a função que retorna a sessão
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProfilePage = async () => {
  // Obtendo a sessão
  const session = await getSession();

  if (!session || !session.user || !session.user.email) {
    return <p>Usuário não autenticado</p>;
  }

  // Buscar dados do usuário do banco de dados
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, // Certifique-se de que session.user.email não é null
  });

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Adicione mais campos conforme necessário */}
    </div>
  );
};

export default ProfilePage;

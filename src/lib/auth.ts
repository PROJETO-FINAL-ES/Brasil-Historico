// src/lib/auth.ts

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função de registro de usuário
export async function registerUser(email: string, password: string, name?: string) {
  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  // Gera um hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o novo usuário no banco de dados
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
}

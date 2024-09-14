import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

// Estende o tipo de DefaultSession para incluir o campo id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
  }
}

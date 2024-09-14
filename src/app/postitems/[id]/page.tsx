'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
}

export default function PostItem({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [item, setItem] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const postResponse = await fetch(`/api/postitems/${id}`);
        if (!postResponse.ok) throw new Error('Post não encontrado');
        const post = await postResponse.json();
        setItem(post);
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 post-content">
              <div className="single-post">
                
                <h1 className="post-title">{item?.title}</h1>
                <div className="post-meta">
                  <span className="date">{item?.category}</span>
                  <span className="mx-1">
                    <i className="bi bi-dot"></i>
                  </span>
                  <span>{new Date(item?.date || '').toLocaleDateString('pt-BR')}</span>
                </div>
                {item?.img && <img src={`/${item.img}`} alt={item.title} className='img-fluid post-image' />}
                <div className="post-content">
                  <p>{item?.brief}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1000px; /* Ajuste a largura máxima conforme necessário */
          margin: 0 auto;
          padding: 20px;
          text-align: center; /* Centraliza o texto e o conteúdo */
        }

        .post-title {
          font-size: 2rem;
          margin-top: 20px;
          line-height: 1.3;
        }

        .post-meta {
          font-size: 1rem;
          color: #888;
          margin-bottom: 15px;
        }

        .post-meta .date {
          font-weight: bold;
        }

        .post-image {
          max-width: 100%;
          height: auto;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .post-content {
          padding: 0 15px;
        }

        .post-content p {
          font-size: 1.2rem; /* Tamanho da fonte ajustado */
          line-height: 1.6;
          color: #333;
          text-align: justify; /* Justifica o texto */
          margin: 0 auto; /* Centraliza o parágrafo */
          max-width: 800px; /* Ajusta a largura máxima do parágrafo */
        }
      `}</style>
    </main>
  );
}

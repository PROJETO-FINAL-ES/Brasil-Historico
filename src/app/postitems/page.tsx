'use client'; // Marca este arquivo como um componente cliente

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Modal, Button } from 'react-bootstrap'; // Usando o Bootstrap para a modal

interface Post {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
}

export default function PostItems() {
  const [items, setItems] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const getItemsData = () => {
    fetch(`/api/postitems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error: unknown) => {
        let errorMessage = 'Erro ao buscar os itens';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error(errorMessage);
      });
  };

  useEffect(() => {
    getItemsData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/postitems/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter((item) => item._id !== id));
        setShowModal(false); // Fechar a modal após a exclusão
      } else {
        const errorData = await response.json();
        console.error("Erro ao deletar o item:", errorData.message);
      }
    } catch (error: unknown) {
      let errorMessage = 'Erro ao deletar o item';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
    }
  };

  const openDeleteModal = (id: string) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="container">
      <main id="main">
        <section id="posts" className="posts">
          <div className="grid">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item._id} className="post-item position-relative">
                  <Link href={`/postitems/${item._id}`}>
                    <div>
                      <img src={item.img} alt={item.title} className="post-image" />
                      <div className="post-details">
                        <span className="post-category">{item.category} - {formatDate(item.date)}</span>
                        <h2 className="post-title">{item.title}</h2>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn-delete position-absolute top-0 end-0 m-2"
                    onClick={() => openDeleteModal(item._id)}
                    aria-label="Deletar"
                  >
                    <DeleteOutlineIcon />
                  </button>
                  <Link href={`/createpostitems/${item._id}`}>
                    <button
                      className="btn-edit position-absolute top-0 start-0 m-2"
                      aria-label="Editar"
                    >
                      <ModeEditIcon />
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p>Nenhum post encontrado.</p>
            )}
          </div>
        </section>
      </main>

      {/* Modal de confirmação para exclusão */}
      <Modal show={showModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => itemToDelete && handleDelete(itemToDelete)}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .post-item {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          position: relative;
        }

        .post-item:hover {
          transform: scale(1.02);
        }

        .post-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .post-details {
          padding: 15px;
        }

        .post-category {
          display: block;
          font-size: 14px;
          color: #aaa;
          margin-bottom: 5px;
        }

        .post-title {
          font-size: 18px;
          margin: 10px 0;
          color: #333;
        }

        .btn-edit,
        .btn-delete {
          background: none;
          border: none;
          color: #d4af37;
          cursor: pointer;
        }

        .btn-edit:hover,
        .btn-delete:hover {
          color: black;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          color: white;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
          color: white;
        }
      `}</style>
    </div>
  );
}

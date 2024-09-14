'use client';

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePostItem() {
  const router = useRouter(); // Importar useRouter corretamente
  const [text, setText] = useState({
    title: '',
    img: '',
    category: '',
    author: '',
    brief: '',
    validate: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      text.title === '' ||
      text.img === '' ||
      text.category === '' ||
      text.brief === ''
    ) {
      setText({ ...text, validate: 'incomplete' });
      return;
    }

    try {
      const response = await fetch('/api/postitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      setText({ ...text, validate: 'loading' });

      if (response.ok) {
        // Opcional: Se a resposta da API inclui um ID, você pode usá-lo para redirecionar para o post específico
        // const data = await response.json();
        // const postId = data.id;

        setText({ ...text, validate: 'success' });
        setShowModal(true);

        // Redireciona para a página /postitems após a modal ser fechada
      } else {
        setText({ ...text, validate: 'error' });
      }
    } catch (error) {
      setText({ ...text, validate: 'error' });
      console.error('Error:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/postitems'); // Redireciona para a página /postitems após o fechamento da modal
  };

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container" data-aos="fade-up">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Criar um novo artigo</h1>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label>Título</label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite o título"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Imagem URL</label>
                        <input
                          type="text"
                          name="img"
                          value={text.img}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Cole aqui a URL da imagem desejada"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Categoria</label>
                        <input
                          type="text"
                          name="category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite a categoria do artigo"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Autor</label>
                        <input
                          type="text"
                          name="author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Digite o nome do autor"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Resumo</label>
                        <textarea
                          className="form-control"
                          name="brief"
                          value={text.brief}
                          onChange={handleTextChange}
                          placeholder="Digite um breve resumo do conteúdo"
                          cols={30}
                          rows={10}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === 'loading' && (
                          <div className="loading">Enviando Artigo...</div>
                        )}
                        {text.validate === 'incomplete' && (
                          <div className="error-message">
                            Preencha os campos obrigatórios.
                          </div>
                        )}
                        {text.validate === 'error' && (
                          <div className="error-message">Server Error</div>
                        )}
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Postar Artigo"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sua contribuição foi aceita. Obrigado!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

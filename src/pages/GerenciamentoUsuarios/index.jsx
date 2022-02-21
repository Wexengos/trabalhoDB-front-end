import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";

import Usuario from "../../components/Usuario";

import { ImPlus } from "react-icons/im";

import sigAPI from "../../services/sigAPI";

import styles from "./styles.module.scss";

export default function GerenciamentoUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [show, setShow] = useState(false);

  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    async function getUsuarios() {
      await sigAPI.leitura.usuarios
        .pull()
        .then((res) => {
          console.log(res);
          setUsuarios(res.data);
        })
        .catch((err) => console.log(err.message));
    }

    getUsuarios();
  }, []);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  async function handleSend(obj) {
    console.log(obj);
    await sigAPI.registro.usuarios
      .send(obj)
      .then((res) => {
        console.log(res.status);
        alert("Usuário cadastrado!");
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className={styles.container}>
      <button className={styles.modalButton} onClick={handleShow}>
          <ImPlus className={styles.buttonIcon} />{" "}
          <p className={styles.buttonText}>Novo usuário</p>
      </button>
      <h1 className={styles.pageTitle}>Usuários cadastrados:</h1>

      <Row className={styles.users}>
        {usuarios.map((item, index) => {
          return (
            <Col key={index}>
              <Usuario usuario={item} />
            </Col>
          );
        })}
      </Row>

      <Modal
        contentClassName={styles.modalContent}
        show={show}
        size={"md"}
        centered
        onHide={handleClose}
        dialogClassName={styles.modal}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formRow}>
            <p>Nome do usuário: </p>
            <input {...register("nome")} />
          </div>

          <div>
            <p>E-mail: </p>
            <input {...register("email")} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit(handleSend)}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

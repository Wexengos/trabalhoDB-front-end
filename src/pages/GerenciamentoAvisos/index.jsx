import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ImPlus } from "react-icons/im";

import Aviso from "../../components/Aviso";

import sigAPI from "../../services/sigAPI";

import styles from "./styles.module.scss";

export default function GerenciamentoAvisos() {
  const [avisos, setAvisos] = useState([]);

  const [show, setShow] = useState(false);

  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    async function getAvisos() {
      await sigAPI.leitura.avisos
        .pull()
        .then((res) => {
          console.log(res);
          setAvisos(res.data);
        })
        .catch((err) => console.log(err.message));
    }

    getAvisos();
  }, []);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  async function handleSend(obj) {
    console.log(obj);
    await sigAPI.registro.avisos
      .send(obj)
      .then((res) => {
        console.log(res.status);
        alert("Aviso adicionado!");
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className={styles.container}>
      <button className={styles.modalButton} onClick={handleShow}>
        <ImPlus className={styles.buttonIcon} />
      </button>
      <h1 className={styles.pageTitle}>Quadro de Avisos:</h1>

      {/* <Aviso
        aviso={{
          nome: "Carlos",
          id_aviso: 5,
          conteudo_aviso: "Feijoada de graça hoje.",
          data_publicacao: "22/02/2022",
        }}
      /> */}

      <Row className={styles.warnings}>
        {avisos.map((item, index) => {
          return (
            <Col key={index}>
              <Aviso aviso={item} />
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
          <Modal.Title>Novo aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formRow}>
            <p>ID do Coordenador: </p>
            <input className={styles.numberInput}
              {...register("id_coordenador")}
            />
          </div>

          <div>
            <p>Conteúdo do Aviso: </p>
            <textarea
              className={styles.textArea}
              {...register("conteudo_aviso")}
            ></textarea>
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

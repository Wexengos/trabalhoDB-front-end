import { useState } from "react";

import moment from "moment";

import { useForm } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import sigAPI from "../../services/sigAPI";

import styles from "./styles.module.scss";

export default function Aviso({ aviso }) {
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  function handleShow() {
    reset({
      id_coordenador: aviso.id_coordenador,
      conteudo_aviso: aviso.conteudo_aviso,
    });
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  async function deleteAviso() {
    await sigAPI.remocao.avisos
      .erase(aviso.id_aviso)
      .then((res) => {
        alert("Aviso deletado ", res.status);
        window.location.reload();
      })
      .catch((err) => alert("Erro: ", err.message));
  }

  async function handleEdit(obj) {
    console.log(obj);
    await sigAPI.edicao.avisos
      .edit(aviso.id_aviso, obj)
      .then((res) => {
        console.log(res.status);
        alert("Aviso editado!");
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className={styles.aviso}>
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
          <Modal.Title>Edição de aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formRow}>
            <p>ID do coordenador: </p>
            <input
              className={styles.numberInput}
              {...register("id_coordenador")}
            ></input>
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
          <Button variant="primary" onClick={handleSubmit(handleEdit)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.topoCard}>
        <h1 className={styles.authorName}>{aviso.nome}</h1>{" "}
        <div>
          <button className={styles.editButton} onClick={() => handleShow()}>
            <BsFillPencilFill />
          </button>
          <button className={styles.deleteButton} onClick={() => deleteAviso()}>
            <AiFillCloseCircle />
          </button>
        </div>
      </div>
      <p>{aviso.conteudo_aviso}</p>
      <p>{moment(aviso.data_publicacao).format("L")}</p>
    </div>
  );
}

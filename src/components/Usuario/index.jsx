import { useState } from "react";

import { useForm } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import sigAPI from "../../services/sigAPI";

import styles from "./styles.module.scss";

export default function Usuario({ usuario }) {
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm({});

  function handleShow() {
    reset({
      nome: usuario.nome,
      email: usuario.email,
    });
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  async function deleteUsuario() {
    await sigAPI.remocao.usuarios
      .erase(usuario.id_usuario)
      .then((res) => {
        alert("Usuário deletado ", res.status);
        window.location.reload();
      })
      .catch((err) => alert("Erro: ", err.message));
  }

  async function handleEdit(obj) {
    console.log(obj);
    await sigAPI.edicao.usuarios
      .edit(usuario.id_usuario, obj)
      .then((res) => {
        console.log(res.status);
        alert("Usuário editado!");
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className={styles.usuario}>
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
          <Modal.Title>Edição de usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.formRow}>
            <p>Nome do usuário: </p>
            <input {...register("nome")} />
          </div>

          <div>
              <p>E-mail:</p>
              <input {...register("email")} />
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >
                Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit(handleEdit)}>
                Salvar
            </Button>
        </Modal.Footer>
      </Modal>

      <h1>{usuario.nome}</h1>
      <div>
        <button className={styles.deleteButton} onClick={() => deleteUsuario()}>
          <AiFillCloseCircle />
        </button>
        <button className={styles.editButton} onClick={() => handleShow()}>
          <BsFillPencilFill />
        </button>
      </div>
      <p>{usuario.email}</p>
    </div>
  );
}

import { useState } from "react";

import Aviso from "../../components/Aviso";

import styles from "./styles.module.scss";

export default function GerenciamentoAvisos() {
  const [avisos, setAvisos] = useState([
    {
      coord_name: "Arnaldo",
      date: "19/09/2012",
      content: "Novo jogo de futebol SI vs. CDC!",
    },
    {
      coord_name: "Rick",
      date: "17/01/2015",
      content: "Abertas as matrículas para o semestre 2015.2!",
    },
    {
      coord_name: "Cibele",
      date: "09/12/2021",
      content: "Infestação de besouros no ICB!",
    },
  ]);

  return (
    <div className={styles.container}>
      <h1>Quadro de Avisos:</h1>

      <div>
        {avisos.map((item, index) => {
          return (
            <div>
              <Aviso
                coord_name={item.coord_name}
                date={item.date}
                content={item.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

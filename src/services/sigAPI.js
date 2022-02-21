import { api } from "./api";

import axios from "axios";

const sigAPI = {
  registro: {
    avisos: {
      send: (content) => {
        return api.post("aviso", content);
      },
    },
    usuarios: {
      send: (content) => {
        return api.post("usuario", content);
      },
    },
  },
  leitura: {
    avisos: {
      pull: () => {
        return api.get("avisos");
      },
    },
    usuarios: {
      pull: () => {
        return api.get("usuarios");
      },
    },
  },
  edicao: {
    avisos: {
      edit: (id, obj) => {
        return api.put(`aviso/${id}`, obj);
      },
    },
    usuarios: {
      edit: (id, obj) => {
        return api.put(`usuario/${id}`, obj);
      },
    },
  },
  remocao: {
    avisos: {
      erase: (id) => {
        return api.delete(`aviso/${id}`);
      },
    },
    usuarios: {
      erase: (id) => {
        return api.delete(`usuario/${id}`);
      },
    },
  },
};

export default sigAPI;

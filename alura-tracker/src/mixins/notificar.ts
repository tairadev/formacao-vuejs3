import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/mutations-types";
import { store } from "@/store";

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string) {
      store.commit(NOTIFICAR, {
        tipo,
        titulo,
        texto,
      });
    },
  },
};

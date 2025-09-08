import { TipoNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/mutations-types";
import { store } from "@/store";

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) => {
    store.commit(NOTIFICAR, {
      tipo,
      titulo,
      texto,
    });
  };

  return {
    notificar,
  };
};

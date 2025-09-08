export enum TipoNotificacao {
  Sucesso = "sucesso",
  Erro = "erro",
  Info = "info",
}

export interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;
  id: number;
}

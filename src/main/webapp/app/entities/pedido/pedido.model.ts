import * as dayjs from 'dayjs';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { IEndereco } from 'app/entities/endereco/endereco.model';
import { StatusPedido } from 'app/entities/enumerations/status-pedido.model';

export interface IPedido {
  id?: number;
  criado?: dayjs.Dayjs | null;
  status?: StatusPedido | null;
  precoTotal?: number | null;
  comentarios?: string | null;
  codigoPagamento?: string | null;
  usuario?: IUsuario | null;
  endereco?: IEndereco | null;
}

export class Pedido implements IPedido {
  constructor(
    public id?: number,
    public criado?: dayjs.Dayjs | null,
    public status?: StatusPedido | null,
    public precoTotal?: number | null,
    public comentarios?: string | null,
    public codigoPagamento?: string | null,
    public usuario?: IUsuario | null,
    public endereco?: IEndereco | null
  ) {}
}

export function getPedidoIdentifier(pedido: IPedido): number | undefined {
  return pedido.id;
}

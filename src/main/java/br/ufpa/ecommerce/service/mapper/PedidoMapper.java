package br.ufpa.ecommerce.service.mapper;

import br.ufpa.ecommerce.domain.*;
import br.ufpa.ecommerce.service.dto.PedidoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pedido} and its DTO {@link PedidoDTO}.
 */
@Mapper(componentModel = "spring", uses = { UsuarioMapper.class, EnderecoMapper.class })
public interface PedidoMapper extends EntityMapper<PedidoDTO, Pedido> {
    @Mapping(target = "usuario", source = "usuario", qualifiedByName = "nome")
    @Mapping(target = "endereco", source = "endereco", qualifiedByName = "nome")
    PedidoDTO toDto(Pedido s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PedidoDTO toDtoId(Pedido pedido);
}

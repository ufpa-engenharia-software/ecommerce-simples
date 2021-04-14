package br.ufpa.ecommerce.service.mapper;

import br.ufpa.ecommerce.domain.*;
import br.ufpa.ecommerce.service.dto.ProdutoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produto} and its DTO {@link ProdutoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProdutoMapper extends EntityMapper<ProdutoDTO, Produto> {
    @Named("nome")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nome", source = "nome")
    ProdutoDTO toDtoNome(Produto produto);
}

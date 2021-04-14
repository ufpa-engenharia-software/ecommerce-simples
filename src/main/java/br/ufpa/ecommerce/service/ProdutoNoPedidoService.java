package br.ufpa.ecommerce.service;

import br.ufpa.ecommerce.service.dto.ProdutoNoPedidoDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link br.ufpa.ecommerce.domain.ProdutoNoPedido}.
 */
public interface ProdutoNoPedidoService {
    /**
     * Save a produtoNoPedido.
     *
     * @param produtoNoPedidoDTO the entity to save.
     * @return the persisted entity.
     */
    ProdutoNoPedidoDTO save(ProdutoNoPedidoDTO produtoNoPedidoDTO);

    /**
     * Partially updates a produtoNoPedido.
     *
     * @param produtoNoPedidoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProdutoNoPedidoDTO> partialUpdate(ProdutoNoPedidoDTO produtoNoPedidoDTO);

    /**
     * Get all the produtoNoPedidos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProdutoNoPedidoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" produtoNoPedido.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProdutoNoPedidoDTO> findOne(Long id);

    /**
     * Delete the "id" produtoNoPedido.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

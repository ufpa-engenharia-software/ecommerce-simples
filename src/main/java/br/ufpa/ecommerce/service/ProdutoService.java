package br.ufpa.ecommerce.service;

import br.ufpa.ecommerce.service.dto.ProdutoDTO;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link br.ufpa.ecommerce.domain.Produto}.
 */
public interface ProdutoService {
    /**
     * Save a produto.
     *
     * @param produtoDTO the entity to save.
     * @return the persisted entity.
     */
    ProdutoDTO save(ProdutoDTO produtoDTO);

    /**
     * Partially updates a produto.
     *
     * @param produtoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProdutoDTO> partialUpdate(ProdutoDTO produtoDTO);

    /**
     * Get all the produtos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProdutoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" produto.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProdutoDTO> findOne(Long id);

    /**
     * Delete the "id" produto.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<ProdutoDTO> findMaisBaratos();
}

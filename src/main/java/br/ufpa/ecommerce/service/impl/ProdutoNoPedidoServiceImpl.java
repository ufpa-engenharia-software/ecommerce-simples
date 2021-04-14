package br.ufpa.ecommerce.service.impl;

import br.ufpa.ecommerce.domain.ProdutoNoPedido;
import br.ufpa.ecommerce.repository.ProdutoNoPedidoRepository;
import br.ufpa.ecommerce.service.ProdutoNoPedidoService;
import br.ufpa.ecommerce.service.dto.ProdutoNoPedidoDTO;
import br.ufpa.ecommerce.service.mapper.ProdutoNoPedidoMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProdutoNoPedido}.
 */
@Service
@Transactional
public class ProdutoNoPedidoServiceImpl implements ProdutoNoPedidoService {

    private final Logger log = LoggerFactory.getLogger(ProdutoNoPedidoServiceImpl.class);

    private final ProdutoNoPedidoRepository produtoNoPedidoRepository;

    private final ProdutoNoPedidoMapper produtoNoPedidoMapper;

    public ProdutoNoPedidoServiceImpl(ProdutoNoPedidoRepository produtoNoPedidoRepository, ProdutoNoPedidoMapper produtoNoPedidoMapper) {
        this.produtoNoPedidoRepository = produtoNoPedidoRepository;
        this.produtoNoPedidoMapper = produtoNoPedidoMapper;
    }

    @Override
    public ProdutoNoPedidoDTO save(ProdutoNoPedidoDTO produtoNoPedidoDTO) {
        log.debug("Request to save ProdutoNoPedido : {}", produtoNoPedidoDTO);
        ProdutoNoPedido produtoNoPedido = produtoNoPedidoMapper.toEntity(produtoNoPedidoDTO);
        produtoNoPedido = produtoNoPedidoRepository.save(produtoNoPedido);
        return produtoNoPedidoMapper.toDto(produtoNoPedido);
    }

    @Override
    public Optional<ProdutoNoPedidoDTO> partialUpdate(ProdutoNoPedidoDTO produtoNoPedidoDTO) {
        log.debug("Request to partially update ProdutoNoPedido : {}", produtoNoPedidoDTO);

        return produtoNoPedidoRepository
            .findById(produtoNoPedidoDTO.getId())
            .map(
                existingProdutoNoPedido -> {
                    produtoNoPedidoMapper.partialUpdate(existingProdutoNoPedido, produtoNoPedidoDTO);
                    return existingProdutoNoPedido;
                }
            )
            .map(produtoNoPedidoRepository::save)
            .map(produtoNoPedidoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProdutoNoPedidoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProdutoNoPedidos");
        return produtoNoPedidoRepository.findAll(pageable).map(produtoNoPedidoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProdutoNoPedidoDTO> findOne(Long id) {
        log.debug("Request to get ProdutoNoPedido : {}", id);
        return produtoNoPedidoRepository.findById(id).map(produtoNoPedidoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProdutoNoPedido : {}", id);
        produtoNoPedidoRepository.deleteById(id);
    }
}

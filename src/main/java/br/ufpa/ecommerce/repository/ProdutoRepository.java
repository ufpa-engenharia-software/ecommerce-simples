package br.ufpa.ecommerce.repository;

import br.ufpa.ecommerce.domain.Produto;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Produto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>, JpaSpecificationExecutor<Produto> {

    @Query(value=" select prod from Produto prod where prod.totalEstoque>0 and prod.preco>0 order by prod.preco asc ")
    List<Produto> findMaisBaratos();

}

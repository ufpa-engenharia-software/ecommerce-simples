import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProduto, Produto } from '../produto.model';

import { ProdutoService } from './produto.service';

describe('Service Tests', () => {
  describe('Produto Service', () => {
    let service: ProdutoService;
    let httpMock: HttpTestingController;
    let elemDefault: IProduto;
    let expectedResult: IProduto | IProduto[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProdutoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        descricao: 'AAAAAAA',
        fotoUrl: 'AAAAAAA',
        sku: 'AAAAAAA',
        ean: 'AAAAAAA',
        criado: currentDate,
        preco: 0,
        precoPromocional: 0,
        totalEstoque: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            criado: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Produto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            criado: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
          },
          returnedFromService
        );

        service.create(new Produto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Produto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            descricao: 'BBBBBB',
            fotoUrl: 'BBBBBB',
            sku: 'BBBBBB',
            ean: 'BBBBBB',
            criado: currentDate.format(DATE_TIME_FORMAT),
            preco: 1,
            precoPromocional: 1,
            totalEstoque: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Produto', () => {
        const patchObject = Object.assign(
          {
            descricao: 'BBBBBB',
            sku: 'BBBBBB',
            ean: 'BBBBBB',
            criado: currentDate.format(DATE_TIME_FORMAT),
            preco: 1,
            totalEstoque: 1,
          },
          new Produto()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            criado: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Produto', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            descricao: 'BBBBBB',
            fotoUrl: 'BBBBBB',
            sku: 'BBBBBB',
            ean: 'BBBBBB',
            criado: currentDate.format(DATE_TIME_FORMAT),
            preco: 1,
            precoPromocional: 1,
            totalEstoque: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            criado: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Produto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProdutoToCollectionIfMissing', () => {
        it('should add a Produto to an empty array', () => {
          const produto: IProduto = { id: 123 };
          expectedResult = service.addProdutoToCollectionIfMissing([], produto);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(produto);
        });

        it('should not add a Produto to an array that contains it', () => {
          const produto: IProduto = { id: 123 };
          const produtoCollection: IProduto[] = [
            {
              ...produto,
            },
            { id: 456 },
          ];
          expectedResult = service.addProdutoToCollectionIfMissing(produtoCollection, produto);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Produto to an array that doesn't contain it", () => {
          const produto: IProduto = { id: 123 };
          const produtoCollection: IProduto[] = [{ id: 456 }];
          expectedResult = service.addProdutoToCollectionIfMissing(produtoCollection, produto);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(produto);
        });

        it('should add only unique Produto to an array', () => {
          const produtoArray: IProduto[] = [{ id: 123 }, { id: 456 }, { id: 96223 }];
          const produtoCollection: IProduto[] = [{ id: 123 }];
          expectedResult = service.addProdutoToCollectionIfMissing(produtoCollection, ...produtoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const produto: IProduto = { id: 123 };
          const produto2: IProduto = { id: 456 };
          expectedResult = service.addProdutoToCollectionIfMissing([], produto, produto2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(produto);
          expect(expectedResult).toContain(produto2);
        });

        it('should accept null and undefined values', () => {
          const produto: IProduto = { id: 123 };
          expectedResult = service.addProdutoToCollectionIfMissing([], null, produto, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(produto);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { ProdutoDetailComponent } from './produto-detail.component';

describe('Component Tests', () => {
  describe('Produto Management Detail Component', () => {
    let comp: ProdutoDetailComponent;
    let fixture: ComponentFixture<ProdutoDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProdutoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ produto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProdutoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProdutoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load produto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});

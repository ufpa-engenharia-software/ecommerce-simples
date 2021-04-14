package br.ufpa.ecommerce;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("br.ufpa.ecommerce");

        noClasses()
            .that()
            .resideInAnyPackage("br.ufpa.ecommerce.service..")
            .or()
            .resideInAnyPackage("br.ufpa.ecommerce.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..br.ufpa.ecommerce.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}

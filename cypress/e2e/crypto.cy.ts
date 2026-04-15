/// <reference types="cypress" />

describe('Pruebas de Carga', () => {
  before(() => {
    cy.visit('http://localhost:4200');
  });

  it('Comprobamos que al cargar la página se cargue al menos 1 elemento de la tabla.', () => {
    cy.get('table tbody tr').should('have.length.at.least', 1); //Al menos
  });

  it('Comprobamos que el primer elemento de la lista sea el que mayor capitalización de mercado tenga (para comprobar ordenación descendente)', () => {
    cy.get('table tbody tr td:nth-child(5)').then(($celdas) => {
      let primerValor = 0;
      let segundoValor = 0;
      for (let i = 0; i < $celdas.length - 1; i++) {
        // Capturamos el valor de la fila actual y de la siguiente
        const actual = parseFloat(
          $celdas
            .eq(i)
            .text()
            .replace(/[$,\s]/g, ''),
        );
        const siguiente = parseFloat(
          $celdas
            .eq(i + 1)
            .text()
            .replace(/[$,\s]/g, ''),
        );

        // Log opcional para ver qué está comparando en la consola de Cypress
        //cy.log(`Fila ${i + 1}: ${actual} >= Fila ${i + 2}: ${siguiente}`);

        // Comprobamos que el actual sea mayor o igual al siguiente
        // Ponemos un mensaje de error personalizado para saber dónde falla
        expect(actual, `La fila ${i + 1} debe ser mayor o igual a la ${i + 2}`).to.be.at.least(
          siguiente,
        );
      }

      expect(primerValor).to.be.at.least(segundoValor);
    });
  });

  it('Comprobamos que el cambio de precio durante las 24 últimas horas aparezca verde si es positivo o rojo si es negativo (columna 24H %)', () => {
    // Iteramos por cada fila
    cy.get('table tbody tr').each(($fila) => {
      // Ajusta el eq(4) si en tu tabla es otra columna
      cy.wrap($fila)
        .find('td')
        .eq(4) //Columna 4
        .then(($celda) => {
          // Limpiamos el texto (quitamos el % y espacios) y lo pasamos a número
          const valor = parseFloat($celda.text().replace('%', '').trim());
          // Aplicamos la lógica de aserción
          if (valor > 0) {
            // Si es mayor que cero, debe tener la clase verde de Bootstrap
            cy.wrap($celda).should('have.class', 'text-success');
          } else if (valor < 0) {
            // Si es menor que cero, debe tener la clase roja de Bootstrap
            cy.wrap($celda).should('have.class', 'text-danger');
          }
          // Nota: Si es exactamente 0, normalmente no lleva color o lleva uno neutro
        });
    });
  });

  it('Comprobamos que junto al precio de cada criptomoneda salga el símbolo del dólar (ej. $50000)', () => {
    cy.get('table tbody tr').each(($fila) => {
      // Asumimos que el Precio es la columna 4 (index 3)
      // Si tu tabla es: # | Logo | Nombre | Precio..., entonces es eq(3)
      cy.wrap($fila)
        .find('td')
        .eq(2) //Columna 3
        .then(($celda) => {
          const textoPrecio = $celda.text();

          // 3. Comprobación: ¿Contiene el símbolo $?
          // Usamos 'contain' para verificar que el caracter está presente
          cy.wrap($celda).should('contain', '$');

          // Opcional: Verificar que el símbolo está al principio
          expect(textoPrecio.trim().startsWith('$')).to.be.true;
        });
    });
  });
});

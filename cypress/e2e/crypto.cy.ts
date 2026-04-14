/// <reference types="cypress" />

describe('Pruebas de Carga', () => {
  it('Comprobamos que al cargar la página se cargue al menos 1 elemento de la tabla.', () => {
    cy.visit('http://localhost:4200'); // Visitamos aquí
    cy.get('table tbody tr').should('have.length.at.least', 1); //Al menos
  });

  it('Comprobamos que el primer elemento de la lista sea el que mayor capitalización de mercado tenga (para comprobar ordenación descendente)', () => {
    // 1. Ponemos el radar antes de visitar
    cy.intercept('GET', '**/coins/markets*').as('getCryptos');
    cy.visit('http://localhost:4200');

    // 2. Esperamos el JSON
    cy.wait('@getCryptos').then((interception) => {
      //Verifica que interception.response no sea null ni undefined.
      expect(interception.response).to.exist;
      const listaCriptos = interception.response!.body;

      // 3. Recorremos el JSON (usamos un for normal para comparar i con i+1)
      for (let i = 0; i < listaCriptos.length - 1; i++) {
        const actual = listaCriptos[i];
        const siguiente = listaCriptos[i + 1];
        // Aserción lógica: El precio o market_cap actual debe ser >= al siguiente
        expect(actual.market_cap).to.be.at.least(siguiente.market_cap);
      }
    });
  });

  it('Comprobamos que el cambio de precio durante las 24 últimas horas aparezca verde si es positivo o rojo si es negativo (columna 24H %)', () => {
    cy.visit('http://localhost:4200');

    // 1. Esperamos a que las filas existan
    cy.get('table tbody tr').should('have.length.at.least', 1);

    // 2. Iteramos por cada fila
    cy.get('table tbody tr').each(($fila) => {
      // Ajusta el eq(4) si en tu tabla es otra columna
      cy.wrap($fila)
        .find('td')
        .eq(4) //Columna 4
        .then(($celda) => {
          // Limpiamos el texto (quitamos el % y espacios) y lo pasamos a número
          const valor = parseFloat($celda.text().replace('%', '').trim());

          // 3. Aplicamos la lógica de aserción
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
    cy.visit('http://localhost:4200');

    // 1. Esperamos a que la tabla cargue filas
    cy.get('table tbody tr').should('have.length.at.least', 1);

    // 2. Iteramos por cada fila para revisar el precio
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

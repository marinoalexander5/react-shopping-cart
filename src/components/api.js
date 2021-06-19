export function counters(fail) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fail) {
          reject("404 not found");
        } else {
          resolve({
            counters: [
              { id: 1, value: 0, producto: "Tomates", precio: 120, subTotal: 0 },
              { id: 2, value: 0, producto: "Galletitas", precio: 250, subTotal: 0 },
              { id: 3, value: 0, producto: "Lata de Atun", precio: 380, subTotal: 0 },
              { id: 4, value: 0, producto: "Aquarius", precio: 270, subTotal: 0 },
            ]
          });
        }
      }, 2000);
    });
  }
  
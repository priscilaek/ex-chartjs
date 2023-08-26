import Chart from 'chart.js/auto';

export const generateExAPIChart = async () => {
  // 1. GENERACIÓN DE DATOS
  const response = await fetch('https://api.coincap.io/v2/assets');
  const dataResponse = await response.json();
  console.log('data coincap', dataResponse);

  // ORDENAMOS LAS MONEDAS CON MAYOR VALOR Y LUEGO NOS QUEDAMOS CON LAS 5 PRINCIPALES
  const filteredData = dataResponse.data
    .sort(function (a, b) {
      return b.priceUsd - a.priceUsd;
    })
    .slice(0, 7);

  // 2. VISTA INICIAL
  document.querySelector('#app-api').innerHTML = /* HTML */ `
    <div>
      <canvas id="chart-api"></canvas>
    </div>
  `;

  // 3. GENERACIÓN DE GRÁFICA

  const myChartAPIArea = document.querySelector('#chart-api');
  console.log('myChartAPIArea', myChartAPIArea);

  new Chart(myChartAPIArea, {
    type: 'line',
    data: {
      labels: filteredData.map((row) => row.symbol),
      datasets: [
        {
          label: 'Valor en dólares',
          data: filteredData.map((row) => row.priceUsd),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        },
        {
          label: 'Valor en supply',
          data: filteredData.map((row) => row.supply),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }
      ]
    }
  });
};

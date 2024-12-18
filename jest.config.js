export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Transforma los archivos JS usando Babel
  },
  collectCoverage: true, // Habilita la cobertura
  coverageDirectory: 'coverage', // Carpeta donde se guardarán los reportes de cobertura
  coverageReporters: ['html', 'text', 'lcov'], // Genera reporte HTML y muestra texto en la terminal
  clearMocks: true, // Limpia los mocks automáticamente después de cada test
  maxWorkers: 2, // Limita el uso de procesos concurrentes
  forceExit: true, // Fuerza la salida al finalizar los tests
  detectOpenHandles: true, // Detecta promesas no resueltas o handles abiertos
};

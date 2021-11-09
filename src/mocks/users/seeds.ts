export const userSeeds = (server) => {
  server.create('user', {
    cpf: '111.111.111-11',
    role: 'DOCTOR',
  });
  server.create('user', { cpf: '222.222.222-22', role: 'PATIENT' });
  server.createList('user', 40);
};
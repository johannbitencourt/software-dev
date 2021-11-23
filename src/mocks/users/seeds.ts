export const userSeeds = (server) => {
  server.create('user', { login: '111.111.111-11', authorities: ['DOCTOR'] });
  server.create('user', { login: '222.222.222-22', authorities: ['PATIENT'] });
  server.createList('user', 80);
};
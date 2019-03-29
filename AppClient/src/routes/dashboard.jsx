import Institutions from 'views/Institutions/Institutions';

const dashboardRoutes = [
  {
    path: '/instituicoes',
    name: 'Instituições',
    icon: 'pe-7s-study',
    component: Institutions
  },
  { redirect: true, path: '/', to: '/instituicoes', name: 'Instituições' }
];

export default dashboardRoutes;

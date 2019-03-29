import Institutions from 'views/Institutions/Institutions';
import Coursers from 'views/Coursers/Coursers';

const dashboardRoutes = [
  {
    path: '/instituicoes',
    name: 'Instituições',
    icon: 'pe-7s-study',
    component: Institutions
  },
  {
    path: '/coursers',
    name: 'Cursos',
    icon: 'pe-7s-notebook',
    component: Coursers
  },
  { redirect: true, path: '/', to: '/instituicoes', name: 'Instituições' }
];

export default dashboardRoutes;

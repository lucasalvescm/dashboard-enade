import Institutions from 'views/Institutions/Institutions';
import Coursers from 'views/Coursers/Coursers';
import Dashboard from 'views/Dashboard/Dashboard';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'pe-7s-graph',
    component: Dashboard
  },
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

import Institutions from 'views/Institutions/Institutions';
import UserProfile from 'views/UserProfile/UserProfile';
import Notifications from 'views/Notifications/Notifications';

const dashboardRoutes = [
  {
    path: '/instituicoes',
    name: 'Instituições',
    icon: 'pe-7s-study',
    component: Institutions
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'pe-7s-user',
    component: UserProfile
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'pe-7s-bell',
    component: Notifications
  },
  { redirect: true, path: '/', to: '/instituicoes', name: 'Instituições' }
];

export default dashboardRoutes;

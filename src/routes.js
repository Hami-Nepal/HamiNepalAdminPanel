import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LocationOn from '@material-ui/icons/LocationOn';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';
import EventIcon from '@material-ui/icons/Event';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import NewsIcon from '@material-ui/icons/RssFeed';
import KindnessIcon from '@material-ui/icons/Accessibility';

import AddNews from './views/AddNews/AddNews';

// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import DonationsPage from 'views/Donations/Donations.js';
import MessagesPage from 'views/Messages/Messages.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import Transparency from 'views/Transparency/Transparency.js';

import Maps from 'views/Maps/Maps.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js';
// core components/views for RTL layout
import RTLPage from 'views/RTLPage/RTLPage.js';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventList from './views/EventList/EventList';
import CauseList from './views/CauseList/CauseList';
import EventEditPage from './views/CauseEditPage/CauseEditPage';
import AddNewEventPage from './views/AddNewEventPage/index';
import AddNewCausePage from './views/AddNewCausePage/index';
import VolunteersIndexPage from './views/Volunteers';
import VolunteersCreatePage from './views/Volunteers/create';
import AddVideo from './views/AddHomeVideo/addVideo';
import ActOfKindness from './views/ActOfKindness/act-of-kindness';

export const demoRoutes = [
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    rtlName: 'خرائط',
    icon: LocationOn,
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    rtlName: 'إخطارات',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin',
  },
  {
    path: '/rtl-page',
    name: 'RTL Support',
    rtlName: 'پشتیبانی از راست به چپ',
    icon: Language,
    component: RTLPage,
    layout: '/rtl',
  },
  {
    path: '/upgrade-to-pro',
    name: 'Upgrade To PRO',
    rtlName: 'التطور للاحترافية',
    icon: Unarchive,
    component: UpgradeToPro,
    layout: '/admin',
  },
  {
    path: '/events/edit/:id',
    name: 'Edit an event',
    icon: Unarchive,
    component: EventEditPage,
    layout: '/admin',
  },
  {
    path: '/events/addNewEvent',
    name: 'Add a new event',
    icon: Unarchive,
    component: AddNewEventPage,
    layout: '/admin',
  },

  {
    path: '/volunteers/create',
    name: 'Create a Volunteer',
    icon: DirectionsBikeIcon,
    component: VolunteersCreatePage,
    layout: '/admin',
  },
  {
    path: '/causes/edit/:id',
    name: 'Edit an event',
    icon: Unarchive,
    component: EventEditPage,
    layout: '/admin',
  },
  {
    path: '/causes/addNewCause',
    name: 'Add a new cause',
    icon: Unarchive,
    component: AddNewCausePage,
    layout: '/admin',
  },
];

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/donations',
    name: 'Donations',
    rtlName: 'لوحة القيادة',
    icon: MonetizationOnIcon,
    component: DonationsPage,
    layout: '/admin',
  },
  // {
  //   path: '/messages',
  //   name: 'Messages',
  //   rtlName: 'لوحة القيادة',
  //   icon: Person,
  //   component: MessagesPage,
  //   layout: '/admin',
  // },
  {
    path: '/transparency',
    name: 'Transparency',
    rtlName: 'لوحة القيادة',
    icon: CompareArrowsIcon,
    component: Transparency,
    layout: '/admin',
  },

  {
    path: '/events',
    name: 'Events',
    rtlName: 'لوحة القيادة',
    icon: EventIcon,
    component: EventList,
    layout: '/admin',
  },

  {
    path: '/volunteers',
    name: 'Volunteers',
    icon: DirectionsBikeIcon,
    component: VolunteersIndexPage,
    layout: '/admin',
  },
  {
    path: '/causes',
    name: 'Causes',
    rtlName: 'لوحة القيادة',
    icon: CompareArrowsIcon,
    component: CauseList,
    layout: '/admin',
  },
  {
    path: '/news',
    name: 'News',
    icon: NewsIcon,
    component: AddNews,
    layout: '/admin',
  },
  {
    path: '/act-of-kindness',
    name: 'Act of kindness',
    icon: KindnessIcon,
    component: ActOfKindness,
    layout: '/admin',
  },
  {
    path: '/homevideo',
    name: 'Upload Home Video',
    rtlName: '',
    icon: CompareArrowsIcon,
    component: AddVideo,
    layout: '/admin',
  },
];

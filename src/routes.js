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

// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import DonationsPage from 'views/Donations/Donations.js';
import MessagesPage from 'views/Messages/Messages.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import AddTransparency from 'views/Transparency/AddTransparency.js';
import ListTransparency from 'views/Transparency/ListTransparency';
import EditTransparency from 'views/Transparency/EditTransparency.js';

import Maps from 'views/Maps/Maps.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js';
// core components/views for RTL layout
import RTLPage from 'views/RTLPage/RTLPage.js';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventList from './views/EventList/EventList';
import CauseList from './views/CauseList/CauseList';
import CauseEditPage from './views/CauseEditPage/CauseEditPage';
import CasueEventType from './views/Cause_Event_Type/CauseEventType';
import EventEditPage from './views/AddNewEventPage/editEventPage';
import AddNewEventPage from './views/AddNewEventPage/index';
import AddNewCausePage from './views/AddNewCausePage/index';
import VolunteersIndexPage from './views/Volunteers';
import VolunteersCreatePage from './views/Volunteers/create';
import NewsCreatePage from './views/News/AddNews';
import NewsEditPage from './views/News/NewsEditPage';
import AddVideo from './views/AddHomeVideo/addVideo';
import ActOfKindness from './views/ActOfKindness/act-of-kindness';
import CreateActOfKindness from './views/CreateActOfKindness/CreateActOfKindness';
import EditActOfKindness from './views/EditActOfKindness/EditActOfKindness';
import ListNews from './views/News/ListNews';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListMembers from './views/BoardMembers/List_Members';
import AddBoardMembers from './views/BoardMembers/addMembers';
import EditBoardMembers from './views/BoardMembers/UpdateMembers';
import KindDonationsPage from './views/Kind Donation/ListKindDonation';
import AddKindDonation from 'views/Kind Donation/AddKindDonation';
import UpdateKindDonation from 'views/Kind Donation/UpdateKindDonation';
import KindTransparency from 'views/KindTransparency/ListKindTransparency';
import AddKindTransparency from 'views/KindTransparency/AddKindTransparency';
import EditKindTransparency from 'views/KindTransparency/EditKindTransparency';
import EventVolunteer from 'views/EventVolunteer/volunteerList';
import CauseVolunteer from 'views/CauseVolunteer/volunteerList';
import KindnessVolunteer from './views/KindnessVolunteers/KindnessVolunteers';

import UserPage from './views/Users/user';
import CivilMoment from './views/civilrightMoment/ListCivilRights';
import AddCivilRights from './views/civilrightMoment/AddCivilRIghts';
import EditCivilRights from './views/civilrightMoment/EditCivilRights';

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
    path: '/news/create',
    name: 'Create News',
    icon: DirectionsBikeIcon,
    component: NewsCreatePage,
    layout: '/admin',
  },
  {
    path: '/kinddonation/create',
    name: 'Add Kind Donation',
    icon: DirectionsBikeIcon,
    component: AddKindDonation,
    layout: '/admin',
  },
  {
    path: '/kinddonation/edit/:id',
    name: 'Edit a Donation',
    icon: Unarchive,
    component: UpdateKindDonation,
    layout: '/admin',
  },
  {
    path: '/causes/edit/:id',
    name: 'Edit an event',
    icon: Unarchive,
    component: CauseEditPage,
    layout: '/admin',
  },
  {
    path: '/news/edit/:id',
    name: 'Edit a news',
    icon: Unarchive,
    component: NewsEditPage,
    layout: '/admin',
  },
  {
    path: '/events/:eventId/volunteers',
    name: 'Verify Volunteers',
    icon: Unarchive,
    component: EventVolunteer,
    layout: '/admin',
  },
  {
    path: '/causes/:causeId/volunteers',
    name: 'Verify Volunteers',
    icon: Unarchive,
    component: CauseVolunteer,
    layout: '/admin',
  },
  {
    path: '/causes/addNewCause',
    name: 'Add a new cause',
    icon: Unarchive,
    component: AddNewCausePage,
    layout: '/admin',
  },
  {
    path: '/act-of-kindness/create',
    name: 'Add a Act of kindness',
    icon: Unarchive,
    component: CreateActOfKindness,
    layout: '/admin',
  },
  {
    path: '/act-of-kindness/edit/:id',
    name: 'Edit a Act of kindness',
    icon: Unarchive,
    component: EditActOfKindness,
    layout: '/admin',
  },
  {
    path: '/act-of-kindness/:kindnessId/volunteers',
    name: 'Act of kindness list volunteers',
    icon: KindnessIcon,
    component: KindnessVolunteer,
    layout: '/admin',
  },
  {
    path: '/transparency/create',
    name: 'Create Transparency',
    icon: CompareArrowsIcon,
    component: AddTransparency,
    layout: '/admin',
  },
  {
    path: '/board/create',
    name: 'Create Board Member',
    icon: CompareArrowsIcon,
    component: AddBoardMembers,
    layout: '/admin',
  },
  {
    path: '/civilrights/create',
    name: 'Create Civil Blogs',
    component: AddCivilRights,
    layout: '/admin',
  },
  {
    path: '/kindtransparency/create',
    name: 'Create Kind Transparency',
    component: AddKindTransparency,
    layout: '/admin',
  },
  {
    path: '/kindtransparency/edit/:id',
    name: 'Edit Kind Transparency',
    component: EditKindTransparency,
    layout: '/admin',
  },
  {
    path: '/civilrights/edit/:id',
    name: 'Edit Civil Rights Content',
    component: EditCivilRights,
    layout: '/admin',
  },
  {
    path: '/board/edit/:id',
    name: 'Edit Board Member Detail',
    icon: CompareArrowsIcon,
    component: EditBoardMembers,
    layout: '/admin',
  },

  {
    path: '/transparency/edit/:id',
    name: 'Edit Transparency',
    icon: CompareArrowsIcon,
    component: EditTransparency,
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
  {
    path: '/Kinddonations',
    name: 'Kind Donations',
    icon: MonetizationOnIcon,
    component: KindDonationsPage,
    layout: '/admin',
  },
  {
    path: '/Kindtransparency',
    name: 'Kind Transparency',
    icon: CompareArrowsIcon,
    component: KindTransparency,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'User List',
    icon: PeopleAltIcon,
    component: UserPage,
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
    component: ListTransparency,
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
    path: '/causes',
    name: 'Causes',
    rtlName: 'لوحة القيادة',
    icon: CompareArrowsIcon,
    component: CauseList,
    layout: '/admin',
  },
  {
    path: '/CauseEventType',
    name: 'Cause/Event Type',
    icon: CompareArrowsIcon,
    component: CasueEventType,
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
    path: '/news',
    name: 'News',
    icon: NewsIcon,
    component: ListNews,
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
    path: '/board',
    name: 'Board Members',
    icon: PeopleAltIcon,
    component: ListMembers,
    layout: '/admin',
  },
  {
    path: '/civilrights',
    name: 'Civil Right Moment',
    icon: PeopleAltIcon,
    component: CivilMoment,
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

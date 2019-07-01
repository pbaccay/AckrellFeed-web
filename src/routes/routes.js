import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Maps from '@/pages/Maps.vue'
import Channel from '@/pages/Channel'
import Pending from '@/pages/Pending'
import Approved from '@/pages/Approved'
import Ackrellpreview from '@/pages/AckrellPreview'
import Ackrellfeed from '@/pages/AckrellFeed'
import Newsletter from '@/pages/Newsletter'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile
      },
      {
        path: 'table',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: Maps

      },
    {
      path: '/channel/:index/:title',
      name: 'Channel',
      component: Channel,
      props: true
    },
    {
      path: '/pending',
      name: 'Pending',
      component: Pending
    }
,
    {
      path: '/approved',
      name: 'Approved',
      component: Approved
    }
,
    {
      path: '/newsletter',
      name: 'Preview Newsletter',
      component: Newsletter
    }
,
    {
      path: '/ackrellfeedpreview',
      name: 'Preview Pending Ackrell Newsfeed',
      component: Ackrellpreview
    }
,
	{
      path: '/ackrellfeedlive',
      name: 'Live Ackrell Newsfeed',
      component: Ackrellfeed
    }
    ]
  }
]

export default routes

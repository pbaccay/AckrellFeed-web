# Ackrell Feed Admin Website
Webpage for Ackrell Feed Admin

## Setup
Ensure at least 512gb memory ("free -m") free for npm run build

Copy source directory to /opt/<directory>

Run:
1. Npm init -y
2. Npm install	
3. Npm update	
(fix sass library not downloading all components)	
4. node node_modules/node-sass/scripts/install.js
5. npm rebuild node-sass
	
	
   

## Run and build
Run server (or build production):
npm run dev (Test server points to local node server running on port 3000)
(production) npm run build (copy contents of /dist to public folder of webserver)

## File Structure

```


├── README.md
├── babel.config.js
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── img
│   │   └── scss
│   │       ├── material-dashboard
│   │       └── material-dashboard.scss
│   ├── components
│   │   ├── Dropdown.vue
│   │   ├── Feed.vue
│   │   ├── Modal.vue
│   │   ├── Pagination.vue
│   │   ├── PreviewFeed.vue
│   │   ├── Sidebar.vue
│   │   ├── Cards
│   │   │   ├── ChartCard.vue
│   │   │   ├── NavTabsCard.vue
│   │   │   └── StatsCard.vue
│   │   ├── NotificationPlugin
│   │   │   ├── Notification.vue
│   │   │   ├── Notifications.vue
│   │   │   └── index.js
│   │   ├── SidebarPlugin
│   │   │   ├── Sidebar.vue
│   │   │   ├── SidebarLink.vue
│   │   │   └── index.js
│   │   ├── Tables
│   │   │   ├── NavTabsTable.vue
│   │   │   ├── OrderedTable.vue
│   │   │   └── SimpleTable.js
│   │   └── index.js
│   ├── globalComponents.js
│   ├── globalDirectives.js
│   ├── main.js
│   ├── pages
│   │   ├── AckrellFeed.vue
│   │   ├── AckrellPreview.vue
│   │   ├── Approved.vue
│   │   ├── Channel.vue
│   │   ├── Dashboard.vue
│   │   ├── Maps.vue
│   │   ├── Newsletter.vue
│   │   ├── Pending.vue
│   │   ├── Tablelist.vue
│   │   ├── UserProfile.vue
│   │   ├── Cards
│   │   │   ├── ChartCard.vue
│   │   │   ├── NavTabsCard.vue
│   │   │   └── StatsCard.vue
│   │   ├── NotificationPlugin
│   │   │   ├── Notification.vue
│   │   │   ├── Notifications.vue
│   │   │   └── index.js
│   │   ├── SidebarPlugin
│   │   │   ├── Sidebar.vue
│   │   │   ├── SidebarLink.vue
│   │   │   └── index.js
│   │   ├── Tables
│   │   │   ├── NavTabsTable.vue
│   │   │   ├── OrderedTable.vue
│   │   │   └── SimpleTable.js
│   │   └── index.js
│   ├── routes
│   │   └── routes.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── mutations.js
│   │   ├── state.js
│   │   └── index.js
│   └── utils
│       ├── axios.js
│       ├── common.js
│       ├── storage.js
│       └── index.js
└── material-dashboard.js

```


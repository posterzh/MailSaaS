// /*!

// =========================================================
// * Argon Dashboard PRO React - v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
import Alternative from "./views/pages/dashboards/Alternative.js";
import Api from "./views/pages/Extension/Api";
import AppsandCrm from "./views/pages/Extension/Apps&Crm";
// import Buttons from "views/pages/components/Buttons.js";
import Billing from "./views/pages/TeamSettings/Billing";
import Buttons from "./views/pages/components/Buttons";
import Calendar from "./views/pages/Calendar.js";
import Campaign from "./views/pages/Campaing/Campaign";
import Cards from "./views/pages/components/Cards.js";
import Charts from "./views/pages/Charts.js";
import Components from "./views/pages/forms/Components.js";
// import ConversionTracking from "./views/pages/Extension/ConversionTracking";
import Dashboard from "./views/pages/dashboards/Dashboard.js";
import Elements from "./views/pages/forms/Elements.js";
import Google from "./views/pages/maps/Google.js";
import Grid from "./views/pages/components/Grid.js";
import Icons from "./views/pages/components/Icons.js";
import LeadCatcher from "./views/pages/Campaing/LeadCatcher";
import Lock from "./views/pages/examples/Lock.js";
import Login from "./views/pages/examples/Login.js";
import MailAccount from "./views/pages/MailAccount/MailAccount";
import Notifications from "./views/pages/components/Notifications.js";
import Pricing from "./views/pages/examples/Pricing.js";
import Prospects from "./views/pages/Prospects/Prospects"
import Profile from "./views/pages/examples/Profile.js";
import ReactBSTables from "./views/pages/tables/ReactBSTables.js";
import Redeem from "./views/pages/TeamSettings/Redeem";
import Register from "./views/pages/examples/Register.js";
// import RTLSupport from "./views/pages/examples/RTLSupport.js";
// import SendingCalender from "./views/pages/Campaing/SedingCalender";
import Setting from "./views/pages/TeamSettings/Setting"
import Sortable from "./views/pages/tables/Sortable.js";
import Tables from "./views/pages/tables/Tables.js";
import Teammates from "./views/pages/TeamSettings/Teammates";
import Timeline from "./views/pages/examples/Timeline.js";
import Typography from "./views/pages/components/Typography.js";
import Unsubscribes from "./views/pages/Unsubscribes/Unsubscribes";
import Validation from "./views/pages/forms/Validation.js";
import Vector from "./views/pages/maps/Vector.js";
import Widgets from "./views/pages/Widgets.js";
import ConversionTracking from "./views/pages/Extension/ConversionTracking";
import SendingCalender from "./views/pages/Campaing/SedingCalender";

const routes = [
  {
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: Dashboard,
        layout: "/app/admin"
      },
      // {
      //   path: "/alternative-dashboard",
      //   name: "Alternative",
      //   miniName: "A",
      //   component: Alternative,
      //   layout: "/app/admin"
      // }
    ]
    
  },
// for campaign
  {
    collapse:true,
    name:"Campaign",
    icon: "ni ni-shop text-primary",
    views:[
      {
        path: "/Campaign",
        name: "Campaign",
        miniName: "Ca",
        component: Campaign,
        layout: "/app/admin"
      },
      {
        path: "/LeadCatcher",
        name: "Lead Catcher",
        miniName: "Lc",
        component: LeadCatcher,
        layout: "/app/admin"
      },
      {
        path: "/SendingCalender",
        name: "Sending Calender",
        miniName: "Sc",
        component: SendingCalender,
        layout: "/app/admin"
      },
     
    ]

  },

  // for Prospects
  {
    collapse:true,
    name:"Prospects",
    icon: "ni ni-ungroup text-orange",
    views:[
      {
        path: "/Prospects",
        name: "Prospects",
        miniName: "pro",
        component: Prospects,
         layout: "/app/admin"
      },
    ]
  },

  // for MailAccount
  {
    collapse:true,
    name:"Mail Accounts",
    icon: "ni ni-shop text-primary",
    views:[
      {
        path: "/MailAccount",
        name: "MailAccount",
        miniName: "Ma",
        component: MailAccount,
        layout: "/app/admin"
      },
    ]
  },
  // for TeamSetting
  {
    collapse:true,
    name:"Team Settings",
    icon: "ni ni-shop text-primary",
    views:[
      {
        path: "/Setting",
        name: "Setting",
        miniName: "S",
        component: Setting,
        layout: "/app/admin"
      },
      {
      path: "/Teammates",
      name: "Teammates",
      miniName: "Tm",
      component: Teammates,
      layout: "/app/admin "},
    {
      path: "/Billing",
      name: "Billing",
      miniName: "B",
      component: Billing,
      layout: "/app/admin "},
    {
      path: "/Redeem",
      name: "Redeem",
      miniName: "R",
      component: Redeem,
      layout: "/app/admin"},
    ]
  },

  // for Extension
  {
      collapse:true,
      name:"Extension",
      icon: "ni ni-shop text-primary",
      views:[
        {
          path: "/Apps&Crm",
          name: "Apps&CRMs",
          miniName: "A&C",
          component: AppsandCrm,
          layout: "/app/admin"
         },
        {
          path: "/Api",
          name: "API",
          miniName: "API",
          component: Api,
          layout: "/app/admin"
        },
        {
          path: "/ConversionTracking",
          name: "ConversionTracking",
          miniName: "CT",
          component: ConversionTracking,
          layout: "/app/admin"
        }
      ]
  },

  // for Unsubscribes
  {
    collapse:true,
    name:" Unsubscribes",
    icon: "ni ni-ungroup text-orange",
    views:[
      {
        path: "/Unsubscribes",
        name: "Unsubscribes",
        miniName: "Us",
        component:Unsubscribes,
        layout: "/app/admin"
      },
    ]
  },

  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        miniName: "P",
        component: Pricing,
        layout: "/app/auth"
      },
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: Login,
        layout: "/app/auth"
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: Register,
        layout: "/app/auth"
      },
      {
        path: "/lock",
        name: "Lock",
        miniName: "L",
        component: Lock,
        layout: "/app/auth"
      },
      {
        path: "/timeline",
        name: "Timeline",
        miniName: "T",
        component: Timeline,
        layout: "/app/admin"
      },
      {
        path: "/profile",
        name: "Profile",
        miniName: "P",
        component: Profile,
        layout: "/app/admin"
      },
      {
        // path: "/rtl-support",
        // name: "RTL Support",
        // miniName: "RS",
        // component: RTLSupport,
        // layout: "/rtl"
      }
    ]
  },
  // `{
  //   collapse: true,
  //   name: "Components",
  //   icon: "ni ni-ui-04 text-info",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       miniName: "B",
  //       component: Buttons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/cards",
  //       name: "Cards",
  //       miniName: "C",
  //       component: Cards,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/grid",
  //       name: "Grid",
  //       miniName: "G",
  //       component: Grid,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       miniName: "N",
  //       component: Notifications,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       miniName: "I",
  //       component: Icons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       miniName: "T",
  //       component: Typography,
  //       layout: "/admin"
  //     },
  //     {
  //       collapse: true,
  //       name: "Multi Level",
  //       miniName: "M",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "#pablo",
  //           name: "Third level menu",
  //           component: () => {},
  //           layout: "/"
  //         },
  //         {
  //           path: "#pablo",
  //           name: "Just another link",
  //           component: () => {},
  //           layout: "/"
  //         },
  //         {
  //           path: "#pablo",
  //           name: "One last link",
  //           component: () => {},
  //           layout: "/"
  //         }
  //       ]
  //     }
  //   ]
  // },`
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "ni ni-single-copy-04 text-pink",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/elements",
  //       name: "Elements",
  //       miniName: "E",
  //       component: Elements,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/components",
  //       name: "Components",
  //       miniName: "C",
  //       component: Components,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/validation",
  //       name: "Validation",
  //       miniName: "V",
  //       component: Validation,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: "ni ni-align-left-2 text-default",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/tables",
  //       name: "Tables",
  //       miniName: "T",
  //       component: Tables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/sortable",
  //       name: "Sortable",
  //       miniName: "S",
  //       component: Sortable,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/react-bs-table",
  //       name: "React BS Tables",
  //       miniName: "RBT",
  //       component: ReactBSTables,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: "ni ni-map-big text-primary",
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google",
  //       name: "Google",
  //       miniName: "G",
  //       component: Google,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/vector",
  //       name: "Vector",
  //       miniName: "V",
  //       component: Vector,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "ni ni-archive-2 text-green",
  //   component: Widgets,
  //   layout: "/admin"
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "ni ni-chart-pie-35 text-info",
  //   component: Charts,
  //   layout: "/admin"
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "ni ni-calendar-grid-58 text-red",
  //   component: Calendar,
  //   layout: "/admin"
  // }
];

export default routes;
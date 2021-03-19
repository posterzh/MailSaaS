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
import Api from "./views/pages/Extension/Api";
import AppsandCrm from "./views/pages/Extension/Apps&Crm";
import Billing from "./views/pages/TeamSettings/Billing";
import Dashboard from "./views/pages/dashboards/Dashboard.js";
import Login from "./views/pages/examples/Login.js";
import Prospects from "./views/pages/Prospects/Prospects.js";
import Redeem from "./views/pages/TeamSettings/Redeem";
import Register from "./views/pages/examples/Register.js";
import Setting from "./views/pages/TeamSettings/Setting";
import Teammates from "./views/pages/TeamSettings/Teammates";
import Unsubscribes from "./views/pages/Unsubscribes/Unsubscribes";
import ConversionTracking from "./views/pages/Extension/ConversionTracking";
import ProspectOnclick from "./views/pages/Prospects/ProspectOnclick";
import ForgetPassword from "./views/pages/examples/ForgetPassword";
import Profile from "./views/pages/User/Profile";

// Mail Account
import MailAccounts from "./views/pages/mailaccounts/MailAccounts";
import SendingCalendar from "./views/pages/mailaccounts/SendingCalendar";

// New Campaign pages
import NewCampaign from "./views/pages/campaign/NewCampaign";

// Campaign List page
import CampaignList from "./views/pages/campaign/CampaignList";

// Campaign Detail pages
import CampaignDetailOverview from "./views/pages/campaign/CampaignDetail/CampaignDetailOverview";
import CampaignDetailSequence from "./views/pages/campaign/CampaignDetail/CampaignDetailSequence";
import CampaignDetailRecipients from "./views/pages/campaign/CampaignDetail/CampaignDetailRecipients";
import CampaignDetailSettings from "./views/pages/campaign/CampaignDetail/CampaignDetailSettings";

// Campaign > LeadCatcher page
import LeadCatcher from "./views/pages/campaign/LeadCatcher";

const routes = [
  {
    collapse: false,
    name: "Dashboards",
    icon: "fa fa-home text-dark",
    state: "dashboardsCollapse",
    path: "/dashboard",
    layout: "/app/admin",
    component: Dashboard,
  },

  // for campaign
  {
    collapse: true,
    name: "Campaign",
    icon: "fa fa-paper-plane text-dark",
    state: "campaign",
    views: [
      {
        path: "/campaign/create",
        name: "New Campaign",
        miniName: " ",
        component: NewCampaign,
        layout: "/app/admin",
      },
      {
        path: "/campaign/list",
        name: "Campaign List",
        miniName: " ",
        component: CampaignList,
        layout: "/app/admin",
      },
      {
        path: "/campaign/details-overview/:id",
        name: "Campaign Detail",
        miniName: " ",
        component: CampaignDetailOverview,
        layout: "/app/admin",
      },
      {
        path: "/lead-catcher",
        name: "Lead Catcher",
        miniName: " ",
        component: LeadCatcher,
        layout: "/app/admin",
      },

      // Campaign Detail Redirects
      {
        path: "/campaign/details-sequence/:id",
        component: CampaignDetailSequence,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/details-recipients/:id",
        component: CampaignDetailRecipients,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/details-settings/:id",
        component: CampaignDetailSettings,
        layout: "/app/admin",
        redirect: true,
      },
    ],
  },

  // Prospects
  {
    collapse: true,
    name: "Prospects",
    icon: "fa fa-users text-dark",
    state: "prospects",
    views: [
      {
        path: "/prospects",
        name: "Prospects",
        miniName: " ",
        component: Prospects,
        layout: "/app/admin",
      },
      {
        path: "/unsubscribes",
        name: "Unsubscribes",
        miniName: " ",
        component: Unsubscribes,
        layout: "/app/admin",
      },
    ],
  },

  // MailAccount
  {
    collapse: true,
    name: "Mail Accounts",
    icon: "fa fa-envelope text-dark",
    state: "mailAccount",
    views: [
      {
        path: "/mail-account",
        name: "Mail Accounts",
        miniName: " ",
        component: MailAccounts,
        layout: "/app/admin",
      },
      {
        path: "/sending-calendar",
        name: "Sending Calendar",
        miniName: " ",
        component: SendingCalendar,
        layout: "/app/admin",
      },
    ],
  },
  // for TeamSetting
  {
    collapse: true,
    name: "Team Settings",
    icon: "fa fa-cogs text-dark",
    state: "teamSetting",
    views: [
      {
        path: "/setting",
        name: "Setting",
        miniName: " ",
        component: Setting,
        layout: "/app/admin",
      },
      {
        path: "/teammates",
        name: "Teammates",
        miniName: " ",
        component: Teammates,
        layout: "/app/admin",
      },
      {
        path: "/billing",
        name: "Billing",
        miniName: " ",
        component: Billing,
        layout: "/app/admin",
      },
      {
        path: "/redeem",
        name: "Redeem",
        miniName: " ",
        component: Redeem,
        layout: "/app/admin",
        redirect: true,
      },
    ],
  },

  // for Extension
  {
    collapse: true,
    name: "Extension",
    icon: "fa fa-puzzle-piece text-dark",
    state: "extensions",
    views: [
      {
        path: "/integrations",
        name: "Apps & CRMs",
        miniName: "  ",
        component: AppsandCrm,
        layout: "/app/admin",
      },
      {
        path: "/api",
        name: "API",
        miniName: "  ",
        component: Api,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/conversionTracking",
        name: "ConversionTracking",
        miniName: " ",
        component: ConversionTracking,
        layout: "/app/admin",
        redirect: true,
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "fas fa-user-slash text-dark",
    component: Profile,
    layout: "/app/admin",
    redirect: true,
  },
  {
    name: "ForgetPassword",
    // icon: "fa fa-home text-dark",
    // state: "dashboardsCollapse",
    path: "/forgetPassword",
    layout: "/app/auth",
    component: ForgetPassword,
    redirect: true,
  },

  // User management redirects
  {
    path: "/login",
    component: Login,
    layout: "/app/auth",
    redirect: true,
  },
  {
    path: "/register",
    component: Register,
    layout: "/app/auth",
    redirect: true,
  },
];

export default routes;

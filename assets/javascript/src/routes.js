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
import Redeem from "./views/pages/TeamSettings/Redeem";
import Setting from "./views/pages/TeamSettings/Setting";
import Teammates from "./views/pages/TeamSettings/Teammates";
import Unsubscribes from "./views/pages/audiences/Unsubscribes/Unsubscribes";
import ConversionTracking from "./views/pages/Extension/ConversionTracking";
import Profile from "./views/pages/User/Profile";

// Auth pages
import Login from "./views/pages/examples/Login.js";
import Register from "./views/pages/examples/Register.js";
import ForgetPassword from "./views/pages/examples/ForgetPassword";
import ResetPassword  from "./views/pages/examples/ResetPassword";

// Mail Account
import MailAccounts from "./views/pages/mailaccounts/MailAccounts";
import SendingCalendar from "./views/pages/mailaccounts/SendingCalendar";
import MailWarming from "./views/pages/mailaccounts/MailWarming";

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

// Audience page
import Prospects from "./views/pages/audiences/Audiences";

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
        component: NewCampaign,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/list",
        name: "Campaigns",
        miniName: " ",
        component: CampaignList,
        layout: "/app/admin",
      },
      {
        path: "/lead-catcher",
        name: "Leads",
        miniName: " ",
        component: LeadCatcher,
        layout: "/app/admin",
      },

      // Campaign Detail Redirects
      {
        path: "/campaign/:id/details-overview",
        component: CampaignDetailOverview,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/:id/details-sequence",
        component: CampaignDetailSequence,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/:id/details-recipients",
        component: CampaignDetailRecipients,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/campaign/:id/details-settings",
        component: CampaignDetailSettings,
        layout: "/app/admin",
        redirect: true,
      },
    ],
  },

  // Prospects
  {
    collapse: true,
    name: "Audiences",
    icon: "fa fa-users text-dark",
    state: "prospects",
    views: [
      {
        path: "/prospects",
        name: "Audiences",
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
    name: "Email Accounts",
    icon: "fa fa-envelope text-dark",
    state: "mailAccount",
    views: [
      {
        path: "/mail-account",
        name: "Email Accounts",
        miniName: " ",
        component: MailAccounts,
        layout: "/app/admin",
      },
      {
        path: "/mail-warming",
        name: "Email Warming",
        miniName: " ",
        component: MailWarming,
        layout: "/app/admin",
      },
      {
        path: "/sending-calendar",
        name: "Sending Schedule",
        miniName: " ",
        component: SendingCalendar,
        layout: "/app/admin",
      },
    ],
  },
  // for TeamSetting
  {
    collapse: true,
    name: "Settings",
    icon: "fa fa-cogs text-dark",
    state: "teamSetting",
    views: [
      {
        path: "/setting",
        name: "Setting",
        miniName: " ",
        component: Setting,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/teammates",
        name: "Team Setting",
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
    name: "Integrations",
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
  {
    name: "ResetPassword",
    // icon: "fa fa-home text-dark",
    // state: "dashboardsCollapse",
    path: "/resetPassword/:uid/:token",
    layout: "/app/auth",
    component: ResetPassword,
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

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

// Mail Account
import MailAccount from "./views/pages/MailAccount/MailAccount";
import SendingCalender from "./views/pages/MailAccount/SedingCalender";

// New Campaign pages
import CampaignCompose from "./views/pages/campaign/NewCampaign/CampaignCompose";
import CampaignPreview from "./views/pages/campaign/NewCampaign/CampaignPreview";
import CampaignRecipient from "./views/pages/campaign/NewCampaign/CampaignRecipient";
import CampaignSend from "./views/pages/campaign/NewCampaign/CampaignSend";
import CampaignStart from "./views/pages/campaign/NewCampaign/CampaignStart";
import CampaignOptions from "./views/pages/campaign/NewCampaign/CampaignOptions";

// Campaign List page
import CampaignList from "./views/pages/campaign/CampaignList";

// Campaign Detail pages
import CampaignDetailOverview from "./views/pages/campaign/CampaignDetail/CampaignDetailOverview";
import CampaignDetailSequence from "./views/pages/campaign/CampaignDetail/CampaignDetailSequence";
import CampaignDetailRecipients from "./views/pages/campaign/CampaignDetail/CampaignDetailRecipients";
import CampaignDetailSettings from "./views/pages/campaign/CampaignDetail/CampaignDetailSettings";

// Edit Campaign page
import EditCampaign from "./views/pages/campaign/EditCampaign";

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
        path: "/CampaignStart",
        name: "New Campaign",
        miniName: " ",
        component: CampaignStart,
        layout: "/app/admin",
      },
      {
        path: "/CampaigList",
        name: "Campaign List",
        miniName: " ",
        component: CampaignList,
        layout: "/app/admin",
      },
      {
        path: "/CampaignDetailOverview",
        name: "Campaign Detail",
        miniName: " ",
        component: CampaignDetailOverview,
        layout: "/app/admin",
      },
      {
        path: "/EditCampaign",
        name: "Edit Campaign",
        miniName: " ",
        component: EditCampaign,
        layout: "/app/admin",
      },
      {
        path: "/lead-catcher",
        name: "Lead Catcher",
        miniName: " ",
        component: LeadCatcher,
        layout: "/app/admin",
      },
      // New Campaign Redirects
      {
        path: "/CampaignRecipient",
        component: CampaignRecipient,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignCompose",
        component: CampaignCompose,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignPreview",
        component: CampaignPreview,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignOptions",
        component: CampaignOptions,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignSend",
        component: CampaignSend,
        layout: "/app/admin",
        redirect: true,
      },

      // Campaign Detail Redirects
      {
        path: "/CampaignDetailOverview",
        component: CampaignDetailOverview,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignDetailSequence",
        component: CampaignDetailSequence,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignDetailRecipients",
        component: CampaignDetailRecipients,
        layout: "/app/admin",
        redirect: true,
      },
      {
        path: "/CampaignDetailSettings",
        component: CampaignDetailSettings,
        layout: "/app/admin",
        redirect: true,
      },
    ],
  },

  // Prospects
  {
    path: "/prospects",
    name: "Prospects",
    icon: "fa fa-users text-dark",
    component: Prospects,
    layout: "/app/admin",
  },

  // for MailAccount
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
        component: MailAccount,
        layout: "/app/admin",
      },
      {
        path: "/sending-calender",
        name: "Sending Calender",
        miniName: " ",
        component: SendingCalender,
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
      },
      {
        path: "/conversionTracking",
        name: "ConversionTracking",
        miniName: " ",
        component: ConversionTracking,
        layout: "/app/admin",
      },
    ],
  },
  {
    path: "/unsubscribes",
    name: "Unsubscribes",
    icon: "fas fa-user-slash text-dark",
    component: Unsubscribes,
    layout: "/app/admin",
  },

  {
    open: true,
    collapse: false,
    name: "ForgetPassword",
    // icon: "fa fa-home text-dark",
    // state: "dashboardsCollapse",
    path: "/forgetPassword",
    layout: "/app/auth",
    component: ForgetPassword,
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

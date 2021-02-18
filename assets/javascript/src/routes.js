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
import Campaign from "./views/pages/Campaing/Campaign";
import Dashboard from "./views/pages/dashboards/Dashboard.js";
import LeadCatcher from "./views/pages/Campaing/LeadCatcher";
import Lock from "./views/pages/examples/Lock.js";
import Login from "./views/pages/examples/Login.js";
import MailAccount from "./views/pages/MailAccount/MailAccount";
import Pricing from "./views/pages/examples/Pricing.js";
import Prospects from "./views/pages/Prospects/Prospects.js"
import Profile from "./views/pages/examples/Profile.js";
import Redeem from "./views/pages/TeamSettings/Redeem";
import Register from "./views/pages/examples/Register.js";
import Setting from "./views/pages/TeamSettings/Setting"
import Teammates from "./views/pages/TeamSettings/Teammates";
import Timeline from "./views/pages/examples/Timeline.js";
import Unsubscribes from "./views/pages/Unsubscribes/Unsubscribes";
import ConversionTracking from "./views/pages/Extension/ConversionTracking";
import SendingCalender from "./views/pages/Campaing/SedingCalender";
import NewCampaign from "./views/pages/dashboards/NewCampaign.js";
import NewCampaign_start from "./views/pages/dashboards/NewCampaign_start";
import NewCampaign_recipients from "./views/pages/dashboards/NewCampaign_recipients";
import CampaignCompose from "./views/pages/dashboards/NewCampaign_compose"
import CampaignPreview from "./views/pages/dashboards/NewCampaign_preview"
import NewCampaign_options from "./views/pages/dashboards/NewCampaign_options"
import CampaignSend from "./views/pages/dashboards/NewCampaign_send"
import Campaign_Details from './views/pages/Campaing/Campaign_details.js'
import ProspectOnclick from './views/pages/Prospects/ProspectOnclick'

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
        name: "Create Campaign",
        miniName: "CC",
        component: NewCampaign_start,
        layout: "/app/admin"
      },
      {
        path: "/campaign",
        name: "Campaign",
        miniName: "CO",
        component: Campaign,
        layout: "/app/admin"
      },


      {
        path: "/CampaignStart",
        name: "CampaignStart",
        miniName: "CO",
        component: NewCampaign_start,
        layout: "/app/admin"
      },
      {
        path: "/CampaignRecipient",
        name: "CampaignRecipients",
        miniName: "CO",
        component: NewCampaign_recipients,
        layout: "/app/admin"
      },
      {
        path: "/CampaignCompose",
        name: "CampaignCompose",
        miniName: "CO",
        component: CampaignCompose,
        layout: "/app/admin"
      },
      {
        path: "/CampaignPreview",
        name: "CampaignPreview",
        miniName: "CO",
        component: CampaignPreview,
        layout: "/app/admin"
      },
      {
        path: "/CampaignOptions",
        name: "CampaignOption",
        miniName: "CO",
        component: NewCampaign_options,
        layout: "/app/admin"
      },
      {
        path: "/CampaignSend",
        name: "CampaignSend",
        miniName: "CO",
        component: CampaignSend,
        layout: "/app/admin"
      },





      {
        path: "/campaign-detail",
        name: "Campaign Details",
        miniName: "CD",
        component: Campaign_Details,
        layout: "/app/admin"
      },
      {
        path: "/lead-catcher",
        name: "Lead Catcher",
        miniName: "LC",
        component: LeadCatcher,
        layout: "/app/admin"
      },
      {
        path: "/sending-calender",
        name: "Sending Calender",
        miniName: "SC",
        component: SendingCalender,
        layout: "/app/admin"
      },

    ]
  },

  // for Prospects
  {
    collapse: false,
    name: "Prospects",
    icon: "fa fa-users text-dark",
    state: "prospects",
    path: "/prospects",
    component: Prospects,
    layout: "/app/admin"
  },
  // {
  //   path: "/prospect-detail",
  //   name: "Prospect Onclick",
  //   miniName: "PD",
  //   component: ProspectOnclick,
  //   layout: "/app/admin"
  // },

  // for MailAccount
  {
    collapse: false,
    name: "Mail Accounts",
    icon: "fa fa-envelope text-dark",
    state: "mailAccount",
    path: "/mail-account",
    name: "MailAccount",
    miniName: "Ma",
    component: MailAccount,
    layout: "/app/admin"
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
        miniName: "S",
        component: Setting,
        layout: "/app/admin"
      },
      {
        path: "/teammates",
        name: "Teammates",
        miniName: "Tm",
        component: Teammates,
        layout: "/app/admin"
      },
      {
        path: "/billing",
        name: "Billing",
        miniName: "B",
        component: Billing,
        layout: "/app/admin"
      },
      {
        path: "/redeem",
        name: "Redeem",
        miniName: "R",
        component: Redeem,
        layout: "/app/admin"
      },
    ]
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
        miniName: "A&C",
        component: AppsandCrm,
        layout: "/app/admin"
      },
      {
        path: "/api",
        name: "API",
        miniName: "API",
        component: Api,
        layout: "/app/admin"
      },
      {
        path: "/conversionTracking",
        name: "ConversionTracking",
        miniName: "CT",
        component: ConversionTracking,
        layout: "/app/admin"
      }
    ]
  },

  // for Unsubscribes
  {
    collapse: false,
    name: " Unsubscribes",
    icon: "fa fa-user-alt-slash text-orange",
    state: "unsubscribe",
    path: "/unsubscribes",
    miniName: "Us",
    component: Unsubscribes,
    layout: "/app/admin"
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

    ]
  },

];

export default routes;

const _import = require('./_import_' + process.env.NODE_ENV)

export const menu = [
  {
        path: "user-manager",
        name: "user-manager",
        component: _import("user-manager/UserManager"),
        meta: {
            name: "用户管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "user-group-manager",
        name: "user-group-manager",
        component: _import("user-group-manager/UsergroupManager"),
        meta: {
            name: "用户组管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "permission-manager",
        name: "permission-manager",
        component: _import("permission-manager/PermissionManager"),
        meta: {
            name: "用户权限管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "menu-manager",
        name: "menu-manager",
        component: _import("menu-manager/MenuManager"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "job-manager",
        name: "job-manager",
        component: _import("job-manager/JobManager"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "target-manager",
        name: "target-manager",
        component: _import("target-manager/TargetManager"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "application-manager",
        name: "application-manager",
        component: _import("application-manager/ApplicationManager"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "rule-manager",
        name: "rule-manager",
        component: _import("rule-manager/RuleManager"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "monitor-dashboard",
        name: "monitor-dashboard",
        component: _import("monitor-dashboard/MonitorDashboard"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
  {
        path: "monitor-silence",
        name: "monitor-silence",
        component: _import("monitor-silence/silence"),
        meta: {
            name: "用户菜单管理",
            icon: "fa-book",
            permissions: []
        }
    },
]

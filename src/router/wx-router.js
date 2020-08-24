
let bus = null;

export default class WxRouter {
  constructor(options = {}) {
    this.createRouteMap(options.routes || []);
    this.history = new CustomHistory(this);
    this.init();
  }

  init() {
    bus.$on('on-path-change', to => {
      this.push(to);
    });

    bus.$emit('on-path-change', '/');
  }

  createRouteMap(routes) {
    this.routeMap = routes.reduce((map, route) => {
      map[route.path] = route.component;
      return map;
    }, {});
  }

  push(fullPath) {
    this.history.push(fullPath);
  }

  go(n) {
    this.history.go(n);
  }

  back() {
    this.history.go(-1);
  }
}

class CustomHistory {
  constructor(router) {
    this.records = [];
    this.router = router;
    this.current = {};
  }

  // push(location) {
  //   if(location.fullPath === this.current.fullPath) return;
  //   this.records.push(location);
  //   this.current = location;
  //   this.router.currentRoute = location;
  // }

  push(fullPath) {
    if(fullPath === this.current.fullPath) return;

    const [ path, queryStr ] = fullPath.split('?');
    const query = queryStr ? queryStr.split('&').reduce((obj, item) => {
      const temp =  item.split('=').map(n => decodeURIComponent(n));
      obj[temp[0]] = temp[1];
      return obj;
    }, {}) : {};
    const location = { path, query, fullPath };

    this.records.push(location);
    this.current = location;
    this.router.currentRoute = location;
  }

  go(n) {
    this.records = this.records.slice(0, n);
    const { path } = this.records[this.records.length - 1];
    bus.$emit('on-path-change', path);
  }
}

WxRouter.install = function(Vue, options) {
  bus = new Vue();

  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        this._wx_root = this;
        this._wx_router = this.$options.router;

        Vue.util.defineReactive(this, '_wx_history', this._wx_router.history);
      } else {
        this._wx_root = (this.$parent && this.$parent._wx_root) || this;
      }
    }
  });

  Object.defineProperty(Vue.prototype, '$wxRouter', {
    get: function() {
      return this._wx_root._wx_router;
    }
  });

  Object.defineProperty(Vue.prototype, '$wxRoute', {
    get: function() {
      return this._wx_root._wx_router.currentRoute;
    }
  });

  Vue.component('wx-router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h('div', {
        on: {
          click: () => {
            bus.$emit('on-path-change', this.to);
          }
        }
      }, this.$slots.default);
    }
  });

  Vue.component('wx-router-view', {
    name: 'WxRouterView',
    functional: true,
    props: {
      name: {
        type: String,
        default: 'default'
      }
    },
    render(h, { props, children, parent, data }) {
      const router = parent._wx_root._wx_router;
      const currentPath = router.currentRoute.path;
			const component = router.routeMap[currentPath];
      return h(component, data, children);
    }
  });
};














// import { install } from './install';

// export default class WxRouter {
//   constructor(options) {
//     this.app = null;
//     this.apps = [];
//     this.options = options;
//     this.beforeHooks = [];
//     this.resolveHooks = [];
//     this.afterHooks = [];
//     this.matcher = createMatcher(options.routes || [], this);
//     this.history = new WxHistory(this, options.base);
//   }

//   match(raw, current, redirectedFrom) {
//     return this.matcher.match(raw, current, redirectedFrom);
//   }

//   get currentRoute() {
//     return this.history && this.history.current;
//   }

//   init(app) {
//     this.apps.push(app);
//     app.$once('hook:destroyed', () => {
//       const index = this.apps.indexOf(app);
//       if(index > -1) {
//         this.apps.splice(index, 1);
//       }
//       if(this.app === app) {
//         this.app = this.apps[0] || null;
//       }
//     });

//     if(this.app) {
//       return;
//     }

//     this.app = app;

//     const history = this.history;

//     history.listen(route => {
//       this.apps.forEach(app => {
//         app._route = route;
//       });
//     });
//   }
// }

// WxRouter.install = install;
// WxRouter.version = '__VERSION__';

// if(typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(WxRouter);
// }
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import {
  Table,
  TableColumn,
  Button
} from 'element-ui'

Vue.prototype.$ELEMENT = {
  size: 'mini',
  zIndex: 2000
}

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
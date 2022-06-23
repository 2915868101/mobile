const yyzb_swrc = () => import('@/components/yyzb/yyzb_swrc')
const yyzb_ybzb = () => import('@/components/yyzb/yyzb_ybzb')
const yyzb_mzhzfd = () => import('@/components/yyzb/yyzb_mzhzfd')
const yyzb_zyhzfd = () => import('@/components/yyzb/yyzb_zyhzfd') 
var routes = [{
  path: '/yyzb_swrc',
  name: 'yyzb_swrc',
  component: yyzb_swrc
},{
  path: '/yyzb_ybzb',
  name: 'yyzb_ybzb',
  component: yyzb_ybzb
},{
  path: '/yyzb_mzhzfd',
  name: 'yyzb_mzhzfd',
  component: yyzb_mzhzfd
},{
  path: '/yyzb_zyhzfd',
  name: 'yyzb_zyhzfd',
  component: yyzb_zyhzfd
}]
export default routes
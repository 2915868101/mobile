const zyzb_ryrc = () => import('@/components/zyzb/zyzb_ryrc')
const zyzb_cyrc = () => import('@/components/zyzb/zyzb_cyrc')
const zyzb_zyrc = () => import('@/components/zyzb/zyzb_zyrc')
const zyzb_zyyzb = () => import('@/components/zyzb/zyzb_zyyzb') 
var routes = [{
  path: '/zyzb_ryrc',
  name: 'zyzb_ryrc',
  component: zyzb_ryrc
},{
  path: '/zyzb_cyrc',
  name: 'zyzb_cyrc',
  component: zyzb_cyrc
},{
  path: '/zyzb_zyrc',
  name: 'zyzb_zyrc',
  component: zyzb_zyrc
},{
  path: '/zyzb_zyyzb',
  name: 'zyzb_zyyzb',
  component: zyzb_zyyzb
}]
export default routes
const mzzb_mzrc = () => import('@/components/mzzb/mzzb_mzrc')
const mzzb_jzrc = () => import('@/components/mzzb/mzzb_jzrc')
const mzzb_tjrc = () => import('@/components/mzzb/mzzb_tjrc')
const mzzb_mzyzb = () => import('@/components/mzzb/mzzb_mzyzb') 
var routes = [{
  path: '/mzzb_mzrc',
  name: 'mzzb_mzrc',
  component: mzzb_mzrc
},{
  path: '/mzzb_jzrc',
  name: 'mzzb_jzrc',
  component: mzzb_jzrc
},{
  path: '/mzzb_tjrc',
  name: 'mzzb_tjrc',
  component: mzzb_tjrc
},{
  path: '/mzzb_mzyzb',
  name: 'mzzb_mzyzb',
  component: mzzb_mzyzb
}]
export default routes
const srtj_fyfx = () => import('@/components/srtj/srtj_fyfx')
const srtj_mzfyfx = () => import('@/components/srtj/srtj_mzfyfx')
const srtj_zyfyfx = () => import('@/components/srtj/srtj_zyfyfx')
const srtj_yzbfx = () => import('@/components/srtj/srtj_yzbfx')
const chart = () => import('@/components/srtj/chart')
var routes = [{
  path: '/srtj_fyfx',
  name: 'srtj_fyfx',
  component: srtj_fyfx
},{
  path: '/srtj_mzfyfx',
  name: 'srtj_mzfyfx',
  component: srtj_mzfyfx
},{
  path: '/srtj_zyfyfx',
  name: 'srtj_zyfyfx',
  component: srtj_zyfyfx
},{
  path: '/srtj_yzbfx',
  name: 'srtj_yzbfx',
  component: srtj_yzbfx
},{
  path: '/chart',
  name: 'chart',
  component: chart
}]
export default routes
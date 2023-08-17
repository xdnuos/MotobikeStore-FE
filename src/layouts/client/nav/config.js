// component
// import SvgColor from '../../../components/svg-color';

// // ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'KHÔNG',
    path: '/list-products'
  },
  {
    title: 'BIẾT',
    path: '/list-products?tag=all'
  },
  {
    title: 'GHI',
    path: '/list-products?manufacturer=all',
  },
  {
    title: 'GÌ',
    path: '/list-products?category=all',
  },
  {
    title: 'LUÔN',
    path: '/blog',
  },
  {
    title: 'Á',
    path: '/contact',
  },
];

export default navConfig;

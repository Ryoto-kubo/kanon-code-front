import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

export const menus = [
  {
    name: 'レビュー',
    icon: <CreateOutlinedIcon />,
    href: '/dashboard/reviews',
  },
  {
    name: 'レビューリクエスト',
    icon: <RateReviewOutlinedIcon />,
    href: '/dashboard/review_requests',
  },
  {
    name: '購入したレビュー',
    icon: <ShoppingCartOutlinedIcon />,
    href: '/dashboard/payments_history',
  },
  {
    name: 'ライブラリー',
    icon: <LocalLibraryOutlinedIcon />,
    href: '/dashboard/library',
  },
  {
    name: '売り上げ',
    icon: <MonetizationOnOutlinedIcon />,
    href: '/dashboard/salse',
  },
  // {
  //   name: 'Github',
  //   icon: <IconGithub fontSize="small" />,
  //   href: '/dashboard/github',
  // },
]

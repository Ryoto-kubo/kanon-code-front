import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

export const menus = [
  {
    name: 'Reviews',
    icon: <CreateOutlinedIcon />,
    href: '/dashboard/reviews',
  },
  // {
  //   name: 'Review request',
  //   icon: <RateReviewOutlinedIcon />,
  //   href: '/dashboard/review_requests',
  // },
  {
    name: 'Payments',
    icon: <ShoppingCartOutlinedIcon />,
    href: '/dashboard/payments_history',
  },
  {
    name: 'Bookmarks',
    icon: <LocalLibraryOutlinedIcon />,
    href: '/dashboard/bookmarks',
  },
  {
    name: 'Sales',
    icon: <MonetizationOnOutlinedIcon />,
    href: '/dashboard/sales',
  },
  // {
  //   name: 'Github',
  //   icon: <IconGithub fontSize="small" />,
  //   href: '/dashboard/github',
  // },
]

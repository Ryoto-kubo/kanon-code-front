import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';

export const menus = [
  {
    name: 'Reviews',
    icon: <CreateOutlinedIcon />,
    href: '/dashboard/reviews',
  },
  {
    name: 'Review request',
    icon: <NoteOutlinedIcon />,
    href: '/dashboard/drafts',
  },
  {
    name: 'Bookmarks',
    icon: <BookmarksOutlinedIcon />,
    href: '/dashboard/bookmarks',
  },
  {
    name: 'Payments',
    icon: <InboxOutlinedIcon />,
    href: '/dashboard/payments_history',
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
];

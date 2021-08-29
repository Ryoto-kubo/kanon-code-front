import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';

export const menus = [
  {
    name: 'レビュー一覧',
    icon: <CreateOutlinedIcon />,
    href: '/dashboard/reviews',
  },
  {
    name: '下書き一覧',
    icon: <NoteOutlinedIcon />,
    href: '/dashboard/drafts',
  },
  {
    name: 'ブックマーク',
    icon: <BookmarksOutlinedIcon />,
    href: '/dashboard/bookmarks',
  },
  {
    name: '購入したレビュー',
    icon: <InboxOutlinedIcon />,
    href: '/dashboard/payments_history',
  },
  {
    name: '売り上げ',
    icon: <MonetizationOnOutlinedIcon />,
    href: '/dashboard/sales',
  },
  // {
  //   name: 'Github',
  //   icon: <IconGithub fontSize="small" />,
  //   href: '/dashboard/github',
  // },
];

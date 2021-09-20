import { v4 as uuidv4 } from 'uuid';

export const articles = [
  {
    key: uuidv4(),
    title: 'Kanon CodeのUpdate情報 【Update情報ページ追加】 - vol-04',
    url: 'https://note.com/kanon_code/n/ncc8b137a9c1b',
    date: '2021/09/19',
    className: 'first',
    desciption: 'Update情報ページを作成',
    hasNote: true,
  },
  {
    key: uuidv4(),
    title: 'レビュー依頼に初期テンプレートを挿入',
    url: '',
    date: '2021/09/15',
    className: '',
    desciption: 'レビュー依頼時のDescriptionにテンプレートを初期入力させました',
    hasNote: false,
  },
  {
    key: uuidv4(),
    title: 'Kanon CodeのUpdate情報 【予算の設定】 - vol-03',
    url: 'https://note.com/kanon_code/n/nbeaf2bc4cb4d',
    date: '2021/09/14',
    className: '',
    desciption: 'レビュー依頼時に予算を設定できるようになりました。',
    hasNote: true,
  },
  {
    key: uuidv4(),
    title: 'Kanon CodeのUpdate情報 【OGPの表示】 - vol-02',
    url: 'https://note.com/kanon_code/n/n519fa674ea42',
    date: '2021/09/13',
    className: '',
    desciption: 'OGPが表示されるようになりました。',
    hasNote: true,
  },
  {
    key: uuidv4(),
    title: 'Kanon CodeのUpdate情報 【募集中の表示】 - vol-01',
    url: 'https://note.com/kanon_code/n/n0f9fe9fd8f89',
    date: '2021/09/05',
    className: '',
    desciption: 'レビュー募集中と停止中を表示できるようになりました。',
    hasNote: true,
  },
];

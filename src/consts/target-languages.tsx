import { v4 as uuidv4 } from "uuid";

export const targetLanguages = [
  {
    id: uuidv4(),
    value: 0,
    text: "フロント言語",
  },
  {
    id: uuidv4(),
    value: 1,
    text: "サーバー言語",
  },
  {
    id: uuidv4(),
    value: 2,
    text: "その他の言語",
  },
];

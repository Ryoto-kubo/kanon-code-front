import { v4 as uuidv4 } from "uuid";
export const banks = [
  {
    id: uuidv4(),
    code: "0005",
    name: "三菱UFJ",
  },
  {
    id: uuidv4(),
    code: "9900",
    name: "ゆうちょ",
  },
  {
    id: uuidv4(),
    code: "0001",
    name: "みずほ",
  },
  {
    id: uuidv4(),
    code: "0009",
    name: "三井住友",
  },
  {
    id: uuidv4(),
    code: "0397",
    name: "新生",
  },
  {
    id: uuidv4(),
    code: "0010",
    name: "りそな",
  },
  {
    id: uuidv4(),
    code: "0138",
    name: "横浜",
  },
  {
    id: uuidv4(),
    code: "0034",
    name: "セブン",
  },
  {
    id: uuidv4(),
    code: "0033",
    name: "ジャパンネット",
  },
  {
    id: uuidv4(),
    code: "0035",
    name: "ソニー",
  },
  {
    id: uuidv4(),
    code: "0036",
    name: "楽天",
  },
  {
    id: uuidv4(),
    code: "0038",
    name: "住信SBI",
  },
  {
    id: uuidv4(),
    code: "0040",
    name: "イオン",
  },
];

export const depositTypes = [
  {
    id: uuidv4(),
    value: 0,
    name: "普通",
  },
  {
    id: uuidv4(),
    value: 1,
    name: "当座",
  },
];

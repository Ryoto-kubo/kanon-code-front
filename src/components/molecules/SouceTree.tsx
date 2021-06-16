import { ParagraphText } from "@/components/atoms/ParagraphText";
import React from "react";

type Props = {
  inputFileNameLists: {
    body_html: string;
    file_name: string;
    is_valid: boolean;
    key: string;
    source_code: string;
  }[];
};
// └──
// ├─
// │
export const SouceTree: React.FC<Props> = ({ inputFileNameLists }) => {
  console.log(inputFileNameLists);

  const makeFileNameLists = () => {
    let fileNameLists: string[][] = [];
    for (const item of inputFileNameLists) {
      const fileNames = item.file_name.split("/");
      fileNameLists.push(fileNames);
      // fileNameLists.push(...fileNames);
    }
    return fileNameLists;
  };

  const fileNameLists = makeFileNameLists();
  console.log(fileNameLists);
  const startTime = performance.now();
  for (const firstIndex in fileNameLists) {
    console.log("----------------");
    console.log(firstIndex);
    const fileNameList = fileNameLists[firstIndex];
    for (const item of fileNameList) {
      for (const thirdIndex in fileNameLists) {
        if (firstIndex === thirdIndex) continue;
        const refList = fileNameLists[thirdIndex];
        for (const refValue of refList) {
          console.log(item, "item");
          console.log(refValue, "refValue");
        }
      }
    }
  }
  const endTime = performance.now();
  const elapsed = endTime - startTime;
  const elapsedStr = elapsed.toPrecision(3);
  console.log(`${elapsedStr}`);
  // const hoge = [
  //   `└── router`,
  //   `│　　└── index.js`,
  //   `└── src`,
  //   `　　└── components`,
  //   `　　　　└── index.js`,
  //   `　　　　└── index.js`,
  //   `　　　　└── index.js`,
  // ];

  // const some: { key: string } = {};
  // for (const item of fileNameLists) {
  //   const foundIndex = fileNameLists.findIndex((value) => value === item);
  //   console.log(foundIndex, item);
  // }

  return (
    <>
      <ParagraphText variant="subtitle1" component="p">
        SourceTree
      </ParagraphText>
      {/* {hoge.map((el) => (
        <>
          <span>{el}</span>
          <br />
        </>
      ))} */}
      {/* <span>└── router</span>
      <br />
      <span>│&nbsp;&nbsp;└── index.js</span>
      <br />
      <span>└── src</span>
      <br />
      <span>&nbsp;&nbsp;└── components</span>
      <br />
      <span>&nbsp;&nbsp;&nbsp;&nbsp;└── index.js</span>
      <br />
      <span>&nbsp;&nbsp;&nbsp;&nbsp;└── index.js</span>
      <br />
      <span>&nbsp;&nbsp;&nbsp;&nbsp;└── index.js</span>
      <br /> */}
    </>
  );
};

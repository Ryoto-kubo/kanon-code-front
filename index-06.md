# ありがとうございます

とてもわかりやすいレビューありがとうございます！

すごくためになりました！

- test
- teast
- tes

> 基本的には、useEffect の callback 関数が実行される前と理解してもらって問題ないと思います。
> 細かく言うと、v16 と v17 で clean-up 関数が呼び出されるタイミングが違います。
> あとコンポーネントが unmount するか、re-render するかによっても挙動が異なりますが、ここでは深く触れないので useEffect の callback 関数が実行される前ということを理解してもらったらいいと思います。

この部分はこう言う意味でしょうか？？

```ts
type Props = {
  id: string;
  isFullDisplayButton: boolean;
  headerText: string;
  changeActiveStep: (value: number) => void;
  onChange: (value: string) => void | any;
  value: string;
  activeStep: number;
  isValid: boolean;
  updateCanPublish: (isValid: boolean, message?: any) => void;
  uploadImageToS3: (presignedUrl: string, image: any) => void;
  MAX_LENGTH: number;
  currentIndex?: number;
  handleTabChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  inputFileNameLists?: {
    key: string;
    fileName: string;
    sourceCode: string;
    bodyHtml: string;
    isValid: boolean;
  }[];
};
```

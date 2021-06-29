## よかった点

三項演算子は上のように JSX 内以外でも使えます。（当たり前ですが）
この場合 active === true のとき文字列 hoge が、active === false のとき文字列 fuga が返されます。
この書き方のいいところは。

```javascript
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log("api received!", body);

  const response = {
    statusCode: 200,
    body: JSON.stringify([body.hoge, body.fuga, body.piyo]),
  };
  return response;
};
```

### Lambda 側のトリガー設定から新規 REST API を作成

検証用に、ごくごくシンプルな設定で API を作成
実運用では「オープン」は危険なので要注意
HTTP API ではマッピングテンプレートが使えないので、REST API にする

## 改善点

基本的には、useEffect の callback 関数が実行される前と理解してもらって問題ないと思います。

細かく言うと、v16 と v17 で clean-up 関数が呼び出されるタイミングが違います。

あとコンポーネントが unmount するか、re-render するかによっても挙動が異なりますが、ここでは深く触れないので useEffect の callback 関数が実行される前ということを理解してもらったらいいと思います。

```javascript
React.useEffect(() => {
  if (mountRef.current) {
    const fakeFetch = () => {
      return (
        new Promise() <
        string >
        ((res) => {
          setTimeout(() => res(`${person}'s data`), Math.random() * 5000);
        })
      );
    };
    fakeFetch().then((data) => setData(data));
  } else {
    mountRef.current = true;
  }
}, [person]);
```

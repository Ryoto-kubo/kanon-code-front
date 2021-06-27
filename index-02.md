## よかった点

コードは基本的に言語仕様に沿って書かれてるかと思います。

[JavaScript とは](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_is_JavaScript)

ただ、配列を作るときは filter を使った方がいいと思いますよ

```javascript
const resultList = targetList.filter((el) => el.name === 'name')
```

これだけで name をもった要素の配列を作成することができます。
参考にしてみてください。

## 改善点

上記の filter を使ったり map を使ったり js がデフォルトで用意しているメソッドを有効に使っていきましょう。
するともう少スッキリ書けると思いますよ！

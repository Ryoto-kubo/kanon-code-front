# タイトル

## よかった点

コード自体はいいと思います。
特段悪い箇所はないかと思います。

```typescript
const registerContent = async (
  paymentType: number,
  beginPaymentArea: number | null,
  price: number,
) => {
  const params = createParams(paymentType, beginPaymentArea, price)
  console.log(params, 'params')
  try {
    const response = await postReview(params)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
```

ココのコードは特にいいと思いますよ！！

## 改善点

このあたりのコードは少し改善したほうがいいです。

```javascript
var hoge = 1
```

var で宣言した変数は global になってしまうため const 又は let でスコープを限定する、最代入がないことをわからせた方がリーダブルではあります。

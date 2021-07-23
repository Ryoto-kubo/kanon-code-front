src/pages/web_site/index.tsx
src/pages/twitter_name/index.tsx

```javascript
async getPayments() {
  // 自分のレビューデータを取得
  let totalSales = 0;
  const resultSales = [];
  const metadata = await this.getMetadata(this.userId);
  if (metadata.Items.length <= 1) return { resultSales, totalSales };
  const reviews = this.filtering(metadata.Items, "review");
  if (reviews.length <= 0) return { resultSales, totalSales };
  this.sortItems(reviews);
  // レビューに紐づく課金データを取得
  for (const reviewItem of reviews) {
    const payments = await this.getPaymentsByReview(reviewItem);
    if (payments.length <= 0) continue;
    const mapper = new Mapper();
    const contents = reviewItem.contents;
    for (const paymentItem of payments) {
      const userId = paymentItem.partition_key.split("#").pop();
      const metadata = await this.getMetadata(userId);
      const mapperdPaymentItem = mapper.paymentsMapper(paymentItem);
      mapperdPaymentItem.reviewed_contents = contents;
      mapperdPaymentItem.purchaser_profile = metadata.Items[0].user_profile;
      resultSales.push(mapperdPaymentItem);
    }
  }

  if (resultSales.length <= 0) {
    return { resultSales, totalSales };
  }

  totalSales = this.totalSales(resultSales);
  return { resultSales, totalSales };
}
```

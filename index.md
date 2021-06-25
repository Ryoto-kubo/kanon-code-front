```typescript
useEffect(() => {
  let isCodeBlock = false
  marked(props.review, (_, result) => {
    let joinedCode: string = ''
    const resultList: string[] = []
    const splitedList = result.split('\n')
    for (const item of splitedList) {
      const foundBeginCode = item.search(BEGIN_CODE_TAG)
      const foundEndCode = item.search(ENDE_CODE_TAG)
      if (isCodeBlock) {
        joinedCode = `${joinedCode}\n${item}`
        if (foundEndCode >= 0) {
          isCodeBlock = false
          resultList.push(joinedCode)
        }
      } else {
        if (foundBeginCode >= 0 || foundEndCode >= 0) {
          isCodeBlock = true
          joinedCode = `${joinedCode}${item}`
        } else {
          resultList.push(item)
          isCodeBlock = false
        }
      }
    }
    console.log(resultList, 'resultList')

    setRawHtmlList(resultList)
  })
}, [props.review])
```

## よかった点

- good

```javascript
const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(event.target.value)
  setPrice(value)
}
```

## 改善点

- bad

```javascript
const badPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(event.target.value)
  setPrice(value)
}
```

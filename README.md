# japan-population-app

都道府県別の人口推移のグラフを表示

## 実行

`yarn start`

## テスト

`yarn test`

## API KEY

本アプリケーションは、 [RESAS-API](https://opendata.resas-portal.go.jp/) を利用しています。

.env ファイルを作成し、利用登録後発行される API-KEY を下記の形式で追加してください。

```
REACT_APP_RESAS_API_KEY={api-key}
```

---

### WARNING

コンソールに警告が出ますが、以下の通りです。

```
Warning: React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.
```

https://github.com/plouc/nivo/issues/884

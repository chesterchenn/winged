# caesar

这是一个实现凯撒密码的实验性功能模块。

## 使用

- 可以将文件下的 `index.js` 修改成需要的文件名，引入进来

```js
import { encrypt, decrypt } from './caesar';
```

- 可以将整个文件放入到 `node_modules` 下

```js
import { encrypt, decrypt } from 'caesar';
```

## API

`function encrypt(key?: number, message?: string)`

`function decrypt(key?: number, message?: string)`

## 实例

```js
encrypt(3, 'Hello World! This is from caesar.'); // Khoor Zruog! Wklv lv iurp fdhvdu.
decrypt(3, 'Khoor Zruog! Wklv lv iurp fdhvdu.'); // Hello World! This is from caesar.
```

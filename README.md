## Requeriments

sudo apt install libcairo2
sudo apt install libpango-1.0-0
sudo apt install libxkbcommon0
sudo apt install libgbm1
sudo apt install libxdamage1

## Quick start

Create your html file:

```html
<html>

<head>
    <title>HTML content</title>
</head>

<body>
    <h1>Sample</h1>
    <div>
        <p>
            This is my file {{myVariable}}
        </p>
</body>

</html>
```

```js
const { PDF } = require("@spi/pdf");

const file = './my-document.html'

const pdf = PDF.fromPath(file, {
    myVariable: 'Amazing file'
});

const pathToStore = "./myFile.pdf"

pdf.store(pathToStore); // will store a pdf file

pdf.toBase64() // Will generate base64 string
```
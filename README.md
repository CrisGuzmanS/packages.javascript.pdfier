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
const { PDF } = require("pdfier");

const pdf = PDF.fromPath('./my-document.html', {
    myVariable: 'Amazing file'
});

pdf.store("./myFile.pdf"); // will store a pdf file

pdf.toBase64() // Will generate base64 string
```

To generate the base 64 pdf:
```js
`data:application/pdf;base64, ${(await pdf.toBase64())}`
```
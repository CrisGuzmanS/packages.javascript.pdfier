const fs = require("fs");
const { default: puppeteer } = require("puppeteer");
const handlebars = require('handlebars');

/**
 * Fachada para crear un PDF a partir de un HTML
 */
class PDF {

    constructor(html, data = {}, options = {}) {
        this._template = html;
        this._data = data;
        this._options = options;

        handlebars.registerHelper('base_64', (path) => {

            const imageData = fs.readFileSync(path);

            const imageBase64 = Buffer.from(imageData).toString('base64');

            const imageSrc = `data:image/png;base64,${imageBase64}`;

            return imageSrc
        })

        handlebars.registerHelper('increment', (value) => {
            return parseInt(value) + 1
        })

        handlebars.registerHelper('value', (value, string) => {
            return value ? value : string
        })
    }

    /**
     * Crea un PDF a partir de un HTML
     * 
     * @param {string} path ruta del archivo HTML,
     * @param {string} data datos a insertar en el PDF,
     * @param {object} options opciones de configuracion
     * @return {PDF}
     */
    static fromPath(path, data = {}, options = {}) {
        return new PDF(
            handlebars.compile(fs.readFileSync(path, 'utf-8')),
            data,
            options
        );
    }

    /**
     * @returns {Promise<string>} Base64 del PDF
     */
    async toBase64() {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.setContent(this._template(this._data), { waitUntil: 'networkidle0' });

        await page.emulateMediaType('screen');

        const margin = { top: '10px', right: '10px', bottom: '10px', left: '10px' }

        const pdf = await page.pdf({
            margin,
            printBackground: true,
            format: 'Letter',
        });

        await browser.close();

        return `${pdf.toString('base64')}`;
    }

    async store(path) {
        const base64 = await this.toBase64();
        fs.writeFileSync(path, base64, 'base64')
    }

    async toResponse() {
        return `data:application/pdf;base64,${await this.toBase64()}`
    }
}

module.exports = {
    PDF
}
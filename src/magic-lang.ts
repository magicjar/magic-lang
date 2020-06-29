interface Options {
    langList: string[],
    path: string,
    lang: string,
    attr: string,
    urlParam: string
}

export class MagicLang {

    options: Options
    constructor(opt?: Options) {
        this.options = {
            langList: ['en', 'id'],
            path: 'dist/lang',
            lang: 'en',
            attr: 'magiclang',
            urlParam: 'lang'
        }
        Object.assign({}, this.options, opt)
    }

    currentLang = ''

    option = (opt: Options) => {
        Object.assign(this.options, opt)
    }

    load = () => {
        let lang = this.options.lang
        let path = this.options.path

        const query = window.location.search;
        const params = new URLSearchParams(query)

        const theParam = params.get(this.options.urlParam)
        if (theParam != null && this.options.langList.includes(theParam)) lang = theParam

        this.currentLang = lang

        const object = new XMLHttpRequest()
        object.overrideMimeType("application/json")
        object.open('GET', path + '/' + lang + '.json', true)
        object.onreadystatechange = () => {
            if (object.readyState == 4 && object.status == 200) {
                this.translate(JSON.parse(object.responseText))
            }
        }

        object.addEventListener("error", () => {
            console.error("magic-lang.js: Failed to load language files.")
        }, false)

        object.send(null)
    }

    translate = (dicts: any) => {
        const nodes = document.querySelectorAll('[' + this.options.attr + ']')

        for (let i = 0; i < nodes.length; i++) {
            const attrVal = nodes[i].getAttribute(this.options.attr)

            const dict = dicts[attrVal as any]

            if (dict == '' || dict == null) continue
            
            if (attrVal != null) nodes[i].textContent = dict
        }
    }
}

const ml = new MagicLang()

export function init() {
    return ml.load()
}

export function option(opt: Options) {
    ml.option(opt)
}

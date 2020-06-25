interface Options {
    path: string,
    lang: string
}

export class MagicLang {

    options: Options
    constructor(opt?: Options) {
        this.options = {
            path: 'dist/lang',
            lang: 'en'
        }
        Object.assign({}, this.options, opt)
    }

    currentLang = ''

    option = (opt: Options) => {
        Object.assign(this.options, opt)
    }

    load = (newLang?: string) => {
        if (this.currentLang == newLang) return

        let lang = this.options.lang
        let path = this.options.path

        if (newLang !== undefined) lang = newLang
        if (lang == null) lang = this.options.lang

        this.currentLang = lang

        const object = new XMLHttpRequest()
        object.overrideMimeType("application/json")
        object.open('GET', path + '/' + lang + '.json', true)
        object.onreadystatechange = () => {
            if (object.readyState == 4 && object.status == 200) {
                this.translate(JSON.parse(object.responseText))
                localStorage.magicLang = lang
            } 
        }

        object.addEventListener("error", () => {
            console.error("MagicLang.js: Failed loading language files.")
        }, false)

        object.send(null)
    }

    translate = (dicts: any) => {
        const nodes = document.querySelectorAll('[data-magiclang]')

        for (let i = 0; i < nodes.length; i++) {
            const attrVal = nodes[i].getAttribute('data-magiclang')

            const dict = dicts[attrVal as any]

            if (dict == '' || dict == null) continue
            
            if (attrVal != null) nodes[i].textContent = dict
        }
    }
}

const ml = new MagicLang()

export function init() {
    const savedLang = localStorage.magicLang

    if (savedLang) return ml.load(savedLang)

    return ml.load()
}

export function change(params: string) {
    return ml.load(params)
}

export function option(opt: Options) {
    ml.option(opt)
}

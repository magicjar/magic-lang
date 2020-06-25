export class MagicLang {

    options = {
        path: 'dist/lang',
        lang: 'en'
    }

    currentLang = ''

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
            
            if (attrVal != null) nodes[i].textContent = dicts[attrVal]
        }
    }
}

const ml = new MagicLang()

export function init() {
    const savedLang = localStorage.magicLang

    if (savedLang) return ml.load(savedLang)

    return ml.load()
}

export function switchLang(params: string) {
    return ml.load(params)
}

# Magic-Lang

Javascript multi-language switcher system

## Quick links

- [Getting started](#getting-started)
- [Implementing](#implementing)
   - [Prepare the language dictionary](#prepare-the-language-dictionary)
   - [Prepare the site](#prepare-the-site)
- [Options](#options)
- [Browser support](#browser-support)
- [License](#license)

## Getting started

1. Download from [Github](https://github.com/magicjar/magic-lang)

2. Grab all files inside `dist` folder (`js` and `lang` folders) to your assets folder

    - Include the script before the closing `</body>` tag

        ``` html
        <script src="../js/magic-lang.min.js"></script>
        ```

## Implementing

### Prepare the language dictionary

1. Create new file named `en.json` and placed it inside the `lang` folder and open it.

2. Add the following example
    ``` json
    {
        "title": "Translate this title!",
        "...": "..."
    }
    ```
3. Create another language file, example `id.json` for Indonesian language

4. Copy all content from `en.json` and just translate it inside `id.json`
    ``` json
    {
        "title": "Terjemahkan judul ini!",
        "...": "..."
    }

### Prepare the site

1. Add `magiclang` attribute to element you want to translate
    ``` html
    <h1 magiclang="title">Translate this title!</h1>
    ```

2. Add options
    ``` html
    <script>
        MagicLang.option({
            langList: ['en', 'id'], // Specify all of site language here
            lang: 'en' // Default language
        });
    </script>
    ```

3. Initiate Magic-lang
    ``` html
    <script>
        MagicLang.init();
    </script>
    ```

4. Change language

    To change the language just add search parameter on the url 
    
    Example: `https://yourawesomesite.com/?lang=en`

## Options

You can change any default option with the following method.


Option | Value (default) | Description
------ | --------------- | -----------
**langList** | ['en', 'id'] **(mandatory)**' | You have to specify all of your site language
**path** | 'dist/lang' (optional) | Language files root directory
**lang** | 'en' (optional) | The default site language
**attr** | 'magiclang' (optional) | Attribute name to indicate which element should be translated
**urlParam** | 'lang' | Search parameter name

## Browser support

Magic-Lang currently only support all browser that support `ES6` syntax.

Known **supported** browser:
- Edge >= 12
- Firefox >= 34
- Chrome >= 45
- Safari >= 9
- Opera >= 32
- Android webview >= 45
- Chrome for Android >= 45
- Firefox for Android >= 34
- Opera for Android >= 32
- Safari on iOS >= 9
- Samsung Internet >= 5

## License

Magic-Lang released under the [MIT License](https://github.com/magicjar/magic-lang/blob/master/LICENSE)
const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            userSearch: '',
            partialUrl: 'https://api.themoviedb.org/3/search/multi?',
            apiKey: 'api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=',
            arraySearch: [],
            visible: true,
            flags: 'https://www.countryflags.io/',
            arrayLang: ['en', 'fr', 'te', 'es', 'bn', 'ja', 'tr', 'de', 'nl', 'eu', 'ar', 'gl', 'it', 'cn', 'pt', 'hu', 'ko', 'ru', 'cs', 'po', 'da', 'et', 'th', 'ta', 'tl', 'pl', 'hi'],
            arrayFlags: [
                'gb',
                'fr',
                'in',
                'es',
                'bd',
                'jp',
                'tr',
                'de',
                'bq',
                'es',
                'ae',
                'es',
                'it',
                'cn',
                'pt',
                'hu',
                'kr',
                'cz',
                'ru',
                'dk',
                'ee',
                'in',
                'th',
                'in',
                'ph',
                'pl',
                'hi'

            ],


        },

        methods: {
            callApi() {
                if (this.userSearch == '') {
                    this.visible = false
                    this.errore = ''
                } else {
                    this.visible = true
                    axios
                        .get(this.partialUrl + this.apiKey + this.userSearch)
                        .then(resp => {
                            // console.log(resp.data.results);
                            this.arraySearch = resp.data.results
                            // console.log(this.arraySearch)





                            //Messaggio di errore per mancata ricerca
                            if (resp.data.total_results == '') {
                                // console.log('errore');
                                this.errore = 'Nothing to show, try again'
                            } else {
                                this.errore = ''
                            }



                            // let listLang = []
                            // this.arraySearch.forEach(lang => {
                            //     if (!listLang.includes(lang.original_language)) {
                            //         listLang.push(lang.original_language)
                            //     }
                            // })
                            // console.log(listLang);


                            this.arraySearch.forEach(el => {
                                // console.log(el.original_language);
                                if (this.arrayLang.indexOf(el.original_language) !== -1) {
                                    let position = this.arrayLang.indexOf(el.original_language)
                                    // console.log(this.arrayFlags[position])
                                    el.bandiera = this.arrayFlags[position]
                                    // console.log(el);


                                } else {
                                    console.log(`Missing language: ${el.original_language}`);
                                    // Se non c'è la lingua, dico che è italiano
                                    el.bandiera = 'undefined'

                                }


                            })








                        })

                        .catch(e => {
                            this.errore = `Huston, We Have a Problem! --- ${e} `
                        })


                }

            },

        },

        mounted() {






        },

















    },
);

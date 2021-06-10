const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            userSearch: '',
            // partialUrl: 'https://api.themoviedb.org/3/search/multi?',
            movielUrl: 'https://api.themoviedb.org/3/search/movie?',
            tvUrl: 'https://api.themoviedb.org/3/search/tv?',
            apiKey: 'api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=',
            arrayMovie: [],
            arrayTv: [],
            arraySearch: [],
            visible: false,
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
                'hi'],

            baseCopertina: 'https://image.tmdb.org/t/p/w342/',

        },

        methods: {

            callApi() {
                // Gestione richieste nulle 
                if (this.userSearch == '') {
                    this.visible = false
                    this.errore = ''
                } else {
                    this.visible = true

                    axios
                        .get(this.movielUrl + this.apiKey + this.userSearch)
                        .then(resp => {
                            // console.log(resp.data.results);
                            this.arrayMovie = resp.data.results
                            // console.log(this.arraySearch)


                            //Messaggio di errore per mancanza di risultati
                            if (resp.data.total_results == '') {
                                // console.log('errore');
                                this.errore = 'Nothing to show, try again'
                            } else {
                                this.errore = ''
                            }

                            //AGGIUNGO UN PARAMETRO ALLA MATRICE PER I VOTI
                            let star
                            this.arrayMovie.forEach(el => {
                                star = Math.round((el.vote_average * 5) / 10)
                                el.voto = []
                                el.voto.length = star
                            })

                            //Condizioni aggiuntive per filtrare i risultati di persone e nascondere i contenuti senza copertina
                            this.arrayMovie.forEach((el, index) => {
                                if (el.poster_path === undefined || el.poster_path === null || el.poster_path === '') {
                                    el.copertina = false
                                } else {
                                    el.copertina = true
                                }

                            })

                        })

                        .catch(e => {
                            this.errore = `Huston, We Have a Problem! --- ${e} `
                        })



                    axios
                        .get(this.tvUrl + this.apiKey + this.userSearch)
                        .then(resp => {
                            // console.log(resp.data.results);
                            this.arrayTv = resp.data.results
                            // console.log(this.arraySearch)


                            //Messaggio di errore per mancanza di risultati
                            if (resp.data.total_results == '') {
                                // console.log('errore');
                                this.errore = 'Nothing to show, try again'
                            } else {
                                this.errore = ''
                            }

                            //AGGIUNGO UN PARAMETRO ALLA MATRICE PER I VOTI
                            let star
                            this.arrayTv.forEach(el => {
                                star = Math.round((el.vote_average * 5) / 10)
                                el.voto = []
                                el.voto.length = star
                            })

                            //Condizioni aggiuntive per filtrare i risultati di persone e nascondere i contenuti senza copertina
                            this.arrayTv.forEach((el, index) => {
                                if (el.poster_path === undefined || el.poster_path === null || el.poster_path === '') {
                                    el.copertina = false
                                } else {
                                    el.copertina = true
                                }

                            })

                        })

                        .catch(e => {
                            this.errore = `Huston, We Have a Problem! --- ${e} `
                        })




                    this.arraySearch = this.arrayMovie.concat(this.arrayTv)











                }

            },


        },

        mounted() {






        },

















    },
);

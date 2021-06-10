const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            userSearch: '',
            movielUrl: 'https://api.themoviedb.org/3/search/movie?',
            tvUrl: 'https://api.themoviedb.org/3/search/tv?',
            creditsMovie: 'https://api.themoviedb.org/3/movie/',
            // 447332/credits
            apiKey: 'api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=',
            arrayMovie: [],
            arrayTv: [],
            arraySearch: [],
            arrayShow: [],
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
                'hi'],

            baseCopertina: 'https://image.tmdb.org/t/p/w342/',

        },

        methods: {
            getArrayTv() {
                return axios.get(this.movielUrl + this.apiKey + this.userSearch);
            },

            getArrayMovie() {
                return axios.get(this.tvUrl + this.apiKey + this.userSearch);
            },

            getStar(arr) {
                let star
                arr.forEach(el => {
                    star = Math.round((el.vote_average * 5) / 10)
                    el.voto = []
                    el.voto.length = star
                })
            },


            callsApi() {
                this.arraySearch = []
                this.arrayShow = []

                if (this.userSearch == '') {
                    this.visible = false
                    this.errore = ''
                } else {
                    this.visible = true

                    Promise.all([this.getArrayTv(), this.getArrayMovie()])
                        .then(res => {
                            this.arrayTv = res[0].data.results;
                            this.arrayMovie = res[1].data.results;

                            this.arraySearch = this.arrayTv.concat(this.arrayMovie)
                            //Converto il vote_average in una matrice di N elementi, al fine di poterci ciclare in HTML
                            this.getStar(this.arraySearch)

                            //Condizioni per nascondere i contenuti senza copertina
                            this.arraySearch.forEach((el) => {
                                if (el.poster_path === undefined || el.poster_path === null || el.poster_path === '') {
                                    el.copertina = false
                                } else {
                                    el.copertina = true
                                }
                                //creo una matrice che contiene solo i titoli visibili
                                if (el.copertina) {
                                    this.arrayShow.push(el)

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

            this.arrayShow.forEach((el) => {

                axios
                    .get(this.creditsMovie + el.id + '/credits?' + this.apiKey)
                    .then((resp) => {
                        el.caracter = resp.data.cast

                    })
                    .catch(e => {
                        console.log(e);
                    })

            })




        },



    },
);

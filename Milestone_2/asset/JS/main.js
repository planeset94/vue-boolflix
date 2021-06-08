const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            userSearch: '',
            partialUrl: 'https://api.themoviedb.org/3/search/multi?api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=',
            arraySearch: [],
            visible: true,
            flags: 'https://unpkg.com/language-icons/icons/',

        },

        methods: {
            callApi() {
                if (this.userSearch == '') {
                    this.visible = false
                    this.errore = ''
                } else {
                    this.visible = true
                    axios
                        .get(this.partialUrl + this.userSearch)
                        .then(resp => {
                            // console.log(resp.data.results);
                            this.arraySearch = resp.data.results
                            console.log(this.arraySearch)







                            //Messaggio di errore per mancata ricerca
                            if (resp.data.total_results == '') {
                                // console.log('errore');
                                this.errore = 'Nothing to show, try again'
                            }



                            let listLang = []
                            this.arraySearch.forEach(lang => {
                                if (!listLang.includes(lang.original_language)) {
                                    listLang.push(lang.original_language)
                                }
                            })
                            console.log(listLang);




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

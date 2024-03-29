const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            userSearch: '',
            partialUrl: 'https://api.themoviedb.org/3/search/multi?api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=',
            arraySearch: [],
            visible: true,

        },

        methods: {
            callApi() {

                if (this.userSearch == '') {
                    this.visible = false
                } else {
                    this.visible = true
                    axios
                        .get(this.partialUrl + this.userSearch)
                        .then(resp => {
                            // console.log(resp.data.results);
                            this.arraySearch = resp.data.results
                            console.log(this.arraySearch);
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

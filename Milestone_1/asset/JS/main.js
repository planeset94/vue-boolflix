const app = new Vue(
    {
        el: '#root',

        data: {
            errore: '',
            url: 'https://api.themoviedb.org/3/search/multi?api_key=3e08cf6c1a9102d41852f4ea927dbc55&query=falcon&include_adult=false',
            arraySearch: [],

        },

        methods: {


        },



        mounted() {
            axios
                .get(this.url)
                .then(resp => {
                    // console.log(resp.data.results);
                    this.arraySearch = resp.data.results
                    console.log(this.arraySearch);
                })

                .catch(e => {
                    this.errore = `Huston, We Have a Problem! --- ${e} `
                })






        },

















    },
);

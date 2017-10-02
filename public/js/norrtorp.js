window.addEventListener('load', function () {
    var app = new Vue({
        el: '#adresslista',
        data: {
            searchName: '',
            adresser : [
                {id: 1, name: 'Kalle', mail: 'a@b.com', fastighet: '3:2', validated: true},
                {id: 2, name: 'Nisse', mail: 'a@b.se', fastighet: '3:12', validated: false},
            ]
        },
        computed : {
            filteredItems() {
                return this.adresser.filter(adress => {
                    return adress.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1;
                })
            }
        },
        methods : {
            editAdress : function(id) {
                console.log("Editing id="+id);
                console.log("Name=" + this.$data.adresser[id].name);
            }
        }
    });
});
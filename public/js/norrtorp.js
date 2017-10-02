window.addEventListener('load', function () {
    var app = new Vue({
        el: '#adresslista',
        data: {
            searchName: '',
            searchMail: '',
            searchProperty: '',
            adresser : [
                {id: 1, name: 'Kalle', mail: 'a@b.com', fastighet: '3:2', validated: true},
                {id: 2, name: 'Nisse', mail: 'a@b.se', fastighet: '3:12', validated: false},
            ]
        },
        computed : {
            filteredItems() {
                return this.adresser.filter(adress => {
                    return adress.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1
                    && adress.mail.toLowerCase().indexOf(this.searchMail.toLowerCase()) > -1
                    && adress.fastighet.toLowerCase().indexOf(this.searchProperty.toLowerCase()) > -1
                    ;
                })
            }
        },
        methods : {
            editAdress : function(id) {
                console.log("Editing id="+id);
                console.log("Name=" + this.$data.adresser[id].name);
            },
            removeAdress : function(id) {
                console.log("Remove id="+id);
                console.log("Name=" + this.$data.adresser[id].name);
            },
            sendValidation : function(id) {
                console.log("Validate  id="+id);
                console.log("Name=" + this.$data.adresser[id].name);
            }

        }
    });
});
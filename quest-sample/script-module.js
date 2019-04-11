import getQueryVariable from './parse-url.js';
const page = {
    //ref: db.ref(`quest/page${Math.max(1,getQueryVariable('p'))}`),
    title: document.querySelector('.task .title'),
    text:  document.querySelector('.task .text'),
    links: document.querySelector('.task .links'),
    data: null,
    show(){
        this.title.innerHTML = this.data["title"];
        this.text.innerHTML = this.data["text"];
        this.showLinks(this.data["links"]);
    },
    showLinks: function(links){
        for (let l in links){
            this.links.innerHTML+= `<li><a href="index.html?p=${links[l]}">${l}</a></li>`;
        }
    }
};

//ссылка на базу данных
const db = firebase.database();
const ref = db.ref(`quest/page${Math.max(1,getQueryVariable('p'))}`);
//let data;
//let getData = new Promise(){}
ref.once('value', function(snapshot) {
    page.data = snapshot.val();
    page.show();
});



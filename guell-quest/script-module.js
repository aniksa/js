import getQueryVariable from './parse-url.js';
const questions = "data.json";
const page = {
    //ref: db.ref(`quest/page${Math.max(1,getQueryVariable('p'))}`),
    title: document.querySelector('.task .title'),
    text:  document.querySelector('.task .text'),
    question:  document.querySelector('.task .question'),
    answer:  document.querySelector('.task .answer'),
    next:  document.querySelector('.task .next'),
    win:  document.querySelector('.task .win'),
    links: document.querySelector('.task .links'),
    data: null,
    current: 0,
    init(data){
        //let q = Math.max(0,getQueryVariable('p'));
        this.data = data;
        let q = document.cookie.split('=')[1];
        console.log(q);
        if (q === undefined) q = 0;
        this.answer.oninput = this.check.bind(this);
        this.next.onclick = () => { page.current++; page.show(page.current);}
        this.show(q);
    },
    show(q = 0){
        this.current = q;
        document.cookie = "current="+q;
        this.title.innerHTML = this.data[q]["title"];
        this.text.innerHTML = this.data[q]["text"];
        this.question.innerHTML = this.data[q]["task"];
        this.answer.value = '';
        this.answer.classList.toggle('hidden');
        this.next.classList.toggle('hidden');
        //this.text.innerHTML = this.data[q]["text"];
    },
    showLinks: function(links){
        for (let l in links){
            this.links.innerHTML+= `<li><a href="index.html?p=${links[l]}">${l}</a></li>`;
        }
    },
    check(){
        if (this.data[this.current]["ans"] === this.answer.value){
            this.answer.classList.toggle('hidden');
            if (this.current < this.data.length-1)
                this.next.classList.toggle('hidden');
            else
                this.win.classList.toggle('hidden');
        }
    }
};

//ссылка на базу данных

fetch(questions).then(response=> {return response.json();})
    .then(data => {page.init(data); /*page.show(0);*/})
    .catch(err => { console.log(err);});

/*const db = firebase.database();
const ref = db.ref(`quest/page${Math.max(1,getQueryVariable('p'))}`);
ref.once('value', function(snapshot) {
    page.data = snapshot.val();
    page.show();
});*/



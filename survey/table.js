const questions = "http://aniksa.github.io/js/survey/data.json";
const results = {"question":"Result scores", "answers":["1","2","3","4"]};
class QuestionAnswer{
    constructor(data, table){
        let tr = `<tr><td class="question" colspan="100">${data["question"]}</td></tr>`;
        table.children[1].innerHTML+=tr;
        for (let i=0; i < data["answers"].length; i++){
            tr = `<tr><td class="ans">${data["answers"][i]}</td></tr>`;
            table.children[1].innerHTML += tr;
        }
    }
}
const app = {
    table : document.getElementById('results'),
    max: 4, //max number of options
	score: [],
    setControls(){
        let btns = document.querySelectorAll('[data-id]');
        for(let b of btns){
            b.onclick = function (e) {
                let confirmation = confirm("This data will be deleted. Are you sure?");
                if (confirmation)
                    firebase.database().ref().child(this.dataset.id).remove();
            }
        }

    },
    init(data){
        const table = document.getElementById('results');
        for (let ans of data["questions"]){
            new QuestionAnswer(ans, table);
        }
		new QuestionAnswer(results, table); //headers for result
		
		this.score.length = this.max;
        const answers = document.getElementsByClassName('ans');
        const ref = firebase.database().ref();
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
				app.score.fill(0);
				if (childSnapshot.key === "questions") return;
                let childData = childSnapshot.val();
                /*table.innerHTML += `<tr><td colspan="2" class="project-name">${childData["name"]}</td></tr>`;
                table.innerHTML += `<tr><td colspan="2" class="project-product">${childData["product"]}</td></tr>`;*/
                let k=0;
                table.children[0].children[0].innerHTML += `<th>${childData["name"]}<br/>${childData["product"]}
                <br/><button data-id="${childSnapshot.key}">Delete</button></th>`;
                for (let i=0; i<childData.answers.length; i++){
                    for (let j=0; j<app.max; j++) {
                        answers[k].parentElement.innerHTML += `<td>${childData.answers[i][j]}</td>`;
						app.score[j] += parseFloat(childData.answers[i][j]);
                        k++;
                    }
                    //new QuestionAnswer(data["questions"][i], table, childData.answers[i]);
                }
				for (let j=0; j<app.max; j++) {
                        answers[k+j].parentElement.innerHTML += `<td>${+app.score[j].toFixed(3)}</td>`;
                    }
            });
            app.setControls();
        });
    }
};

fetch(questions).then(response=> {return response.json();})
    .then(data => {app.init(data); })
    .catch(err => { console.log(err);});

//ссылка на базу данных
const db = firebase.database();
const idPage = 1;
const ref = db.ref(`quest/page${idPage}`);
let data;
//let getData = new Promise(){}
ref.once('value', function(snapshot) {
    data = snapshot.val();
    console.log(data);
});
export {data};
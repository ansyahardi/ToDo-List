const tambah = document.querySelector("input[type='button']");
const cardList = document.querySelector(".card-lists");

//cek localStorage apakah ada isi atau tidak
if(localStorage.todo){
  let siapa = JSON.parse(localStorage.todo);
  if(JSON.parse(localStorage.todo).length === undefined){
    listkanItem(siapa.judul, siapa.id);
  } else {
    siapa.map(e => listkanItem(e.judul, e.id));
  }
}


// console.log(JSON.parse(localStorage.todo).length);

tambah.addEventListener("click", tambahData);

function tambahData(){
  const input = document.querySelector("input[type='text']");
  const data = input.value;
  if (data == ""){
    return alert('isikan data');
  }
  
  if(localStorage.length !== 0 && localStorage.todo !== ""){
    const urutan = JSON.parse(localStorage.todo).length === undefined ? 1 : JSON.parse(localStorage.todo).length;
    const isiData = {
      id: urutan,
      judul: data,
      coret: false
    };
    
    let judul = JSON.parse(localStorage.todo);

    if(judul.length > 0){
      judul.push(isiData);
      localStorage.todo = JSON.stringify(judul);
    } else {
      let kirim = [judul, isiData];
      localStorage.todo = JSON.stringify(kirim);
    }
    listkanItem(data, isiData.id);
    // list.setAttribute('urutan', isiData.id);
  } else {
    const isiData = {
      id: 0,
      judul: data,
      coret: false
    };
    localStorage.todo = JSON.stringify(isiData);
    listkanItem(data, isiData.id);
    // list.setAttribute('urutan', isiData.id);
  }
  input.value = "";
}

cardList.addEventListener("click", function(e){
  if(e.target.className == "delete"){
    const text = e.target.parentElement;
    const urutan = text.getAttribute('urutan');
    // console.log(urutan);

    if(JSON.parse(localStorage.todo).length === undefined || JSON.parse(localStorage.todo).length === 1){
      e.target.parentElement.remove();
      return localStorage.clear();
    }

    if(urutan){
      const data = JSON.parse(localStorage.todo);
      const number = data.findIndex(i => i.id === Number(urutan));
      data.splice(number, 1);
      localStorage.todo = JSON.stringify(data);
    }

    e.target.parentElement.remove();
  }
  if(e.target.className == "finish"){
    e.target.parentElement.classList.toggle('line-through');
  }
});


function listkanItem(judul, id){
  // buat setiap element
  const list = document.createElement('div');
  const divIsi = document.createElement('div');
  const finish = document.createElement('div');
  const isiFinish = document.createTextNode('V');
  const close = document.createElement('div');
  const isiClose = document.createTextNode('X');

  // satukan element
  close.append(isiClose);
  close.classList.add('delete');
  finish.append(isiFinish);
  finish.classList.add('finish');
  divIsi.append(judul);
  list.append(divIsi);
  list.append(finish);
  list.append(close);
  list.classList.add('list');
  list.setAttribute('urutan', id);
  cardList.append(list);
}
const tambah = document.querySelector("input[type='button']");
const cardList = document.querySelector(".card-lists");

tambah.addEventListener("click", tambahData);

function tambahData(){
  const input = document.querySelector("input[type='text']");
  const data = input.value;
  const list = document.createElement("div");
  const isi = document.createTextNode(data);
  const close = document.createElement("div");
  const isiClose = document.createTextNode("X");

  close.append(isiClose);
  close.classList.add("delete");
  list.append(isi);
  list.append(close);
  list.classList.add("list");
  cardList.append(list);
  input.value = "";
}

cardList.addEventListener("click", function(e){
  if(e.target.className == "delete"){
    e.target.parentElement.style.display = "none";
  }
});
const getProducts = async () => {
  const res = await fetch("/api/products");
  const docs = await res.json();
  return docs;
};

const renderProducts = (data) => {
  const html = data
    .map(
      (element) => `<tr>
      <td>${element.id}</td>
      <td>${element.title}</td>
      <td>
      <img
      src="${element.thumbnail}"
      style="height: 9rem;"
      />
      </td>
      <td>$ ${element.price}</td>
                 </tr>`
    )
    .join(" ");
  document.querySelector("#tbody").innerHTML = html;
};

(async () => {
  const docs = await getProducts();
  renderProducts(docs);
})();

const socket = io();

const renderMessages = (data) => {
  // const { text, author } = data
  const html = data
    .map((element) => {
      const { text, author } = element;
      return `
        <span>${text}</span>
        `;
    })
    .join(" ");

  //     return (`
  //         <p>
  //             <span class="fw-bold">${author.firstName} </span>

  //             <span>${text}</span>
  //         </p>
  //     `
  // )
  // // <span class="text-danger">[${element.timestamp}]: </span>
  // .join(" "))};
  document.querySelector("#messages-box").innerHTML = html;
};

const postMessage = () => {
  const { value: text } = document.querySelector("input[name='message']");
  socket.emit("post_message", { text });
};

socket.on("messages_list", (data) => renderMessages(data));

const messagesFormRef = document.querySelector("#messagesForm");
messagesFormRef.onsubmit = (event) => {
  event.preventDefault();
  postMessage();
  messagesFormRef.reset();
};

const btnLogoutRef = document.querySelector("#btn-logout");

btnLogoutRef.onclick = async () => {
  const res = await fetch("/api/auth", { method: "delete" });
  const { name } = await res.json()
  alert(`See you later ${name}!`)
  window.location.href = "/login"
};
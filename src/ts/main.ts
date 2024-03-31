import "../scss/style.scss";
import { makeUserCards } from "../ts/makeUserCard";
import { getSample } from "./getSample";
import { fetchUsers } from "../ts/fetchUsers";

(async function main() {
  const cardsWrapper: HTMLElement = document.querySelector("#cards")!;
  const input: HTMLInputElement = document.querySelector("#input-name")!;

  const NO_RESULTS_MESSAGE: string = `<p class="error">Unfortunately there are no matches</p>`;
  const ERROR_FETCH_MESSAGE: string = `<p class="error">Something went wrong :( Please, try later </p>`;
  const USERS_URL: string = "https://jsonplaceholder.typicode.com/users";

  const usersAgeBetween18and25: object[] = [];
  const usersAgeBetween35and50: object[] = [];

  function giveSearchResult(
    usersArr: Object[],
    domElement: HTMLElement,
    domElementInnerStructure: Function
  ) {
    if (usersArr.length != 0) {
      makeUserCards(usersArr, domElement, domElementInnerStructure);
    } else {
      domElement.innerHTML = NO_RESULTS_MESSAGE;
    }
  }

  const users = await fetchUsers(USERS_URL, cardsWrapper, ERROR_FETCH_MESSAGE);

  users.forEach((user: { age: number }) => {
    if (user.age > 18 && user.age < 25) {
      usersAgeBetween18and25.push(user);
    } else if (user.age > 35 && user.age < 50) {
      usersAgeBetween35and50.push(user);
    }
  });

  makeUserCards(users, cardsWrapper, getSample);

  input.addEventListener("keyup", function () {
    const inputText: string = this.value;
    if (inputText) {
      if (Number(this.value) > 0) {
        console.log("1");

        let inputID: number = Number(this.value);

        const filteredUsers = users.filter(
          (user: { id: number }) => user.id === inputID
        );
        giveSearchResult(filteredUsers, cardsWrapper, getSample);
      } else {
        console.log("2");
        const inputText: string = this.value.toLocaleLowerCase();

        const filteredUsers = users.filter((user: { username: string }) =>
          user.username.toLowerCase().match(inputText)
        );

        giveSearchResult(filteredUsers, cardsWrapper, getSample);
      }
    } else makeUserCards(users, cardsWrapper, getSample);
  });
})();

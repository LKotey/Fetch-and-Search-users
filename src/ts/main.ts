import "../scss/style.scss";
import { makeUserCards } from "../ts/makeUserCard";
import { getSample } from "./getSample";
import { fetchUsers } from "../ts/fetchUsers";

namespace Variables {
  export const cardsWrapper: HTMLElement = document.querySelector("#cards")!;
  export const searchInput: HTMLInputElement =
    document.querySelector("#input-name")!;

  export const NO_RESULTS_MESSAGE: string = `<p class="error">Unfortunately there are no matches</p>`;
  export const ERROR_FETCH_MESSAGE: string = `<p class="error">Something went wrong :( Please, try later </p>`;
  export const USERS_URL: string = "https://jsonplaceholder.typicode.com/users";

  export const usersAgeBetween18and25: object[] = [];
  export const usersAgeBetween35and50: object[] = [];
}
function getSearchResult(usersArr: object[]): void {
  if (usersArr.length != 0) {
    makeUserCards(usersArr, Variables.cardsWrapper, getSample);
  } else {
    Variables.cardsWrapper.innerHTML = Variables.NO_RESULTS_MESSAGE;
  }
}

const users = await fetchUsers(
  Variables.USERS_URL,
  Variables.cardsWrapper,
  Variables.ERROR_FETCH_MESSAGE
);

users.forEach((user: { age: number }) => {
  if (user.age > 18 && user.age <= 25) {
    Variables.usersAgeBetween18and25.push(user);
  } else if (user.age > 25 && user.age < 50) {
    Variables.usersAgeBetween35and50.push(user);
  }
});

makeUserCards(users, Variables.cardsWrapper, getSample);

Variables.searchInput.addEventListener("input", function () {
  const inputText: string = this.value;

  if (inputText) {
    if (Number(this.value) > 0) {
      let inputID: number = Number(this.value);

      const filteredUsers = users.filter(
        (user: { id: number }) => user.id === inputID
      );

      getSearchResult(filteredUsers);
    } else {
      const inputText: string = this.value.toLocaleLowerCase();

      const filteredUsers = users.filter((user: { username: string }) =>
        user.username.toLowerCase().match(inputText)
      );

      getSearchResult(filteredUsers);
    }
  } else makeUserCards(users, Variables.cardsWrapper, getSample);
});

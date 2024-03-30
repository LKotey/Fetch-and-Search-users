import { randomInteger } from "../ts/calcRandomAge";

async function fetchUsers(
  url: string,
  domElement: HTMLElement,
  errorMessage: string
) {
  try {
    let response = await fetch(url);
    let users = await response.json();
    users.map((user: { age: number }) => (user.age = randomInteger(1, 90)));
    return users;
  } catch (error) {
    domElement.innerHTML = errorMessage;
  }
}

export { fetchUsers };

function makeUserCards(
  usersArr: Object[],
  domElement: HTMLElement,
  domElementInnerStructure: Function
) {
  if (usersArr) {
    domElement.innerHTML = "";
    for (const user of usersArr) {
      domElement.insertAdjacentHTML(
        "beforeend",
        domElementInnerStructure(user)
      );
    }
  }
}

export { makeUserCards };
